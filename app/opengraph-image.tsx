import { generateOgImageResponse } from "@/lib/og-template";

export const runtime = "nodejs";

export const alt = "Jan Franko - Traditional Archery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OgImage() {
  return generateOgImageResponse({
    badge: "TRADITIONAL ARCHERY ACADEMY",
    title: "Jan Franko - Archery Academy & Expeditions",
    description: "Structured traditional archery training, cultural study, biomechanical precision, and global wilderness expeditions.",
    ctaText: "EXPLORE ACADEMY →",
    bgType: "expedition",
  });
}
