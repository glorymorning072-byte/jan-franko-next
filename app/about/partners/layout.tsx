import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Master Bowyers | Warrick Harvey, MR Bows & Kadys Bows",
  description: "Sourced profiles and direct commission requests for Warrick Harvey, MR Bows by Miško Rovčanin, and Kadys Bows by Sergey Tolochko.",
});

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
