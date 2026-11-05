import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type CatalogPhotoDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  displayOrder: number;
};

const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 hari, dibuat ulang tiap muatan halaman

/** Foto katalog untuk galeri publik — dibaca tanpa sesi lewat klien publishable. */
export const getCatalogPhotos = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatalogPhotoDto[]> => {
    try {
      const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
      const supabasePublic = createClient<Database>(
        process.env["SUPABASE_URL"]!,
        key,
        {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const headers = new Headers(init?.headers);
              if (
                key.startsWith("sb_") &&
                headers.get("Authorization") === `Bearer ${key}`
              ) {
                headers.delete("Authorization");
              }
              headers.set("apikey", key);
              return fetch(input, { ...init, headers });
            },
          },
        },
      );

      const { data, error } = await supabasePublic
        .from("catalog_photos")
        .select("id, name, description, price, photo_path, display_order")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error || !data || data.length === 0) return [];

      const paths = data.map((row) => row.photo_path);
      const signed = await supabasePublic.storage
        .from("catalog-photos")
        .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);
      const urlByPath = new Map(
        (signed.data ?? []).map((s) => [s.path, s.signedUrl]),
      );

      return data.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        photoUrl: urlByPath.get(row.photo_path) ?? "",
        displayOrder: row.display_order,
      }));
    } catch {
      // Galeri tetap tampil (fallback poster) bila sumber foto gagal dibaca.
      return [];
    }
  },
);

export const catalogPhotosQueryOptions = queryOptions({
  queryKey: ["catalog-photos"],
  queryFn: () => getCatalogPhotos(),
});
