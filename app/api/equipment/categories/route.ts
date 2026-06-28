import { NextResponse } from "next/server";

function mapProductCategories(p: any) {
  const categoryIds = new Set<number>();
  
  // 1. Add Bows parent category
  categoryIds.add(104);
  
  // 2. Map bowyer taxonomy
  if (Array.isArray(p.bowyer)) {
    p.bowyer.forEach((bId: number) => {
      if (bId === 238) { // Kadys Bows
        categoryIds.add(115);
        categoryIds.add(114); // Master Bowyers
      } else if (bId === 240) { // Harvey Archery
        categoryIds.add(116);
        categoryIds.add(114);
      } else if (bId === 239) { // Dani & Herlan Brothers
        categoryIds.add(184);
        categoryIds.add(114);
      } else if (bId === 241) { // Mr. Bows
        categoryIds.add(117);
        categoryIds.add(114);
      }
    });
  }

  // 3. Map based on title/specifications
  const title = (p.title?.rendered || "").toLowerCase();
  const bowType = (p.acf?.specifications?.find((s: any) => s.label.toLowerCase() === "bow type")?.value || "").toLowerCase();
  const searchStr = `${title} ${bowType}`;

  if (searchStr.includes("longbow") || searchStr.includes("long bow")) {
    categoryIds.add(163); // Longbows
  }
  if (searchStr.includes("recurve") || searchStr.includes("recursive") || searchStr.includes("mongol") || searchStr.includes("manchu") || searchStr.includes("turkish") || searchStr.includes("hoder") || searchStr.includes("khan") || searchStr.includes("orhan")) {
    categoryIds.add(162); // Traditional Recurve Bows
  }
  if (searchStr.includes("mongol") || searchStr.includes("mongolian") || searchStr.includes("manchu") || searchStr.includes("manchurian") || searchStr.includes("turkish") || searchStr.includes("tatar") || searchStr.includes("khan") || searchStr.includes("hungarian") || searchStr.includes("hoder")) {
    categoryIds.add(112); // Asiatic Bows
  }
  if (searchStr.includes("leon") || searchStr.includes("lynx") || searchStr.includes("hunt")) {
    categoryIds.add(164); // Hunting Bows
  }

  return Array.from(categoryIds);
}

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

    // 2. Fetch master bowyer products to filter empty categories
    const prodRes = await fetch("https://janfranko.com/wp-json/wp/v2/master-bower-product?per_page=100", {
      next: { revalidate: 600 }
    });
    
    if (!prodRes.ok) {
      return NextResponse.json({ error: "Failed to fetch products for categories filtering" }, { status: prodRes.status });
    }
    
    const products = await prodRes.json();
    if (!Array.isArray(products)) {
      return NextResponse.json([]);
    }

    // Extract active category IDs from mapped products list
    const activeIds = new Set<number>();
    const addCategoryAndAncestors = (catId: number) => {
      activeIds.add(catId);
      const cat = categories.find((c: any) => c.id === catId);
      if (cat && cat.parent !== 0) {
        addCategoryAndAncestors(cat.parent);
      }
    };

    products.forEach((p: any) => {
      const categoryIds = mapProductCategories(p);
      categoryIds.forEach((catId: number) => {
        addCategoryAndAncestors(catId);
      });
    });

    const filteredCategories = categories.filter((c: any) => activeIds.has(c.id));
    return NextResponse.json(filteredCategories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
