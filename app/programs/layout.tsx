import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Programs & Wilderness Expeditions | Jan Franko Archery",
  description:
    "Discover structured training, cultural study, and seasonal wilderness expeditions designed for traditional archers of all skill levels.",
  openGraph: {
    title: "Training Programs & Wilderness Expeditions | Jan Franko Archery",
    description:
      "Discover structured training, cultural study, and seasonal wilderness expeditions designed for traditional archers of all skill levels.",
  }
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
