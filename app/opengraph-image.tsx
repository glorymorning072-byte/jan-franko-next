import { generateOgImageResponse } from "@/lib/og-template";

export const runtime = "edge";

export const alt = "Jan Franko - Traditional Archery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OgImage() {
  return generateOgImageResponse({
    badge: "TRADITIONAL ARCHERY ACADEMY",
    title: "Jan Franko - Traditional Archery Academy & Expeditions",
    description: "A traditional archery academy focused on structured training, cultural study, biomechanical precision, and global wilderness expeditions.",
  });
}
