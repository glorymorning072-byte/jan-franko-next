import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Award, ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, Target, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summit Protocol (Tier III) | Jan Franko Traditional Archery Academy",
  description:
    "The apex audit of environmental dominance: 145m distance standard, atmospheric resistance, and physiological composure under extreme stress.",
  openGraph: {
    title: "Summit Protocol (Tier III) | Jan Franko Traditional Archery Academy",
    description: "Tier III Apex Verification & 145m flight distance standard."
  }
};

const SUMMIT_BENCHMARKS = [
  {
    title: "1. The 145m Distance Flight Standard",
    badge: "Long Range Flight",
    icon: Target,
    summary: "Achieving repeatable target groupings at 145 meters using traditional composite or wood bows without artificial sights or stabilizers.",
    details: [
      "Parabolic Arc Calculation: Reading arrow drop and elevation angle for extreme distance.",
      "Un-sighted Gap Aiming: Relying on instinct and peripheral horizon framing at 145 meters.",
      "Release Uniformity: Zero torque or hand rotation on heavy draw weight releases."
    ]
  },
  {
    title: "2. Atmospheric Resistance & Climate Load",
    badge: "Severe Climate",
    icon: Compass,
    summary: "Maintaining structural draw form in sub-zero alpine temperatures (-15°C) and mountain gale winds exceeding 45 km/h.",
    details: [
      "Gale Force Wind Compensation: Releasing in micro-lulls between alpine ridge gusts.",
      "Sub-Zero Limb Flexibility: Managing natural horn, sinew, and yew wood limb stiffness.",
      "Winter Gear Clearance: Ensuring heavy alpine outerwear does not contact the bowstring."
    ]
  },
  {
    title: "3. Physiological Heart-Rate Regulation",
    badge: "Biometrics",
    icon: Zap,
    summary: "Sustaining a calm, controlled heart rate and steady draw hold immediately following steep high-elevation trail ascents.",
    details: [
      "Rapid Pulse Reduction: Dropping heart rate below 90 bpm within 30 seconds of high-altitude climb.",
      "Diaphragmatic Breath Pause: Executing the release at the exact bottom of the exhale pause.",
      "Tremor Control: Stabilizing shoulder and arm muscles under lactic acid buildup."
    ]
  },
  {
    title: "4. Psychological Composure & Isolation",
    badge: "Mindset",
    icon: ShieldCheck,
    summary: "Unwavering mental clarity and emotional stillness under fatigue, isolation, and environmental unpredictability.",
    details: [
      "Zero-Panic Protocol: Maintaining calm focus during unexpected weather shifts or equipment strain.",
      "Sustained Concentration: Executing precision shots across 6 continuous hours of field audit.",
      "Lineage Compliance: Respecting safety boundaries and environmental preservation rules."
    ]
  }
];

export default function SummitProtocolPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-24 pb-20 select-text font-sans">
      {/* 1. Dark Hero Section */}
      <section className="relative border-b border-primary/10 bg-[#0e3b2e] text-white py-16 md:py-24 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.15),transparent_70%)] pointer-events-none" />
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
            <span className="text-white font-bold">Summit Protocol</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-accent/20 border border-accent/40 rounded-full text-xs font-serif font-bold tracking-widest uppercase text-accent">
              <Zap className="w-4 h-4 text-accent" />
              Tier III Apex Verification
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              The Summit Protocol
            </h1>
            <p className="text-base md:text-xl text-white/85 font-sans max-w-3xl leading-relaxed font-light">
              This is the apex of the Academy's structural verification. The Summit Protocol is an audit of total environmental dominance, requiring the archer to maintain elite technical standards at the extreme limits of human endurance.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detailed Benchmarks Breakdown */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            Apex Audit Benchmarks
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            Mandatory Summit Standards
          </h2>
          <p className="text-xs sm:text-sm text-primary/75 max-w-2xl font-sans">
            Every candidate undergoing the Summit Protocol is evaluated on four core physical and mental pillars.
          </p>
          <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
        </div>

        <div className="space-y-10">
          {SUMMIT_BENCHMARKS.map((bm, idx) => {
            const Icon = bm.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-accent/40 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0e3b2e] flex items-center justify-center text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary">{bm.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                    {bm.badge}
                  </span>
                </div>

                <p className="text-sm md:text-base text-primary/85 font-sans leading-relaxed">
                  {bm.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-serif uppercase tracking-wider text-primary font-bold block">
                    Detailed Audit Criteria:
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-primary/85">
                    {bm.details.map((d, dIdx) => (
                      <li key={dIdx} className="bg-secondary p-4 rounded-2xl border border-primary/5 space-y-1">
                        <CheckCircle2 className="w-4 h-4 text-[#7d603a] mb-1" />
                        <span className="leading-relaxed block">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Audit Checklist & Application Requirements */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-primary/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-5 shadow-sm">
          <h3 className="text-2xl font-serif font-bold text-primary">Eligibility &amp; Prerequisites</h3>
          <p className="text-xs sm:text-sm text-primary/80 leading-relaxed font-sans">
            Candidates for the Summit Protocol must hold a valid Tier II Performance Verification badge, documented field expedition hours, and instructor sponsorship.
          </p>
          <ul className="space-y-3 text-xs font-sans text-primary/90">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#7d603a] shrink-0" />
              <span>Verified Tier II Badge Compliance</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#7d603a] shrink-0" />
              <span>Minimum 120 Field Hours in High ESI Zones</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#7d603a] shrink-0" />
              <span>Medical Clearance for High Altitude Exertion</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#7d603a] shrink-0" />
              <span>Sponsorship by Head Instructor Jan Franko</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#0e3b2e] text-white rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white">Apply for Tier III Audit</h3>
          <p className="text-xs text-white/80 font-sans max-w-md mx-auto leading-relaxed">
            Submit your application for the upcoming alpine or steppe Summit Protocol verification session.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
          >
            <span>Request Summit Application</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
