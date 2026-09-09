import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, CheckCircle2, ArrowRight, ChevronRight, AlertTriangle, Lock, FileText, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification & Audit | Jan Franko Traditional Archery Academy",
  description:
    "Mandatory operational verification required for safe archery deployment across specific Environmental Stress Index (ESI) thresholds.",
  openGraph: {
    title: "Certification & Audit | Jan Franko Traditional Archery Academy",
    description: "Operational safety verification across Tier I, Tier II, and Tier III Summit Audit benchmarks."
  }
};

export default function CertificationPage() {
  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* 1. Distinct Hero Banner */}
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
            <span className="text-white font-bold">Certification</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <ShieldCheck className="w-4 h-4 text-accent" />
              Safety Through Governance
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Certification Structure
            </h1>
            <p className="text-base md:text-xl text-[#f0e9d9]/85 font-sans max-w-3xl leading-relaxed font-light">
              Certification is the mandatory verification required for safe operational deployment. We do not issue participation trophies; we issue licenses to operate within specific Environmental Stress Index (ESI) thresholds.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Philosophy Notice */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-[#0b3126] border-l-4 border-accent p-6 sm:p-8 rounded-r-3xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-accent font-bold">
            <AlertTriangle className="w-4 h-4 text-accent" />
            <span>Operational Integrity Standard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            The Gatekeeper Protocol
          </h2>
          <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans leading-relaxed">
            In extreme mountain terrain, alpine gales, or mounted archery drills, negligence invites injury. Certification guarantees that every archer on an expedition possesses verified biomechanical safety, range discipline, and thermal self-regulation.
          </p>
        </div>
      </section>

      {/* 3. Verification Levels Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-8 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
            Prerequisite Progression
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Verification Levels &amp; Badges
          </h2>
          <div className="w-12 h-[1px] bg-accent/40 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Level 1: Tier I Badge */}
          <div className="bg-[#0b3126] border border-accent/20 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-accent/60 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                <img
                  src="/images/wp-assets/Tier-1.webp"
                  alt="Tier I Badge - Foundational Mechanics"
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold bg-black/30 px-3 py-1 rounded-full border border-accent/20">
                  Level I Prerequisite
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Tier I Badge: Foundational Mechanics
                </h3>
                <p className="text-xs text-[#f0e9d9]/75 font-sans leading-relaxed">
                  Verification of basic draw form, skeletal alignment, range safety protocols, and equipment inspection under neutral weather conditions.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-sans text-[#f0e9d9]/90 border-t border-accent/15 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>30m Target Consistency Benchmark</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Basic Field Safety Compliance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Level 2: Tier II Badge */}
          <div className="bg-[#0b3126] border border-accent/20 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-accent/60 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                <img
                  src="/images/wp-assets/Tier-2.webp"
                  alt="Tier II Badge - Performance Verification"
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold bg-black/30 px-3 py-1 rounded-full border border-accent/20">
                  Level II Dynamic Exposure
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Tier II Badge: Performance Verification
                </h3>
                <p className="text-xs text-[#f0e9d9]/75 font-sans leading-relaxed">
                  Demonstrated posture control under elevation changes, wind exposure, rapid shot sequences, and thermal stress.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-sans text-[#f0e9d9]/90 border-t border-accent/15 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Dynamic Slope Target Assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Breath &amp; Stress Stabilization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Level 3: Tier III Badge */}
          <div className="bg-[#0b3126] border border-accent/30 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-accent/70 transition-all shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                <img
                  src="/images/wp-assets/image-25-02-2026-15-41-34-1.webp"
                  alt="Tier III Badge - Summit Protocol Audit"
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0e3b2e] font-bold bg-accent px-3 py-1 rounded-full">
                  Tier III Summit Audit
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Tier III Badge: Summit Protocol
                </h3>
                <p className="text-xs text-[#f0e9d9]/75 font-sans leading-relaxed">
                  The apex certification. Complete environmental dominance, 145m long-distance precision, and physiological composure during extreme mountain wind gales.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-sans text-[#f0e9d9]/90 border-t border-accent/15 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>145m Flight Target Standard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Extreme Environmental Resilience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Documented Authority & Audit Process */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-[#0b3126]/80 border border-accent/20 rounded-3xl p-8 space-y-5">
          <h3 className="text-2xl font-serif font-bold text-white">
            Documented Authority &amp; Validity
          </h3>
          <p className="text-sm text-[#f0e9d9]/80 font-sans leading-relaxed">
            Certifications issued by Jan Franko Traditional Archery Academy are logged into the permanent academy registry. Valid for 24 months, certifications require biennial operational re-audits to ensure skills remain sharp.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-accent font-bold">Validity Period</span>
              <span className="text-base font-serif font-bold text-white block">24 Months</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-accent font-bold">Audit Type</span>
              <span className="text-base font-serif font-bold text-white block">Field Verified</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0b3126] to-[#124d3d] border border-accent/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-serif font-bold text-white">
              Submit for Certification Audit
            </h3>
            <p className="text-xs text-[#f0e9d9]/80 font-sans leading-relaxed">
              If you have completed prerequisite training hours or want to request a field assessment during upcoming expeditions, submit your request.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
          >
            <span>Request Audit Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
