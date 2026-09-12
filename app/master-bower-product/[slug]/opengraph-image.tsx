import { generateOgImageResponse } from "@/lib/og-template";

export const runtime = "nodejs";

export const alt = "Master Bowyer Product";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function MasterBowyerProductOgImage() {
  return generateOgImageResponse({
    badge: "MASTER BOWYERS",
    title: "Individual Bow Commissions",
    description: "Sourced profiles for Warrick Harvey, MR Bows, and Kadys Bows with a direct consultation pathway.",
    ctaText: "REQUEST A CONSULTATION →",
    bgType: "workshop",
  });
}
