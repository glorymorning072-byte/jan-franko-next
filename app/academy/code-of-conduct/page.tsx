import React from "react";
import Link from "next/link";
import { Lock, CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
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

const CONDUCT_RULES_DETAILED = [
  {
    rule: "Rule 1",
    title: "Professional Neutrality & Sanctuary Protocol",
    badge: "Neutrality",
    summary: "The Academy is a sanctuary of physical discipline, craftsmanship, and environmental focus. External political, ideological, or social disputes are strictly prohibited during all training and expeditions.",
    points: [
      "Zero political or ideological debate during field workshops or camps.",
      "Equal respect for archers regardless of national origin or background.",
      "Complete focus on human movement, breath control, and traditional bowmanship."
    ]
  },
  {
    rule: "Rule 2",
    title: "Absolute Range Safety & Equipment Inspection",
    badge: "Operational Safety",
    summary: "Safety in traditional archery is non-negotiable. Archers must obey all range commands instantly and inspect equipment prior to every shooting session.",
    points: [
      "Mandatory bow limb & nock inspection prior to stringing.",
      "Strict compliance with Range Marshal commands (Cease Fire, Line Clear).",
      "Immediate retirement of cracked arrow shafts or frayed bowstrings."
    ]
  },
  {
    rule: "Rule 3",
    title: "Lineage & Craftsman Integrity",
    badge: "Heritage",
    summary: "Honoring traditional bowyer craftsmanship, historical archery lineages, and the hospitality of local expedition hosts in mountain and steppe regions.",
    points: [
      "Respecting custom bowyers and traditional toolmakers.",
      "Observing local cultural customs during international expeditions (e.g. Mongolia, Bhutan).",
      "Fostering a supportive, non-ego environment for archers of all skill levels."
    ]
  },
  {
    rule: "Rule 4",
    title: "Wilderness Stewardship & Leave No Trace",
    badge: "Environmental Ethics",
    summary: "Protecting natural habitats across alpine forests, high altitude mountain passes, and steppe grasslands.",
    points: [
      "Zero litter or environmental alteration during field shooting.",
      "Accountability for accounting and retrieving all shot arrows in wilderness terrain.",
      "Minimizing wildlife disturbance during trail hikes and alpine camps."
    ]
  }
];

export default function CodeOfConductPage() {
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
            <span className="text-white font-bold">Code of Conduct</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#c5a880]/15 border border-[#c5a880]/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <Lock className="w-4 h-4 text-accent" />
              Removing External Friction
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Code of Conduct &amp; Neutrality
            </h1>
            <p className="text-base md:text-xl text-white/85 font-sans max-w-3xl leading-relaxed font-light">
              Participation in the Academy is a privilege contingent upon strict adherence to ethical, professional, and safety standards. We maintain a high-discipline sanctuary focused exclusively on mechanical mastery.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detailed Governance Pillars */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            Rules of Engagement
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            The Four Governance Pillars
          </h2>
          <p className="text-xs sm:text-sm text-primary/75 max-w-2xl font-sans">
            These four pillars govern all activities across academy facilities, field workshops, and global expeditions.
          </p>
          <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
        </div>

        <div className="space-y-10">
          {CONDUCT_RULES_DETAILED.map((r, idx) => (
            <div
              key={idx}
              className="bg-white border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-accent/40 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                    {r.rule}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-primary">{r.title}</h3>
                </div>
                <span className="text-xs font-mono text-[#7d603a] uppercase font-bold">{r.badge}</span>
              </div>

              <p className="text-sm md:text-base text-primary/85 font-sans leading-relaxed">
                {r.summary}
              </p>

              <div className="bg-secondary p-4 rounded-2xl border border-primary/5 space-y-2">
                <span className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">
                  Specific Mandatory Directives:
                </span>
                <ul className="space-y-2 text-xs font-sans text-primary/80">
                  {r.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7d603a] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Enforcement & Acknowledgment Banner */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-primary/10">
        <div className="bg-[#0e3b2e] text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl font-serif font-bold text-white">Standards Enforcement Policy</h3>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              Non-compliance with safety protocols or neutrality rules results in immediate revocation of expedition privileges and certification credentials.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
          >
            <span>Acknowledge Standards</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
