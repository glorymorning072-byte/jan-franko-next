import { NextResponse } from "next/server";
import { fetchWpJson } from "@/lib/wp";
import {
  FALLBACK_PROGRAM_MEDIA,
  FALLBACK_PROGRAM_TERMS,
  FALLBACK_PROGRAMS,
  type ProgramRecord,
  type ProgramTerm,
} from "@/data/programs";

type MediaItem = { id: number; source_url: string };

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [programs, types, statuses, skills, regions] = await Promise.all([
      fetchWpJson<ProgramRecord[]>("/wp-json/wp/v2/program?per_page=100", { revalidate: 600 }),
      fetchWpJson<ProgramTerm[]>("/wp-json/wp/v2/program_type?per_page=100", { revalidate: 86_400 }),
      fetchWpJson<ProgramTerm[]>("/wp-json/wp/v2/program_status?per_page=100", { revalidate: 86_400 }),
      fetchWpJson<ProgramTerm[]>("/wp-json/wp/v2/skill_level?per_page=100", { revalidate: 86_400 }),
      fetchWpJson<ProgramTerm[]>("/wp-json/wp/v2/region?per_page=100", { revalidate: 86_400 }),
    ]);

    const mediaIds = new Set<number>();
    programs.forEach((program) => {
      if (program.acf?.background_image) mediaIds.add(Number(program.acf.background_image));
      program.acf?.supplementary_images?.forEach((id) => mediaIds.add(Number(id)));
    });

    const media: Record<number, string> = {};
    if (mediaIds.size > 0) {
      try {
        const items = await fetchWpJson<MediaItem[]>(
          `/wp-json/wp/v2/media?include=${Array.from(mediaIds).join(",")}&per_page=100`,
          { revalidate: 86_400 },
        );
        items.forEach((item) => {
          media[item.id] = item.source_url;
        });
      } catch {
        // Program text remains usable if an image request fails.
      }
    }

    return NextResponse.json(
      { programs, terms: { types, statuses, skills, regions }, media, source: "wordpress" },
      { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    console.error("Programs API fallback activated:", error);
    return NextResponse.json(
      {
        programs: FALLBACK_PROGRAMS,
        terms: FALLBACK_PROGRAM_TERMS,
        media: FALLBACK_PROGRAM_MEDIA,
        source: "verified-fallback",
      },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" } },
    );
  }
}
