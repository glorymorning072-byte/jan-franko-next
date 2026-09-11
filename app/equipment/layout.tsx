import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Taxonomy & Bowyer Workshop | Jan Franko Archery",
  description:
    "Explore master bowyer products, composite reflex designs, traditional archery equipment, and vetted bowyer partnerships.",
  openGraph: {
    title: "Equipment Taxonomy & Bowyer Workshop | Jan Franko Archery",
    description:
      "Explore master bowyer products, composite reflex designs, traditional archery equipment, and vetted bowyer partnerships.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jan Franko - Traditional Archery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Equipment Taxonomy & Bowyer Workshop | Jan Franko Archery",
    description:
      "Explore master bowyer products, composite reflex designs, traditional archery equipment, and vetted bowyer partnerships.",
    images: ["/og-image.png"],
  },
};

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
