import React from "react";
import Link from "next/link";
import { Lock, Shield, CheckCircle2, AlertOctagon, ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code of Conduct & Neutrality | Jan Franko Traditional Archery Academy",
  description:
    "Adherence to strict professional, ethical, and safety standards during all academy expeditions, field workshops, and gatherings.",
  openGraph: {
    title: "Code of Conduct & Neutrality | Jan Franko Traditional Archery Academy",
    description: "Removing external friction and enforcing strict safety governance."
  }
};

const RULES = [
  {
    title: "1. Professional Neutrality",
    badge: "Ethics",
    desc: "The Academy is a sanctuary of physical discipline and traditional craft. External political, ideological, or social disputes are strictly prohibited during training."
  },
  {
    title: "2. Absolute Range Safety",
    badge: "Safety",
    desc: "Unwavering compliance with range marshals, bow stringing checks, target line clears, and arrow inspection routines."
  },
  {
    title: "3. Lineage & Craftsman Respect",
    badge: "Lineage",
    desc: "Respect for historical traditions, master bowyers, local nomadic hosts, and fellow archers of all skill levels."
  },
  {
    title: "4. Wilderness Stewardship",
    badge: "Environment",
    desc: "Strict adherence to Leave No Trace principles across alpine forests, high altitude mountain passes, and steppe grasslands."
  }
];

export default function CodeOfConductPage() {
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
            <span className="text-white font-bold">Code of Conduct</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <Lock className="w-4 h-4 text-accent" />
              Removing External Friction
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Code of Conduct &amp; Neutrality
            </h1>
            <p className="text-base md:text-xl text-[#f0e9d9]/85 font-sans max-w-3xl leading-relaxed font-light">
              Participation in the Academy is a privilege contingent upon strict adherence to ethical and safety standards. We maintain a high-discipline environment focused exclusively on mechanical mastery.
            </p>
          </div>
        </div>
      </section>

      {/* Rules Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
            Rules of Engagement
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Governance Pillars
          </h2>
          <div className="w-12 h-[1px] bg-accent/40 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RULES.map((r, idx) => (
            <div
              key={idx}
              className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 space-y-4 hover:border-accent/60 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-accent/20 text-accent font-bold border border-accent/30">
                  {r.badge}
                </span>
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">{r.title}</h3>
              <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Standards Enforcement Notice */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 md:p-10 space-y-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-white">Standards Enforcement</h3>
            <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans max-w-xl">
              Non-compliance with safety protocols or neutrality rules results in immediate revocation of expedition privileges and certification badges.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-md shrink-0"
          >
            Acknowledge Standards
          </Link>
        </div>
      </section>
    </main>
  );
}
