import ExpeditionRegions from "@/components/Home/ExpeditionRegions";
import Institute from "@/components/Home/Institute";
import FounderBlock from "@/components/Home/FounderBlock";
import Hero from "@/components/Home/Hero";
import HeroMobile from "@/components/Home/HeroMobile";
import Contact from "@/components/Home/Contact";

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
