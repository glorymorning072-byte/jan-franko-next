import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://janfranko.com/wp-json/wp/v2/product_cat?per_page=100", {
      next: { revalidate: 86400 } // 24 hours cache
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch product categories" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
