import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Equipment Taxonomy & Bowyer Workshop",
  description: "Explore master bowyer products, composite reflex designs, traditional archery equipment, and vetted bowyer partnerships.",
});

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
