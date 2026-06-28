import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // 1. Attempt to fetch products live from WordPress
    const res = await fetch("https://janfranko.com/wp-json/wp/v2/product?per_page=100", {
      next: { revalidate: 600 } // 10 minutes cache
    });
    
    let products = [];
    if (res.ok) {
      products = await res.json();
    }

    // 2. If live fetch returns empty or fails, fall back to local JSON
    if (!Array.isArray(products) || products.length === 0) {
      const filePath = path.join(process.cwd(), "data", "products.json");
      const localData = fs.readFileSync(filePath, "utf-8");
      const localProducts = JSON.parse(localData);

      const mappedLocal = localProducts.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        content: p.content,
        excerpt: p.excerpt,
        date: p.date,
        image: p.image,
        categories: p.categories.map((c: any) => c.id),
        brands: [] // brands are resolved from categories dynamically
      }));
      return NextResponse.json(mappedLocal);
    }

    // 3. If live fetch succeeded, map WordPress fields and resolve media
    const mediaIds = Array.from(new Set(products.map((p: any) => p.featured_media).filter(Boolean)));

    let mediaMap: Record<number, string> = {};
    if (mediaIds.length > 0) {
      const mediaRes = await fetch(`https://janfranko.com/wp-json/wp/v2/media?include=${mediaIds.join(",")}&per_page=100`, {
        next: { revalidate: 86400 }
      });
      if (mediaRes.ok) {
        const mediaItems = await mediaRes.json();
        mediaItems.forEach((item: any) => {
          mediaMap[item.id] = item.source_url;
        });
      }
    }

    const mapped = products.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title.rendered,
      content: p.content.rendered,
      excerpt: p.excerpt.rendered,
      date: p.date,
      image: mediaMap[p.featured_media] || "https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=1200&q=80",
      categories: p.product_cat || [],
      brands: p.product_brand || []
    }));

    return NextResponse.json(mapped);
  } catch (err: any) {
    // Catch-all local fallback on server errors
    try {
      const filePath = path.join(process.cwd(), "data", "products.json");
      const localData = fs.readFileSync(filePath, "utf-8");
      const localProducts = JSON.parse(localData);
      
      const mappedLocal = localProducts.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        content: p.content,
        excerpt: p.excerpt,
        date: p.date,
        image: p.image,
        categories: p.categories.map((c: any) => c.id),
        brands: []
      }));
      return NextResponse.json(mappedLocal);
    } catch (fallbackErr: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
