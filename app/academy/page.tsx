import React from "react";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Award,
  Zap,
  Layers,
  Lock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
  ChevronRight,
  Shield,
  FileText
} from "lucide-react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "The Academy | Curriculum, Certification & Governance",
  description: "Structured environmental framework from foundational mechanics to apex summit protocols.",
});

const ACADEMY_SYSTEMS = [
  {
    slug: "certification",
    title: "Certification & Audit",
    icon: ShieldCheck,
    badge: "Mandatory Safety",
    shortDesc: "Operational safety verification required before field deployment across specific Environmental Stress Index (ESI) thresholds.",
    detail: "Certification is not a participation certificate—it is a formal license to operate in dynamic field conditions. Archers undergo rigorous evaluation covering equipment safety, drawing biomechanics, range discipline, and environmental adaptation."
  },
  {
    slug: "explorer-rank-system",
    title: "Explorer Rank System",
    icon: Award,
    badge: "5 Ecosystems",
    shortDesc: "Recognizing continuity, mental presence, and physical resilience across five distinct global terrain environments.",
    detail: "Archery discipline changes dramatically between coastal ocean humidity, thin alpine mountain air, Eurasian steppe wind gales, dense forest shadow, and sub-arctic frost. The Rank System charts an archer's evolution from Initiate to Master Explorer."
  },
  {
    slug: "summit-protocol",
    title: "Summit Protocol (Tier III)",
    icon: Zap,
    badge: "Apex Level",
    shortDesc: "The apex audit of environmental dominance: 145m distance flight target accuracy and physiological heart-rate control under severe stress.",
    detail: "Operating at the outer limits of human endurance, the Summit Protocol tests an archer's capacity to maintain precise shot execution during mountain storm winds, steep elevation ascents, and severe atmospheric loads."
  },
  {
    slug: "environmental-stress-index-esi",
    title: "Environmental Stress Index (ESI)",
    icon: Layers,
    badge: "Metric Scale",
    shortDesc: "Quantifying external environmental load (wind, altitude, temperature, terrain volatility) against internal archer composure.",
    detail: "Stillness is measured by the magnitude of chaos an archer can withstand without losing kinetic alignment. The ESI scale ranges from ESI 1 (controlled flat range) to ESI 5 (sub-arctic alpine gale)."
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct & Neutrality",
    icon: Lock,
    badge: "Governance",
    shortDesc: "Removing external friction and maintaining a high-discipline sanctuary focused exclusively on mechanical mastery and respect.",
    detail: "Participation in academy expeditions and field workshops requires strict adherence to professional neutrality, range safety commands, Leave No Trace wilderness ethics, and mutual respect for master bowyers and local hosts."
  },
  {
    slug: "archery-games",
    title: "Archery Games & Gatherings",
    icon: Target,
    badge: "Gatherings",
    shortDesc: "Heritage archery gatherings, open-sky precision competitions, and historical target disciplines.",
    detail: "Historical archery gatherings bring archers together under open skies to test speed shooting, distance flight, moving target tracking, and dynamic slope releases according to traditional rules."
  }
];

export default function AcademyHubPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-24 pb-20 select-text font-sans">
      {/* 1. Dark Hero Section */}
      <section className="relative border-b border-primary/10 bg-[#0e3b2e] text-white py-16 md:py-24 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <nav className="flex items-center justify-center gap-2 text-xs font-serif uppercase tracking-widest text-accent/80 font-semibold">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <span className="text-white font-bold">The Academy</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#c5a880]/15 border border-[#c5a880]/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
            <Compass className="w-4 h-4 text-accent" />
            Structure • Progression • Governance
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            The Academy
          </h1>
          <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-3xl mx-auto font-light">
            A defined vertical progression from foundational mechanics to apex summit protocols. We treat terrain, wind, elevation, and climate as vital components of archery discipline.
          </p>
        </div>
      </section>

      {/* 2. Philosophical Framework Section (Light Background) */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-b border-primary/10 space-y-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            Academy Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            The Synthesis of Archery &amp; Body Mechanics
          </h2>
          <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm md:text-base text-primary/85 leading-relaxed font-sans">
          <p>
            Traditional archery is frequently misconstrued as either static indoor target shooting or historical reenactment. At the Jan Franko Academy, we approach it as a rigorous kinetic discipline. Drawing a heavy bow in natural environments demands structural skeletal alignment, diaphragmatic breath regulation, and deep physiological composure.
          </p>
          <p>
            Integrating 25+ years of therapeutic bodywork, Traditional Chinese Medicine (TCM), and traditional bow craftsmanship, the Academy establishes clear verification standards. Archers learn to adapt their release timing, anchor stability, and mental focus across changing wind velocities, mountain slopes, and temperature extremes.
          </p>
        </div>
      </section>

      {/* 3. Core Curriculum Systems Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            System Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            Curriculum &amp; Governance Areas
          </h2>
          <p className="text-xs sm:text-sm text-primary/75 max-w-2xl mx-auto font-sans">
            Every section of the Academy curriculum operates as a distinct pillar of archer verification.
          </p>
          <div className="w-12 h-[1.5px] bg-accent/60 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACADEMY_SYSTEMS.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.slug}
                className="bg-white border border-primary/10 rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:border-accent/60 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0e3b2e] flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-secondary text-[#7d603a] font-bold border border-primary/10">
                      {sys.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-primary group-hover:text-[#7d603a] transition-colors">
                      {sys.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#7d603a] font-sans">
                      {sys.shortDesc}
                    </p>
                    <p className="text-xs text-primary/75 font-sans leading-relaxed pt-1">
                      {sys.detail}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/academy/${sys.slug}`}
                  className="w-full py-3 px-4 bg-[#0e3b2e] hover:bg-accent hover:text-[#0e3b2e] text-white rounded-2xl font-serif text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Explore Standard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. The 3 Progression Tiers */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-primary/10 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            Vertical Progression
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            The Three Verification Tiers
          </h2>
          <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Tier I</span>
            <h3 className="text-xl font-serif font-bold text-primary">Foundational Mechanics</h3>
            <p className="text-xs text-primary/75 leading-relaxed font-sans">
              Mastering static form alignment, scapular contraction, anchor consistency, and initial range safety compliance under neutral environmental conditions.
            </p>
          </div>

          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Tier II</span>
            <h3 className="text-xl font-serif font-bold text-primary">Dynamic Field Exposure</h3>
            <p className="text-xs text-primary/75 leading-relaxed font-sans">
              Adapting posture to sloping alpine ground, 25-40 km/h wind gusts, variable lighting, and multi-terrain obstacle targets.
            </p>
          </div>

          <div className="bg-white border border-accent/40 rounded-3xl p-8 space-y-4 shadow-md bg-gradient-to-br from-white to-secondary">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Tier III</span>
            <h3 className="text-xl font-serif font-bold text-primary">Summit Protocol Audit</h3>
            <p className="text-xs text-primary/75 leading-relaxed font-sans">
              Apex operational verification. Executing 145m long-range target groupings during extreme mountain storm gales and high-altitude exertion.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-[#0e3b2e] text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready for Operational Verification?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              Inquire about upcoming field audits, certification prerequisites, or entry verification for Academy expeditions.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
            >
              Submit Application
            </Link>
            <Link
              href="/academy/certification"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
            >
              View Certification Standards
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
