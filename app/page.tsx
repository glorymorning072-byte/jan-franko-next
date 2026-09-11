import ExpeditionRegions from "@/components/Home/ExpeditionRegions";
import Institute from "@/components/Home/Institute";
import FounderBlock from "@/components/Home/FounderBlock";
import Hero from "@/components/Home/Hero";
import HeroMobile from "@/components/Home/HeroMobile";
import Contact from "@/components/Home/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jan Franko | Traditional Archery Academy & Global Expeditions",
  description:
    "A traditional archery academy focused on structured training, cultural study, biomechanical precision, and global wilderness expeditions.",
  openGraph: {
    title: "Jan Franko | Traditional Archery Academy & Global Expeditions",
    description:
      "A traditional archery academy focused on structured training, cultural study, biomechanical precision, and global wilderness expeditions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jan Franko - Traditional Archery",
      },
      {
        url: "/og-square.png",
        width: 512,
        height: 512,
        alt: "Jan Franko Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Franko | Traditional Archery Academy & Global Expeditions",
    description:
      "A traditional archery academy focused on structured training, cultural study, biomechanical precision, and global wilderness expeditions.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <div className="w-full hidden md:block">
        <Hero />
      </div>
      <div className="w-full block md:hidden">
        <HeroMobile />
      </div>
      <ExpeditionRegions/>
      <Institute />
      <FounderBlock />
      <Contact />
    </main>
  );
}
