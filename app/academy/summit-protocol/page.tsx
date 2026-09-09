import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Award, ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, Target } from "lucide-react";
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

const BENCHMARKS = [
  {
    title: "The 145m Distance Standard",
    badge: "Long Range",
    desc: "Achieving tight target groupings at 145 meters using traditional bows without sights, adjusting for parabolic wind arcs and gravity drops."
  },
  {
    title: "Atmospheric Stress Control",
    badge: "Climate Load",
    desc: "Maintaining structural draw form in sub-zero alpine temperatures (-15°C) and crosswinds exceeding 45 km/h."
  },
  {
    title: "Physiological Regulation",
    badge: "Biometrics",
    desc: "Sustaining a calm heart rate and steady draw hold immediately following high-elevation steep ascent."
  },
  {
    title: "Psychological Composure",
    badge: "Mindset",
    desc: "Unwavering presence under fatigue, isolation, and environmental unpredictability."
  }
];

export default function SummitProtocolPage() {
  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* Hero Banner */}
      <section className="relative border-b border-accent/20 bg-gradient-to-b from-[#0e3b2e] via-[#092b21] to-[#0e3b2e] py-16 md:py-24 overflow-hidden">
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
            <p className="text-base md:text-xl text-[#f0e9d9]/85 font-sans max-w-3xl leading-relaxed font-light">
              This is the apex of the Academy's structural verification. The Summit Protocol is an audit of total environmental dominance, requiring the archer to maintain elite technical standards at the extreme limits of human endurance.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory Benchmarks Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
            Mandatory Verification Criteria
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Apex Technical Benchmarks
          </h2>
          <div className="w-12 h-[1px] bg-accent/40 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENCHMARKS.map((b, idx) => (
            <div
              key={idx}
              className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 space-y-4 hover:border-accent/60 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-accent/20 text-accent font-bold border border-accent/30">
                  {b.badge}
                </span>
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">{b.title}</h3>
              <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audit Checklist & Eligibility */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-t border-accent/20">
        <div className="bg-[#0b3126]/80 border border-accent/20 rounded-3xl p-8 space-y-5">
          <h3 className="text-2xl font-serif font-bold text-white">Eligibility Requirements</h3>
          <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans leading-relaxed">
            Candidates for the Summit Protocol must hold a valid Tier II Performance Verification badge, documented field expedition hours, and instructor sponsorship.
          </p>
          <ul className="space-y-3 text-xs font-sans text-white/90">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Verified Tier II Badge Compliance</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Minimum 120 Field Hours in High ESI Zones</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Medical Clearance for High Altitude Exertion</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-[#0b3126] to-[#124d3d] border border-accent/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white">Apply for Tier III Audit</h3>
          <p className="text-xs text-[#f0e9d9]/80 font-sans max-w-md mx-auto leading-relaxed">
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
