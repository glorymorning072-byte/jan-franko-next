import { generateOgImageResponse } from "@/lib/og-template";

export const runtime = "edge";

export const alt = "Knowledge & Field Lineages";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function KnowledgeOgImage() {
  return generateOgImageResponse({
    badge: "FIELD KNOWLEDGE",
    title: "Knowledge & Field Lineages | Traditional Archery",
    description: "Authoritative field volumes, biomechanical orientation guides, and historical martial lineages preserving the global tradition of the bow.",
  });
}
