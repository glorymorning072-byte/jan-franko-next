import type { Metadata } from "next";

export const SITE_NAME = "Jan Franko - Traditional Archery";
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://janfranko.com";

/**
 * Truncate title under 60 characters (max 57 chars + '...')
 */
export function truncateTitle(title: string, maxLen = 57): string {
  if (!title) return "";
  const cleaned = title.trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.substring(0, maxLen).trim() + "...";
}

/**
 * Truncate description under 160 characters (max 152 chars + '...')
 */
export function truncateDescription(desc: string, maxLen = 152): string {
  if (!desc) return "";
  const plainText = desc.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (plainText.length <= maxLen) return plainText;
  return plainText.substring(0, maxLen).trim() + "...";
}

/**
 * Construct standardized SEO and OpenGraph metadata object
 */
export function constructMetadata({
  title,
  description,
  ogImage,
  canonicalUrl,
  type = "website",
}: {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
}): Metadata {
  const formattedTitle = truncateTitle(title);
  const formattedDescription = truncateDescription(description);
  const imageUrl = ogImage || "/opengraph-image";

  return {
    metadataBase: new URL(BASE_URL),
    title: formattedTitle,
    description: formattedDescription,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      siteName: SITE_NAME,
      title: formattedTitle,
      description: formattedDescription,
      url: canonicalUrl ? new URL(canonicalUrl, BASE_URL).toString() : BASE_URL,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: formattedTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description: formattedDescription,
      images: [imageUrl],
    },
  };
}
