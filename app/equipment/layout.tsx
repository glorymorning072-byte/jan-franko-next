import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Traditional Archery Equipment | Jan Franko",
  description: "Browse verified archery equipment, Master Bowyers, targets, arrows, accessories, and training kits.",
  canonicalUrl: "/equipment",
});

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
