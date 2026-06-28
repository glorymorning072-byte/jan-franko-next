import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Fetch categories (24 hours cache)
    const catRes = await fetch("https://janfranko.com/wp-json/wp/v2/product_cat?per_page=100", {
      next: { revalidate: 86400 }
    });
    if (!catRes.ok) {
      return NextResponse.json({ error: "Failed to fetch product categories" }, { status: catRes.status });
    }
    const categories = await catRes.json();

    // 2. Fetch products to filter empty categories
    const prodRes = await fetch("https://janfranko.com/wp-json/wp/v2/product?per_page=100", {
      next: { revalidate: 600 }
    });
    if (!prodRes.ok) {
      // Fallback: return all categories if products fetch fails
      return NextResponse.json(categories);
    }
    const products = await prodRes.json();

    // 3. Build set of active category IDs (including all ancestor IDs)
    const activeIds = new Set<number>();
    const addCategoryAndAncestors = (catId: number) => {
      activeIds.add(catId);
      const cat = categories.find((c: any) => c.id === catId);
      if (cat && cat.parent !== 0) {
        addCategoryAndAncestors(cat.parent);
      }
    };

    products.forEach((p: any) => {
      if (Array.isArray(p.product_cat)) {
        p.product_cat.forEach((catId: number) => {
          addCategoryAndAncestors(catId);
        });
      }
    });

    // 4. Return only categories that are currently associated with products
    const filteredCategories = categories.filter((c: any) => activeIds.has(c.id));

    return NextResponse.json(filteredCategories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
