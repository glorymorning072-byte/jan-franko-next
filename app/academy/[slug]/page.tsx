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

  // Clean HTML string & replace WordPress image uploads with local downloaded assets in /images/wp-assets/
  let htmlContent = wpPage.content?.rendered || "";
  htmlContent = htmlContent
    .replace(/https:\/\/janfranko\.com\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\//gi, "/images/wp-assets/")
    .replace(/\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\//gi, "/images/wp-assets/")
    .replace(/https:\/\/janfranko\.com\/the-academy\//g, "/academy/")
    .replace(/https:\/\/janfranko\.com\/archery-games\//g, "/archery-games/")
    .replace(/https:\/\/janfranko\.com\//g, "/");

  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* Header Banner */}
      <section className="relative border-b border-accent/20 bg-gradient-to-b from-[#0e3b2e] via-[#092b21] to-[#0e3b2e] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 space-y-4">
          
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
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              Curriculum Standard
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {titleClean}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Layout Container (Clean, uncluttered, no sidebars) */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-[#0b3126]/80 border border-accent/20 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8 backdrop-blur-md">
          {/* Formatted WordPress Content */}
          <article
            className="prose prose-invert prose-amber max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:border-b prose-h2:border-accent/20 prose-h2:pb-3 prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-lg prose-h3:sm:text-xl prose-h3:text-accent prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-sm prose-p:sm:text-base prose-p:text-[#f0e9d9]/85 prose-p:leading-relaxed prose-p:font-sans
              prose-ul:space-y-2 prose-ul:my-4 prose-li:text-sm prose-li:text-[#f0e9d9]/85 prose-li:font-sans
              prose-img:rounded-2xl prose-img:border prose-img:border-accent/20 prose-img:shadow-xl prose-img:mx-auto prose-img:my-6
              prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-accent
              prose-strong:text-white prose-strong:font-bold
              prose-a:text-accent prose-a:underline hover:prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Action Footer */}
          <div className="pt-8 border-t border-accent/20 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent block">Governance Standard</span>
              <span className="text-xs font-serif font-bold text-white">Traditional Archery Academy — Jan Franko</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-xl font-serif text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                Inquire Application
              </Link>
              <Link
                href="/academy"
                className="px-6 py-3 border border-white/20 hover:border-accent text-white font-serif text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Back to Academy Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
