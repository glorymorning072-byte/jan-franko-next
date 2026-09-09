import React from "react";
import Link from "next/link";
import { Layers, Wind, Droplets, Flame, Globe, ArrowRight, ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";
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

const ESI_LEVELS_DETAILED = [
  {
    level: "ESI Level 1",
    name: "Controlled Range",
    badge: "Level I Foundational",
    temp: "15°C – 25°C",
    wind: "< 10 km/h",
    altitude: "Sea Level to 500m",
    terrain: "Flat manicured grass or indoor range line.",
    summary: "Ideal baseline conditions for developing initial draw form mechanics, static anchor point consistency, and range command compliance without atmospheric interference.",
    requirements: [
      "Static 30m target accuracy",
      "Proper shoulder depression & skeletal alignment",
      "Standard range safety compliance"
    ]
  },
  {
    level: "ESI Level 2",
    name: "Moderate Outdoor Field",
    badge: "Level II Field",
    temp: "5°C – 15°C",
    wind: "10 – 25 km/h",
    altitude: "500m to 1,200m",
    terrain: "Rolling meadow slope, light forest trail, variable ground.",
    summary: "Introducing mild environmental variables. The archer must calculate light wind drift and adjust footing across un-level meadow terrain.",
    requirements: [
      "Slope stance adjustment from hips",
      "Estimating light crosswind deflection",
      "Adaptation to changing natural sun/shadow light"
    ]
  },
  {
    level: "ESI Level 3",
    name: "Dynamic Alpine / Forest",
    badge: "Advanced Field Exposure",
    temp: "0°C – 10°C",
    wind: "25 – 40 km/h",
    altitude: "1,200m to 2,200m",
    terrain: "Steep mountain incline (+30°/-30°), loose rock, timber canopy.",
    summary: "Significant atmospheric stress. Archers shoot on steep mountain slopes during gusting wind conditions and temperature drops, requiring diaphragmatic breath timing.",
    requirements: [
      "Breath release synchronization at exhale pause",
      "Shooting from canted bow positions around timber",
      "Core balance maintenance on shifting scree"
    ]
  },
  {
    level: "ESI Level 4",
    name: "High Mountain / Steppe Gale",
    badge: "Severe Climate Exposure",
    temp: "-10°C – 0°C",
    wind: "40 – 55 km/h",
    altitude: "2,200m to 3,500m",
    terrain: "Unsheltered alpine ridge, steppe grassland, snowpack.",
    summary: "Severe atmospheric load. High mountain ridge winds, sub-zero air, and oxygen depletion test an archer's endurance and thermal regulation.",
    requirements: [
      "Releasing during micro-lulls between gale gusts",
      "Managing natural bow limb cold stiffening",
      "Maintaining form under thin mountain oxygen levels"
    ]
  },
  {
    level: "ESI Level 5",
    name: "Extreme Summit Protocol",
    badge: "Apex Exposure",
    temp: "< -10°C",
    wind: "> 55 km/h",
    altitude: "> 3,500m",
    terrain: "Alpine summit peak, sub-arctic blizzard, steep ice ice-cliff.",
    summary: "The outer limit of traditional bowmanship. Extreme gale force winds, sub-zero freezing air, and long-range 145m targets demand total physiological and mental dominance.",
    requirements: [
      "145m parabolic flight target grouping",
      "Rapid heart-rate reduction (<90 bpm in 30s)",
      "Flawless zero-panic wilderness survival composure"
    ]
  }
];

export default function EnvironmentalStressIndexPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-24 pb-20 select-text font-sans">
      {/* 1. Dark Hero Section */}
      <section className="relative border-b border-primary/10 bg-[#0e3b2e] text-white py-16 md:py-24 overflow-hidden select-none">
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
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#c5a880]/15 border border-[#c5a880]/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <Layers className="w-4 h-4 text-accent" />
              The Environment is the Exam
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Environmental Stress Index (ESI)
            </h1>
            <p className="text-base md:text-xl text-white/85 font-sans max-w-3xl leading-relaxed font-light">
              Stillness is not measured in silence. It is measured by the magnitude of external chaos one can withstand without losing kinetic alignment. The ESI is our proprietary metric for quantifying atmospheric load.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detailed ESI Scale (Level 1 to 5) */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            Metric Scale
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            ESI Level Classification Scale
          </h2>
          <p className="text-xs sm:text-sm text-primary/75 max-w-2xl font-sans">
            Every expedition and training module is assigned an ESI rating to ensure archers are matched with appropriate environmental exposure.
          </p>
          <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
        </div>

        <div className="space-y-10">
          {ESI_LEVELS_DETAILED.map((esi, idx) => (
            <div
              key={idx}
              className="bg-white border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-accent/40 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                    {esi.badge}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-primary mt-2">{esi.level}: {esi.name}</h3>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-sans text-primary/80">
                  <div className="bg-secondary px-3 py-1.5 rounded-xl border border-primary/5">
                    <span className="text-[#7d603a] font-bold block text-[10px]">Temp</span>
                    <span>{esi.temp}</span>
                  </div>
                  <div className="bg-secondary px-3 py-1.5 rounded-xl border border-primary/5">
                    <span className="text-[#7d603a] font-bold block text-[10px]">Wind</span>
                    <span>{esi.wind}</span>
                  </div>
                  <div className="bg-secondary px-3 py-1.5 rounded-xl border border-primary/5">
                    <span className="text-[#7d603a] font-bold block text-[10px]">Altitude</span>
                    <span>{esi.altitude}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-primary/85 leading-relaxed font-sans">
                  {esi.summary}
                </p>
                <div className="bg-secondary p-4 rounded-2xl border border-primary/5 space-y-2">
                  <span className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">
                    Terrain &amp; Verification Requirements:
                  </span>
                  <p className="text-xs text-primary/80 font-sans">
                    <strong>Terrain Profile:</strong> {esi.terrain}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-sans text-primary/80 pt-1">
                    {esi.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7d603a] shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA Footer */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-primary/10">
        <div className="bg-[#0e3b2e] text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white">Verify Your ESI Readiness</h3>
          <p className="text-xs sm:text-sm text-white/80 font-sans max-w-xl mx-auto">
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
