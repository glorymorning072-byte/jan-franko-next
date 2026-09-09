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
  CheckCircle2
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Academy | Curriculum, Certification & Governance",
  description:
    "Discover the structured curriculum of the Jan Franko Traditional Archery Academy: Certification audit, Explorer Rank System, Summit Protocols, ESI metric, and Code of Conduct.",
  openGraph: {
    title: "The Academy | Curriculum, Certification & Governance",
    description:
      "Structured environmental framework from foundational mechanics to apex summit protocols."
  }
};

const ACADEMY_CARDS = [
  {
    slug: "certification",
    title: "Certification & Audit",
    icon: ShieldCheck,
    badge: "Mandatory Safety",
    description:
      "Mandatory operational verification required for safe field deployment across specific Environmental Stress Index (ESI) thresholds.",
    features: ["Tier I Foundational Badge", "Tier II Performance Verification", "Tier III Summit Audit"]
  },
  {
    slug: "explorer-rank-system",
    title: "Explorer Rank System",
    icon: Award,
    badge: "5 Ecosystems",
    description:
      "A structured progression system recognizing continuity, mental presence, and long-term commitment across ocean, mountain, steppe, forest, and desert terrains.",
    features: ["Initiate Explorer", "Field Explorer", "Master Explorer Benchmark"]
  },
  {
    slug: "summit-protocol",
    title: "Summit Protocol (Tier III)",
    icon: Zap,
    badge: "Apex Verification",
    description:
      "The apex of environmental verification: auditing technical stability, atmospheric resistance, and 145m distance standards under extreme stress.",
    features: ["145m Distance Benchmark", "Atmospheric Stress Control", "Physiological Regulation"]
  },
  {
    slug: "environmental-stress-index-esi",
    title: "Environmental Stress Index (ESI)",
    icon: Layers,
    badge: "Proprietary Metric",
    description:
      "Quantifying external environmental load (wind, altitude, temperature, terrain volatility) against internal archer composure.",
    features: ["ESI 1 to ESI 5 Exposure", "External Load Metrics", "Internal Stability Assessment"]
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct & Neutrality",
    icon: Lock,
    badge: "Governance Standard",
    description:
      "Removing external friction and maintaining a high-discipline environment focused exclusively on mechanical mastery and environmental resilience.",
    features: ["Neutrality Protocol", "Safety Governance", "Ethical Prerequisites"]
  },
  {
    slug: "explorer-path",
    title: "Explorer Path Trajectory",
    icon: BookOpen,
    badge: "Student Evolution",
    description:
      "Your structural roadmap detailing student evolution from basic form mechanics through advanced field expeditions.",
    features: ["Mechanics Foundation", "Dynamic Field Exposure", "Summit Trajectory"]
  }
];

export default async function AcademyHubPage() {
  // Fetch main Academy page content from WP
  let wpPageContent = "";
  try {
    const res = await fetch("https://janfranko.com/wp-json/wp/v2/pages?slug=the-academy", {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        wpPageContent = data[0].content?.rendered || "";
      }
    }
  } catch (err) {
    console.error("Failed to fetch WP academy overview:", err);
  }

  // Clean HTML
  wpPageContent = wpPageContent
    .replace(/https:\/\/janfranko\.com\/the-academy\//g, "/academy/")
    .replace(/https:\/\/janfranko\.com\/archery-games\//g, "/archery-games/")
    .replace(/https:\/\/janfranko\.com\//g, "/");

  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* Hero Section */}
      <section className="relative border-b border-accent/20 bg-gradient-to-b from-[#0e3b2e] via-[#092b21] to-[#0e3b2e] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
            <Compass className="w-4 h-4" />
            Structure • Progression • Governance
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            The Academy
          </h1>
          <p className="text-base sm:text-lg text-[#f0e9d9]/85 font-sans leading-relaxed max-w-3xl mx-auto font-light">
            A defined vertical progression from foundational mechanics to apex summit protocols. We treat terrain, wind, elevation, and climate as key components of archery discipline.
          </p>
        </div>
      </section>

      {/* Grid of Academy Curriculum Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
            Academy System Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Core Curriculum &amp; System Governance
          </h2>
          <div className="w-12 h-[1px] bg-accent/40 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACADEMY_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.slug}
                className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:border-accent/60 transition-all duration-300 shadow-xl group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#0e3b2e] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 text-accent font-bold border border-accent/20">
                      {card.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-accent transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#f0e9d9]/75 font-sans leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-accent/15">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-sans text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/academy/${card.slug}`}
                  className="w-full py-3 px-4 bg-white/5 hover:bg-accent hover:text-[#0e3b2e] text-white border border-white/15 rounded-2xl font-serif text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Explore Standard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rendered WP Content Body (if present) */}
      {wpPageContent && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-accent/20">
          <div className="bg-[#0b3126]/70 border border-accent/20 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <article
              className="prose prose-invert prose-amber max-w-none
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:border-b prose-h2:border-accent/20 prose-h2:pb-3 prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:text-accent prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-sm prose-p:sm:text-base prose-p:text-[#f0e9d9]/85 prose-p:leading-relaxed prose-p:font-sans
                prose-ul:space-y-2 prose-li:text-sm prose-li:text-[#f0e9d9]/85
                prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-accent"
              dangerouslySetInnerHTML={{ __html: wpPageContent }}
            />
          </div>
        </section>
      )}

      {/* CTA Footer Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-gradient-to-r from-[#0b3126] via-[#124d3d] to-[#0b3126] border border-accent/30 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready for Verified Operational Audit?
            </h3>
            <p className="text-xs sm:text-sm text-[#f0e9d9]/80 font-sans leading-relaxed">
              Begin your entry verification or apply for Tier I foundations, Tier II field modules, or Tier III Summit Protocols.
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
              href="/archery-games"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
            >
              Archery Games &amp; Events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
