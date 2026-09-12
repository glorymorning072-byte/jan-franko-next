import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Training Programs & Wilderness Expeditions",
  description: "Structured training, cultural study, and seasonal wilderness expeditions designed for traditional archers of all skill levels.",
  canonicalUrl: "/programs",
});

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
