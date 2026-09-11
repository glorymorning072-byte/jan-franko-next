import { generateOgImageResponse } from "@/lib/og-template";

export const runtime = "nodejs";

export const alt = "Master Bowyer Product";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function MasterBowyerProductOgImage({ params }: Props) {
  const { slug } = await params;
  let title = formatTitle(slug);
  let description = "Handcrafted master bowyer product, traditional composite bow, and custom archery gear.";

  try {
    const res = await fetch(`https://janfranko.com/wp-json/wp/v2/master-bowyer-products?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        if (data[0].title?.rendered) title = data[0].title.rendered;
        if (data[0].excerpt?.rendered) {
          description = data[0].excerpt.rendered.replace(/<[^>]*>/g, "").trim();
        }
      }
    }
  } catch {
    // Safe fallback
  }

  return generateOgImageResponse({
    badge: "MASTER BOWYER PRODUCT",
    title,
    description,
    ctaText: "DISCOVER PRODUCT →",
    bgType: "workshop",
  });
}
