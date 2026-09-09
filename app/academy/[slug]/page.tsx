import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Compass,
  Zap,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  FileText,
  Lock,
  Layers,
  Sparkles
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Canonical Academy slugs and aliases mapping
const ACADEMY_SLUG_MAP: Record<string, string> = {
  "certification": "certification",
  "explorer-rank-system": "explorer-rank-system",
  "rank-system": "explorer-rank-system",
  "code-of-conduct": "code-of-conduct",
  "summit-protocol": "summit-protocol",
  "environmental-stress-index": "environmental-stress-index-esi",
  "environmental-stress-index-esi": "environmental-stress-index-esi",
  "esi": "environmental-stress-index-esi",
  "the-academy": "the-academy",
  "academy": "the-academy",
  "explorer-path": "explorer-path"
};

const ACADEMY_NAV_ITEMS = [
  { slug: "the-academy", title: "The Academy Overview", icon: Compass, badge: "Core Hub" },
  { slug: "certification", title: "Certification & Audit", icon: ShieldCheck, badge: "Mandatory" },
  { slug: "explorer-rank-system", title: "Explorer Rank System", icon: Award, badge: "Progression" },
  { slug: "summit-protocol", title: "Summit Protocol (Tier III)", icon: Zap, badge: "Apex Level" },
  { slug: "environmental-stress-index-esi", title: "Environmental Stress Index", icon: Layers, badge: "ESI Metric" },
  { slug: "code-of-conduct", title: "Code of Conduct & Neutrality", icon: Lock, badge: "Governance" },
  { slug: "explorer-path", title: "Explorer Path", icon: BookOpen, badge: "Trajectory" }
];

async function fetchWpPageBySlug(slug: string) {
  const wpSlug = ACADEMY_SLUG_MAP[slug] || slug;
  try {
    const res = await fetch(
      `https://janfranko.com/wp-json/wp/v2/pages?slug=${encodeURIComponent(wpSlug)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const pages = await res.json();
    if (!Array.isArray(pages) || pages.length === 0) return null;
    return pages[0];
  } catch (err) {
    console.error(`Failed to fetch WP page for slug: ${slug}`, err);
    return null;
  }
}

export async function generateStaticParams() {
  return [
    { slug: "the-academy" },
    { slug: "certification" },
    { slug: "explorer-rank-system" },
    { slug: "rank-system" },
    { slug: "code-of-conduct" },
    { slug: "summit-protocol" },
    { slug: "environmental-stress-index-esi" },
    { slug: "environmental-stress-index" },
    { slug: "esi" },
    { slug: "explorer-path" }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchWpPageBySlug(slug);
  
  if (!page) {
    return {
      title: "Academy Section | Traditional Archery Academy",
      description: "Explore the structured curriculum and governance of Jan Franko Traditional Archery Academy."
    };
  }

  const rawTitle = page.title?.rendered || "Academy Section";
  const cleanTitle = rawTitle.replace(/&#8211;/g, "–").replace(/&amp;/g, "&");
  const excerpt = page.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim().substring(0, 160) || 
    "Verified curriculum standards, certification audit frameworks, and environmental stress protocols.";

  return {
    title: `${cleanTitle} | Traditional Archery Academy`,
    description: excerpt,
    openGraph: {
      title: `${cleanTitle} | Traditional Archery Academy`,
      description: excerpt
    }
  };
}

export default async function AcademyPage({ params }: PageProps) {
  const { slug } = await params;
  const wpPage = await fetchWpPageBySlug(slug);

  if (!wpPage) {
    notFound();
  }

  const titleRaw = wpPage.title?.rendered || "Academy Section";
  const titleClean = titleRaw.replace(/&#8211;/g, "–").replace(/&amp;/g, "&");
  const activeWpSlug = ACADEMY_SLUG_MAP[slug] || slug;

  // Clean HTML string for safe inline rendering & relative URL normalization
  let htmlContent = wpPage.content?.rendered || "";
  htmlContent = htmlContent
    .replace(/https:\/\/janfranko\.com\/the-academy\//g, "/academy/")
    .replace(/https:\/\/janfranko\.com\/archery-games\//g, "/archery-games/")
    .replace(/https:\/\/janfranko\.com\//g, "/");

  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* 1. Header Banner */}
      <section className="relative border-b border-accent/20 bg-gradient-to-b from-[#0e3b2e] via-[#092b21] to-[#0e3b2e] py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.08),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-accent/80 font-semibold">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <Link href="/academy" className="hover:text-accent transition-colors">
              The Academy
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <span className="text-white font-bold">{titleClean}</span>
          </nav>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-bold tracking-widest uppercase text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              Curriculum &amp; System Governance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {titleClean}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Main Layout (Sidebar + Content Body) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sidebar: Academy Navigation */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#0b3126] border border-accent/20 rounded-3xl p-6 space-y-4 sticky top-28 shadow-xl">
            <div className="border-b border-accent/15 pb-3">
              <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <Compass className="w-4 h-4 text-accent" />
                Academy Curriculum
              </h3>
              <p className="text-[11px] text-[#f0e9d9]/70 font-sans mt-1">
                Explore verified progression tracks, field safety standards, and environmental indexes.
              </p>
            </div>

            <ul className="space-y-2 font-sans text-xs font-medium">
              {ACADEMY_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeWpSlug === item.slug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/academy/${item.slug}`}
                      className={`flex items-center justify-between p-3 rounded-2xl transition-all border ${
                        isActive
                          ? "bg-accent text-[#0e3b2e] border-accent font-bold shadow-md scale-[1.02]"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-accent/40 text-white/90"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#0e3b2e]" : "text-accent"}`} />
                        <span>{item.title}</span>
                      </div>
                      <span
                        className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-[#0e3b2e] text-accent font-bold"
                            : "bg-black/30 text-accent/80 border border-accent/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="pt-4 border-t border-accent/15 space-y-3">
              <Link
                href="/archery-games"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/40 text-white/90 text-xs font-medium transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-accent" />
                  <span>Archery Games &amp; Events</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-accent" />
              </Link>
              <Link
                href="/contact"
                className="w-full py-3 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Request Entry Verification</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Content Column: Rendered WordPress HTML */}
        <section className="lg:col-span-8 space-y-8">
          <div className="bg-[#0b3126]/80 border border-accent/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 backdrop-blur-md">
            {/* Formatted WordPress Content Container */}
            <article
              className="prose prose-invert prose-amber max-w-none 
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:border-b prose-h2:border-accent/20 prose-h2:pb-3 prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:sm:text-xl prose-h3:text-accent prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-sm prose-p:sm:text-base prose-p:text-[#f0e9d9]/85 prose-p:leading-relaxed prose-p:font-sans
                prose-ul:space-y-2 prose-ul:my-4 prose-li:text-sm prose-li:text-[#f0e9d9]/85 prose-li:font-sans
                prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-accent
                prose-strong:text-white prose-strong:font-bold
                prose-a:text-accent prose-a:underline hover:prose-a:text-white"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Bottom Action Footer */}
            <div className="pt-8 border-t border-accent/20 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent block">Governance Authority</span>
                <span className="text-xs font-serif font-bold text-white">Traditional Archery Academy — Jan Franko</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-xl font-serif text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Submit Qualification Request
                </Link>
                <Link
                  href="/programs"
                  className="px-5 py-2.5 border border-white/20 hover:border-accent text-white font-serif text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  View Expeditions &amp; Modules
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
