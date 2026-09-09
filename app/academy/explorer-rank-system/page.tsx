import React from "react";
import Link from "next/link";
import { Award, Compass, MapPin, CheckCircle2, ArrowRight, ChevronRight, Layers, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer Rank System | Jan Franko Traditional Archery Academy",
  description:
    "Recognizing archer continuity, presence, and long-term commitment across five global ecosystems: Ocean, Mountain, Steppe, Forest, and Desert.",
  openGraph: {
    title: "Explorer Rank System | Jan Franko Traditional Archery Academy",
    description: "Structured progression across 5 global terrain ecosystems."
  }
};

const ECOSYSTEMS = [
  {
    title: "Ocean (Humidity & Tides)",
    location: "Okinawa, Japan",
    image: "/images/wp-assets/contact-bg.webp",
    desc: "Coastal wind currents, high humidity, saltwater corrosion control, and tidal timing."
  },
  {
    title: "Mountain (Altitude & Oxygen)",
    location: "Bhutan & Tyrol Alps",
    image: "/images/wp-assets/Alpine-Highland.webp",
    desc: "High elevation, steep slope angles, thin air breath regulation, and alpine thermal drops."
  },
  {
    title: "Steppe (Wind & Vastness)",
    location: "Mongolia & Kyrgyzstan",
    image: "/images/wp-assets/Steppe-Exposure.webp",
    desc: "Unsheltered open wind gales, mounted bow mechanics, and vast distance horizon aim."
  },
  {
    title: "Forest (Shadow & Acoustics)",
    location: "Muráň & Glencoe",
    image: "/images/wp-assets/Carpathian-Mountain.webp",
    desc: "Dense canopy light variation, unexpected obstacle releases, and timber acoustics."
  },
  {
    title: "Sub-Arctic (Frost & Cold)",
    location: "Yukon Territory",
    image: "/images/wp-assets/Artic-Exposure.webp",
    desc: "Sub-zero limb stiffening, heavy winter gear clearance, and snow drift stability."
  }
];

const RANKS = [
  {
    rank: "Initiate Explorer",
    badge: "Foundation",
    req: "1 Ecosystem Complete",
    desc: "Demonstrated technical form stability and basic range safety in one primary terrain environment."
  },
  {
    rank: "Field Explorer",
    badge: "Advanced",
    req: "3 Ecosystems Complete",
    desc: "Multi-terrain adaptation, verified kinetic alignment under wind/elevation changes, and ESI Tier II exposure."
  },
  {
    rank: "Master Explorer",
    badge: "Apex Mastery",
    req: "5 Ecosystems Complete",
    desc: "Total environmental dominance. Proven operational adaptability in extreme alpine, desert, steppe, and ocean climates."
  }
];

export default function ExplorerRankSystemPage() {
  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* 1. Hero Section */}
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
            <span className="text-white font-bold">Explorer Rank System</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <Award className="w-4 h-4 text-accent" />
              Continuity &amp; Long-Term Commitment
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Explorer Rank System
            </h1>
            <p className="text-base md:text-xl text-[#f0e9d9]/85 font-sans max-w-3xl leading-relaxed font-light">
              Explorer Adventures is not a collection of isolated journeys. It is a structured path designed to test archer presence and physical resilience across five distinct global ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Global Ecosystems Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
            Environmental Variety
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
            The 5 Global Terrain Ecosystems
          </h2>
          <div className="w-12 h-[1px] bg-accent/40 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEMS.map((eco, idx) => (
            <div
              key={idx}
              className="bg-[#0b3126] border border-accent/20 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-accent/60 transition-all group"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                <img
                  src={eco.image}
                  alt={eco.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0e3b2e]/90 border border-accent/30 px-3 py-1 rounded-full text-[10px] font-mono text-accent font-bold uppercase">
                  {eco.location}
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-accent transition-colors">
                    {eco.title}
                  </h3>
                  <p className="text-xs text-[#f0e9d9]/75 font-sans leading-relaxed">
                    {eco.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Rank Hierarchy Cards */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-10 border-t border-accent/20">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
            Rank Structure
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Progression Levels
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RANKS.map((r, idx) => (
            <div
              key={idx}
              className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl hover:border-accent/60 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-accent/20 text-accent font-bold border border-accent/30">
                    {r.badge}
                  </span>
                  <span className="text-xs font-serif font-bold text-white/70">{r.req}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">{r.rank}</h3>
                <p className="text-xs text-[#f0e9d9]/80 font-sans leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-gradient-to-r from-[#0b3126] via-[#124d3d] to-[#0b3126] border border-accent/30 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white">Begin Your Explorer Trajectory</h3>
          <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans max-w-xl mx-auto">
            Log your expedition hours and apply for rank progression assessments across upcoming European, Steppe, or Ocean modules.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
          >
            <span>Apply for Rank Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
