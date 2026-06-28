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
    // Query the master-bower-product post type instead of WooCommerce product CPT
    const res = await fetch("https://janfranko.com/wp-json/wp/v2/master-bower-product?per_page=100", {
      next: { revalidate: 600 } // 10 minutes cache
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch master bowyer products" }, { status: res.status });
    }
    
    const products = await res.json();
    if (!Array.isArray(products)) {
      return NextResponse.json([]);
    }

    // Resolve media attachments
    const mediaIds = Array.from(new Set(products.map((p: any) => p.featured_media).filter(Boolean)));
    let mediaMap: Record<number, string> = {};
    if (mediaIds.length > 0) {
      const mediaRes = await fetch(`https://janfranko.com/wp-json/wp/v2/media?include=${mediaIds.join(",")}&per_page=100`, {
        next: { revalidate: 86400 } // 24 hours cache
      });
      if (mediaRes.ok) {
        const mediaItems = await mediaRes.json();
        mediaItems.forEach((item: any) => {
          mediaMap[item.id] = item.source_url;
        });
      }
    }

    // Map fields to match WooCommerce catalog schema
    const mapped = products.map((p: any) => {
      // Build specs table HTML to append to content so that frontend parser pulls it correctly
      let contentHtml = p.content?.rendered || "";
      if (Array.isArray(p.acf?.specifications)) {
        let tableHtml = "<table><tbody>";
        p.acf.specifications.forEach((spec: any) => {
          tableHtml += `<tr><td>${spec.label}</td><td>${spec.value}</td></tr>`;
        });
        tableHtml += "</tbody></table>";
        contentHtml += tableHtml;
      }

      // Map categories based on taxonomy terms and specifications
      const categoryIds = mapProductCategories(p);

      return {
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered || "",
        content: contentHtml,
        excerpt: p.acf?.product_overview || p.content?.rendered?.slice(0, 150) || "",
        date: p.date,
        image: mediaMap[p.featured_media] || "https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=1200&q=80",
        categories: categoryIds,
        brands: p.bowyer || []
      };
    });

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
