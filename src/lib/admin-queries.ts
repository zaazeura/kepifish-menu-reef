import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Product, Purchase, RecipeItem } from "@/lib/hpp";

type PurchaseRow = Database["public"]["Tables"]["purchases"]["Row"];
type RecipeItemRow = Database["public"]["Tables"]["recipe_items"]["Row"];
type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type CatalogPhotoRow = Database["public"]["Tables"]["catalog_photos"]["Row"];

function toPurchase(row: PurchaseRow): Purchase {
  return {
    id: row.id,
    ingredient_name: row.ingredient_name,
    unit: row.unit,
    qty: Number(row.qty),
    unit_price: Number(row.unit_price),
    purchased_at: row.purchased_at,
    note: row.note,
  };
}

function toRecipeItem(row: RecipeItemRow): RecipeItem {
  return {
    id: row.id,
    product_id: row.product_id,
    ingredient_name: row.ingredient_name,
    unit: row.unit,
    qty_used: Number(row.qty_used),
  };
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    selling_price: Number(row.selling_price),
    display_order: row.display_order,
  };
}

export type CatalogPhotoAdmin = {
  id: string;
  name: string;
  description: string;
  price: number;
  photoPath: string;
  photoUrl: string;
  displayOrder: number;
};

export const purchasesQueryOptions = queryOptions({
  queryKey: ["admin", "purchases"],
  queryFn: async (): Promise<Purchase[]> => {
    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .order("purchased_at", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as PurchaseRow[]).map(toPurchase);
  },
});

export const recipeItemsQueryOptions = queryOptions({
  queryKey: ["admin", "recipe-items"],
  queryFn: async (): Promise<RecipeItem[]> => {
    const { data, error } = await supabase
      .from("recipe_items")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data as RecipeItemRow[]).map(toRecipeItem);
  },
});

export const productsQueryOptions = queryOptions({
  queryKey: ["admin", "products"],
  queryFn: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data as ProductRow[]).map(toProduct);
  },
});

export const catalogPhotosAdminQueryOptions = queryOptions({
  queryKey: ["admin", "catalog-photos"],
  queryFn: async (): Promise<CatalogPhotoAdmin[]> => {
    const { data, error } = await supabase
      .from("catalog_photos")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    const rows = data as CatalogPhotoRow[];
    const withUrls = await Promise.all(
      rows.map(async (row) => {
        const { data: signed } = await supabase.storage
          .from("catalog-photos")
          .createSignedUrl(row.photo_path, 60 * 60 * 2);
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          price: Number(row.price),
          photoPath: row.photo_path,
          photoUrl: signed?.signedUrl ?? "",
          displayOrder: row.display_order,
        };
      }),
    );
    return withUrls;
  },
});

export type AdminStatus = {
  ready: boolean;
  userId: string | null;
  isAdmin: boolean;
  username: string | null;
  displayName: string | null;
};

/** Data akun yang sedang masuk + status admin (pemilik) vs dosen. */
export function useAdminStatus(): AdminStatus {
  const { data } = useQuery({
    queryKey: ["admin", "status"],
    queryFn: async (): Promise<Omit<AdminStatus, "ready">> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { userId: null, isAdmin: false, username: null, displayName: null };
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, display_name")
        .eq("id", user.id)
        .maybeSingle();
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      return {
        userId: user.id,
        isAdmin: Boolean(isAdmin),
        username: profile?.username ?? null,
        displayName: profile?.display_name ?? null,
      };
    },
    staleTime: 5 * 60_000,
  });
  return data ?? { ready: false, userId: null, isAdmin: false, username: null, displayName: null };
}
