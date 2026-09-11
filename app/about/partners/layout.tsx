import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vetted Bowyers & Master Craftsmen | Jan Franko Archery",
  description:
    "Discover our international network of master bowyers and traditional archery craftsmen specializing in horn, sinew, and laminated wood bows.",
  openGraph: {
    title: "Vetted Bowyers & Master Craftsmen | Jan Franko Archery",
    description:
      "Discover our international network of master bowyers and traditional archery craftsmen specializing in horn, sinew, and laminated wood bows.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jan Franko - Traditional Archery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vetted Bowyers & Master Craftsmen | Jan Franko Archery",
    description:
      "Discover our international network of master bowyers and traditional archery craftsmen specializing in horn, sinew, and laminated wood bows.",
    images: ["/og-image.png"],
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
