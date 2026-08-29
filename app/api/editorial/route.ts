import { NextResponse } from "next/server";
import { EditorialItem } from "@/types/editorial";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const parent = searchParams.get("parent");
    const perPage = searchParams.get("per_page") || "100";

    let url = `https://janfranko.com/wp-json/wp/v2/editorial?per_page=${perPage}`;
    if (slug) {
      url += `&slug=${encodeURIComponent(slug)}`;
    }
    if (parent !== null && parent !== undefined && parent !== "") {
      url += `&parent=${encodeURIComponent(parent)}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 600 } // 10 minutes ISR cache
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch editorial data from WordPress: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data: EditorialItem[] = await res.json();

    if (slug) {
      if (!Array.isArray(data) || data.length === 0) {
        return NextResponse.json({ error: "Editorial item not found" }, { status: 404 });
      }
      // If multiple items share this slug (e.g. horse-culture), prioritize the Base Volume (parent === 0)
      const match = data.find((item) => item.parent === 0) || data[0];
      return NextResponse.json(match);
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
