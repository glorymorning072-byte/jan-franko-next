import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, ArrowRight, ChevronRight, AlertTriangle, Lock, FileText, Compass, Shield } from "lucide-react";
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
            <span className="text-white font-bold">Certification</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#c5a880]/15 border border-[#c5a880]/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <ShieldCheck className="w-4 h-4 text-accent" />
              Safety Through Governance
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Certification &amp; Audit Structure
            </h1>
            <p className="text-base md:text-xl text-white/85 font-sans max-w-3xl leading-relaxed font-light">
              Certification is the mandatory verification required for safe operational deployment. We do not issue participation trophies; we issue licenses to operate within specific Environmental Stress Index (ESI) thresholds.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Philosophy Notice (Light Container) */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-white border-l-4 border-[#7d603a] border-t border-r border-b border-primary/10 p-6 sm:p-8 rounded-r-3xl space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#7d603a] font-bold">
            <AlertTriangle className="w-4 h-4 text-[#7d603a]" />
            <span>Operational Integrity Standard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary">
            The Gatekeeper Protocol: Why Verification Matters
          </h2>
          <p className="text-xs sm:text-sm text-primary/80 font-sans leading-relaxed">
            In extreme mountain terrain, alpine gales, or mounted archery drills, negligence invites injury. Certification guarantees that every archer on an academy expedition possesses verified biomechanical safety, range discipline, equipment structural checks, and thermal self-regulation before stepping onto hazardous ground.
          </p>
        </div>
      </section>

      {/* 3. Detailed Level-by-Level Breakdown */}

      {/* SECTION A: TIER I BADGE */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-primary/10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 bg-white border border-primary/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
            <div className="relative w-48 aspect-square overflow-hidden bg-secondary/50 rounded-2xl p-4 border border-primary/10">
              <img
                src="/images/wp-assets/Tier-1.webp"
                alt="Tier I Badge - Foundational Mechanics"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                Tier I Foundational
              </span>
              <h3 className="text-xl font-serif font-bold text-primary mt-2">
                Foundational Mechanics
              </h3>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 text-primary/85 leading-relaxed">
            <h4 className="text-2xl font-serif font-bold text-primary">
              Tier I Verification: Range Safety &amp; Skeletal Stance
            </h4>
            <p className="text-sm md:text-base">
              The Tier I Badge establishes foundational proficiency. Before an archer is permitted to shoot on un-level field terrain, they must demonstrate repeatable form mechanics on a flat 30-meter range under neutral weather conditions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">1. 30m Target Accuracy</strong>
                <p className="text-xs text-primary/75">Minimum 80% arrow placement inside the 60cm target circle across 10 ends of 3 arrows.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">2. Range Command Compliance</strong>
                <p className="text-xs text-primary/75">Flawless execution of straddle line protocols, nocking safety, and unstringing checks.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">3. Spine &amp; Arrow Matching</strong>
                <p className="text-xs text-primary/75">Understanding proper arrow shaft weight, grain balance, and bow draw weight safety.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">4. Shoulder Alignment</strong>
                <p className="text-xs text-primary/75">Correct scapular depression and draw elbow height to prevent rotator cuff strain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: TIER II BADGE */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-primary/10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-primary/85 leading-relaxed order-2 lg:order-1">
            <h4 className="text-2xl font-serif font-bold text-primary">
              Tier II Verification: Dynamic Field Exposure &amp; Slope Adaptation
            </h4>
            <p className="text-sm md:text-base">
              The Tier II Badge tests an archer’s capability to maintain kinetic posture and mental focus under real environmental stress: sloping terrain, 25-40 km/h wind gusts, variable shadows, and sudden elevation changes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">1. Slope Stance Alignment</strong>
                <p className="text-xs text-primary/75">Bending from the hips rather than tilting shoulders when shooting uphill or downhill.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">2. Wind Drift Compensation</strong>
                <p className="text-xs text-primary/75">Estimating crosswind deflection and releasing between wind gust lulls.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">3. Diaphragmatic Breath Release</strong>
                <p className="text-xs text-primary/75">Timing the release at the natural exhale pause after steep mountain trail ascents.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">4. ESI Level 3 Exposure</strong>
                <p className="text-xs text-primary/75">Verified operational endurance across alpine ridge conditions and cold exposure.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-primary/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-sm order-1 lg:order-2">
            <div className="relative w-48 aspect-square overflow-hidden bg-secondary/50 rounded-2xl p-4 border border-primary/10">
              <img
                src="/images/wp-assets/Tier-2.webp"
                alt="Tier II Badge - Performance Verification"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                Tier II Field Verified
              </span>
              <h3 className="text-xl font-serif font-bold text-primary mt-2">
                Performance Verification
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: TIER III BADGE */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-primary/10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 bg-white border border-accent/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-md bg-gradient-to-br from-white to-secondary">
            <div className="relative w-48 aspect-square overflow-hidden bg-[#0e3b2e] rounded-2xl p-4 border border-accent/30">
              <img
                src="/images/wp-assets/image-25-02-2026-15-41-34-1.webp"
                alt="Tier III Badge - Summit Protocol Audit"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-accent text-[#0e3b2e] font-bold">
                Tier III Apex Audit
              </span>
              <h3 className="text-xl font-serif font-bold text-primary mt-2">
                Summit Protocol
              </h3>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 text-primary/85 leading-relaxed">
            <h4 className="text-2xl font-serif font-bold text-primary">
              Tier III Verification: Apex Summit Audit &amp; 145m Distance Standard
            </h4>
            <p className="text-sm md:text-base">
              The Summit Protocol is the ultimate benchmark of traditional bowmanship. Conducted under ESI Level 4 and Level 5 environmental conditions, the archer is audited on flight distance precision, extreme gale stability, and psychological calm.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">1. 145m Flight Target Grouping</strong>
                <p className="text-xs text-primary/75">Achieving consistent target hits at 145 meters with un-sighted traditional bows.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">2. Sub-Zero Gale Endurance</strong>
                <p className="text-xs text-primary/75">Maintaining bow hand stability in -15°C temperatures and 45+ km/h mountain gales.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">3. Heart Rate Stabilization</strong>
                <p className="text-xs text-primary/75">Dropping pulse below 90 bpm within 30 seconds of high-altitude exertion.</p>
              </div>
              <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-1">
                <strong className="text-xs font-serif font-bold text-[#7d603a] uppercase tracking-wider block">4. Instructor Panel Evaluation</strong>
                <p className="text-xs text-primary/75">Unanimous sign-off by senior academy field evaluators and Jan Franko.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Validity & Re-Audit Cycle */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 border-t border-primary/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm">
          <h3 className="text-2xl font-serif font-bold text-primary">
            Documented Authority &amp; Biennial Re-Audit
          </h3>
          <p className="text-sm text-primary/80 leading-relaxed font-sans">
            Certifications issued by Jan Franko Traditional Archery Academy are logged into the permanent academy registry. Valid for 24 months, certifications require biennial operational re-audits to ensure skills remain sharp.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-secondary p-4 rounded-2xl space-y-1 border border-primary/5">
              <span className="text-[10px] font-mono uppercase text-[#7d603a] font-bold">Validity Period</span>
              <span className="text-base font-serif font-bold text-primary block">24 Months</span>
            </div>
            <div className="bg-secondary p-4 rounded-2xl space-y-1 border border-primary/5">
              <span className="text-[10px] font-mono uppercase text-[#7d603a] font-bold">Audit Type</span>
              <span className="text-base font-serif font-bold text-primary block">Field Verified</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0e3b2e] text-white rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-serif font-bold text-white">
              Submit for Certification Audit
            </h3>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
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
