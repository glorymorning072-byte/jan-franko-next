import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Taxonomy & Bowyer Workshop | Jan Franko Archery",
  description:
    "Explore master bowyer products, composite reflex designs, traditional archery equipment, and vetted bowyer partnerships.",
  openGraph: {
    title: "Equipment Taxonomy & Bowyer Workshop | Jan Franko Archery",
    description:
      "Explore master bowyer products, composite reflex designs, traditional archery equipment, and vetted bowyer partnerships.",
  }
};

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
