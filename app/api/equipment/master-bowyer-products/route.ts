import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bowyerId = searchParams.get("bowyer");

    if (!bowyerId) {
      return NextResponse.json({ error: "Missing bowyer query parameter" }, { status: 400 });
    }

    // Fetch master bowyer products from WordPress (10 mins cache revalidation)
    const res = await fetch(`https://janfranko.com/wp-json/wp/v2/master-bower-product?bowyer=${bowyerId}`, {
      next: { revalidate: 600 } // 10 minutes cache
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch master bowyer products" }, { status: res.status });
    }

    const products = await res.json();
    if (!Array.isArray(products)) {
      return NextResponse.json([]);
    }

    // Map custom post type items to uniform schema
    const mapped = products.map((p: any) => {
      // Use premium default placeholder images suited for traditional bows if no SEO image
      const yoastImage = p.yoast_head_json?.og_image?.[0]?.url;
      const fallbackImage = "https://images.unsplash.com/photo-1511140595276-3d9d0c367cd5?auto=format&fit=crop&w=800&q=80";
      const image = yoastImage || fallbackImage;

      return {
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered || "",
        content: p.content?.rendered || "",
        excerpt: p.acf?.product_overview || p.excerpt?.rendered || "",
        date: p.date,
        image,
        categories: p.product_cat || [],
        acf: p.acf || {}
      };
    });

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
