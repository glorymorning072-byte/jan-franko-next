import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Fetch products from WordPress (10 mins cache revalidation)
    const res = await fetch("https://janfranko.com/wp-json/wp/v2/product?per_page=100", {
      next: { revalidate: 600 } // 10 minutes cache
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
    }
    const products = await res.json();

    // 2. Fetch all unique media IDs in the products list (as a fallback)
    const mediaIds = Array.from(new Set(products.map((p: any) => p.featured_media).filter(Boolean)));

    let mediaMap: Record<number, string> = {};
    if (mediaIds.length > 0) {
      // Fetch media assets with 24 hours cache revalidation
      const mediaRes = await fetch(`https://janfranko.com/wp-json/wp/v2/media?include=${mediaIds.join(",")}&per_page=100`, {
        next: { revalidate: 86400 } // media details rarely change, so cache them longer
      });
      if (mediaRes.ok) {
        const mediaItems = await mediaRes.json();
        mediaItems.forEach((item: any) => {
          mediaMap[item.id] = item.source_url;
        });
      }
    }

    // 3. Map products to return a simplified structured response
    const mapped = products.map((p: any) => {
      // Extract the featured image directly from the Yoast SEO headers if available (highly reliable and avoids API param blocks)
      const yoastImage = p.yoast_head_json?.og_image?.[0]?.url;
      const image = yoastImage || mediaMap[p.featured_media] || "https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=1200&q=80";

      return {
        id: p.id,
        slug: p.slug,
        title: p.title.rendered,
        content: p.content.rendered,
        excerpt: p.excerpt.rendered,
        date: p.date,
        image,
        categories: p.product_cat || [],
        brands: p.product_brand || []
      };
    });

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
