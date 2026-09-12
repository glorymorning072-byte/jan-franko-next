import { NextResponse } from "next/server";
import { MASTER_BOWYERS } from "@/data/bowyers";

export async function GET() {
  return NextResponse.json({ bowyers: MASTER_BOWYERS, source: "Jan Franko Master Bowyers Implementation Guide" });
}
