import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vetted Bowyers & Master Craftsmen | Jan Franko Archery",
  description:
    "Discover our international network of master bowyers and traditional archery craftsmen specializing in horn, sinew, and laminated wood bows.",
  openGraph: {
    title: "Vetted Bowyers & Master Craftsmen | Jan Franko Archery",
    description:
      "Discover our international network of master bowyers and traditional archery craftsmen specializing in horn, sinew, and laminated wood bows.",
  }
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
