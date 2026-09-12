import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      products: [],
      message: "Legacy unsourced product listings are disabled. Use the source-reviewed Master Bowyer profiles and commission form.",
      canonical: "/about/partners#commission",
    },
    { status: 410 },
  );
}
