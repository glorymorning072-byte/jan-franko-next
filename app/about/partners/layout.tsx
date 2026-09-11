import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Vetted Bowyers & Master Craftsmen",
  description: "Discover our international network of master bowyers and traditional archery craftsmen specializing in horn, sinew, and laminated wood bows.",
});

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
