import { NextResponse } from "next/server";
import { EQUIPMENT_CATEGORIES } from "@/data/site";

export async function GET() {
  return NextResponse.json({ categories: EQUIPMENT_CATEGORIES });
}
