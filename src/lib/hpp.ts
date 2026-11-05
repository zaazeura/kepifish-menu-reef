/**
 * Logika HPP (Harga Pokok Produksi) & pengeluaran Kepifish.
 * Fungsi murni — dipakai panel admin dan diuji di src/test/hpp.test.ts.
 */

export type Purchase = {
  id: string;
  ingredient_name: string;
  unit: string;
  qty: number;
  unit_price: number;
  purchased_at: string; // format YYYY-MM-DD
  note: string | null;
};

export type RecipeItem = {
  id: string;
  product_id: string;
  ingredient_name: string;
  unit: string;
  qty_used: number;
};

export type Product = {
  id: string;
  name: string;
  selling_price: number;
  display_order: number;
};

export type HppLine = {
  ingredient_name: string;
  unit: string;
  qty_used: number;
  unit_price: number | null;
  cost: number;
  priced: boolean;
};

export type ProductHpp = {
  product_id: string;
  product_name: string;
  selling_price: number;
  hpp: number;
  margin: number;
  lines: HppLine[];
  /** Bahan yang belum punya harga pembelian */
  missing: string[];
};

/** Filter pembelian berdasarkan periode (inklusif di kedua ujung). */
export function purchasesInPeriod(
  purchases: Purchase[],
  from?: string | null,
  to?: string | null,
): Purchase[] {
  return purchases.filter((p) => {
    if (from && p.purchased_at < from) return false;
    if (to && p.purchased_at > to) return false;
    return true;
  });
}

/** Total pengeluaran = Σ (jumlah × harga satuan). */
export function totalSpent(purchases: Purchase[]): number {
  return purchases.reduce((sum, p) => sum + p.qty * p.unit_price, 0);
}

function matchIngredient(p: Purchase, name: string, unit: string): boolean {
  return (
    p.ingredient_name.trim().toLowerCase() === name.trim().toLowerCase() &&
    p.unit.trim().toLowerCase() === unit.trim().toLowerCase()
  );
}

/**
 * Harga satuan terakhir untuk sebuah bahan:
 * dari pembelian dalam periode; bila tidak ada, dari pembelian terakhir kapan pun.
 * `null` bila bahan belum pernah dicatat.
 */
export function latestUnitPrice(
  purchases: Purchase[],
  ingredientName: string,
  unit: string,
  from?: string | null,
  to?: string | null,
): number | null {
  const inPeriod = purchasesInPeriod(purchases, from, to)
    .filter((p) => matchIngredient(p, ingredientName, unit))
    .sort((a, b) => b.purchased_at.localeCompare(a.purchased_at));
  if (inPeriod.length > 0) return inPeriod[0].unit_price;
  const anyTime = purchases
    .filter((p) => matchIngredient(p, ingredientName, unit))
    .sort((a, b) => b.purchased_at.localeCompare(a.purchased_at));
  return anyTime.length > 0 ? anyTime[0].unit_price : null;
}

/**
 * HPP satu produk = Σ (jumlah terpakai × harga satuan bahan).
 * Bahan tanpa catatan harga diberi biaya 0 dan masuk daftar `missing`.
 */
export function computeProductHpp(
  product: Product,
  recipeItems: RecipeItem[],
  purchases: Purchase[],
  from?: string | null,
  to?: string | null,
): ProductHpp {
  const lines: HppLine[] = recipeItems
    .filter((r) => r.product_id === product.id)
    .map((item) => {
      const price = latestUnitPrice(
        purchases,
        item.ingredient_name,
        item.unit,
        from,
        to,
      );
      return {
        ingredient_name: item.ingredient_name,
        unit: item.unit,
        qty_used: item.qty_used,
        unit_price: price,
        cost: price === null ? 0 : price * item.qty_used,
        priced: price !== null,
      };
    });

  const hpp = lines.reduce((sum, l) => sum + l.cost, 0);
  const missing = lines
    .filter((l) => !l.priced)
    .map((l) => `${l.ingredient_name} (${l.unit})`);

  return {
    product_id: product.id,
    product_name: product.name,
    selling_price: product.selling_price,
    hpp,
    margin: product.selling_price - hpp,
    lines,
    missing,
  };
}

export function formatRupiah(value: number): string {
  return `Rp ${Math.round(value).toLocaleString("id-ID")}`;
}
