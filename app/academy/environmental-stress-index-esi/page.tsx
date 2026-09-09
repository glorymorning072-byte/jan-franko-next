import React from "react";
import Link from "next/link";
import { Layers, Wind, Droplets, Flame, Globe, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Environmental Stress Index (ESI) | Jan Franko Traditional Archery Academy",
  description:
    "Quantifying external environmental load against internal archer stability: ESI Level 1 to ESI Level 5 classification scale.",
  openGraph: {
    title: "Environmental Stress Index (ESI) | Jan Franko Traditional Archery Academy",
    description: "Quantifying external load on internal stability across 5 ESI levels."
  }
};

const ESI_LEVELS = [
  {
    level: "ESI Level 1",
    name: "Controlled Range",
    badge: "Foundational",
    temp: "15°C – 25°C",
    wind: "< 10 km/h",
    desc: "Sheltered field or flat forest range with minimal wind, mild temperature, and static footing."
  },
  {
    level: "ESI Level 2",
    name: "Moderate Outdoor Field",
    badge: "Intermediate",
    temp: "5°C – 15°C",
    wind: "10 – 25 km/h",
    desc: "Rolling meadow slope, light breeze, variable lighting, and moderate walking terrain."
  },
  {
    level: "ESI Level 3",
    name: "Dynamic Alpine / Forest",
    badge: "Advanced Field",
    temp: "0°C – 10°C",
    wind: "25 – 40 km/h",
    desc: "Steep mountain incline, gusting winds, light rain or snow flurries, and loose footing."
  },
  {
    level: "ESI Level 4",
    name: "High Mountain / Steppe Gale",
    badge: "Severe Exposure",
    temp: "-10°C – 0°C",
    wind: "40 – 55 km/h",
    desc: "Alpine ridge winds, sub-zero air, heavy snow drift, and high altitude oxygen drop."
  },
  {
    level: "ESI Level 5",
    name: "Extreme Summit Protocol",
    badge: "Apex Exposure",
    temp: "< -10°C",
    wind: "> 55 km/h",
    desc: "Sub-Arctic blizzard, extreme gale force winds, steep ice slopes, and severe thermal load."
  }
];

export default function EnvironmentalStressIndexPage() {
  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* Hero Section */}
      <section className="relative border-b border-accent/20 bg-gradient-to-b from-[#0e3b2e] via-[#092b21] to-[#0e3b2e] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-accent/80 font-semibold">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <Link href="/academy" className="hover:text-accent transition-colors">
              Academy
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <span className="text-white font-bold">Environmental Stress Index</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <Layers className="w-4 h-4 text-accent" />
              The Environment is the Exam
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Environmental Stress Index (ESI)
            </h1>
            <p className="text-base md:text-xl text-[#f0e9d9]/85 font-sans max-w-3xl leading-relaxed font-light">
              Stillness is not measured in silence. It is measured by the magnitude of external chaos one can withstand without losing center. The ESI is our proprietary metric for quantifying atmospheric load.
            </p>
          </div>
        </div>
      </section>

      {/* ESI Levels Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
            Classification Scale
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
            ESI Exposure Levels (1 to 5)
          </h2>
          <div className="w-12 h-[1px] bg-accent/40 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ESI_LEVELS.map((esi, idx) => (
            <div
              key={idx}
              className="bg-[#0b3126] border border-accent/20 rounded-3xl p-5 space-y-4 flex flex-col justify-between hover:border-accent/60 transition-all shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/40 text-accent font-bold border border-accent/20 w-max">
                    {esi.badge}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1">{esi.level}</h3>
                  <span className="text-xs font-serif font-semibold text-accent">{esi.name}</span>
                </div>
                <p className="text-xs text-[#f0e9d9]/75 font-sans leading-relaxed">{esi.desc}</p>
              </div>

              <div className="pt-3 border-t border-accent/15 space-y-1 text-[11px] font-sans text-white/80">
                <div className="flex justify-between">
                  <span className="text-accent font-mono">Temp:</span>
                  <span>{esi.temp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent font-mono">Wind:</span>
                  <span>{esi.wind}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-accent/20">
        <div className="bg-gradient-to-r from-[#0b3126] via-[#124d3d] to-[#0b3126] border border-accent/30 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white">Verify Your ESI Readiness</h3>
          <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans max-w-xl mx-auto">
            Discover which ESI thresholds correspond to your current training level and expedition eligibility.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
          >
            <span>Request ESI Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
