import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
    
    let products = [];
    if (prodRes.ok) {
      products = await prodRes.json();
    }

    // 3. Fallback to local products list if live fetch returns empty
    if (!Array.isArray(products) || products.length === 0) {
      const filePath = path.join(process.cwd(), "data", "products.json");
      const localData = fs.readFileSync(filePath, "utf-8");
      const localProducts = JSON.parse(localData);

      // Extract active category IDs from local products list
      const activeIds = new Set<number>();
      const addCategoryAndAncestors = (catId: number) => {
        activeIds.add(catId);
        const cat = categories.find((c: any) => c.id === catId);
        if (cat && cat.parent !== 0) {
          addCategoryAndAncestors(cat.parent);
        }
      };

      localProducts.forEach((p: any) => {
        if (Array.isArray(p.categories)) {
          p.categories.forEach((c: any) => {
            addCategoryAndAncestors(c.id);
          });
        }
      });

      const filteredCategories = categories.filter((c: any) => activeIds.has(c.id));
      return NextResponse.json(filteredCategories);
    }

    // 4. Standard live filter path
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

    const filteredCategories = categories.filter((c: any) => activeIds.has(c.id));
    return NextResponse.json(filteredCategories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
