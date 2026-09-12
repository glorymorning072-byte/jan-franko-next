import { generateOgImageResponse } from "@/lib/og-template";
import { findMasterBowyer } from "@/data/bowyers";

export const runtime = "nodejs";

export const alt = "Master Bowyer Profile";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BowyerOgImage({ params }: Props) {
  const { slug } = await params;
  const bowyer = findMasterBowyer(slug);
  const title = bowyer ? `${bowyer.bowyerName} — ${bowyer.brand}` : "Master Bowyer";
  const description = bowyer?.introduction || "Source-reviewed Master Bowyer profile and direct commission consultation.";

  return generateOgImageResponse({
    badge: "MASTER BOWYER",
    title,
    description,
    ctaText: "READ SOURCED PROFILE →",
    bgType: "workshop",
  });
}
