"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Compass, ArrowLeft, Calendar, User, ChevronRight } from "lucide-react";
import { articles, categories, regions } from "@/data/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: PageProps) {
  const { slug } = use(params);
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Get related scrolls: same region, excluding current article
  const relatedScrolls = articles
    .filter((a) => a.regionId === article.regionId && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative">
      <title>{`${article.title} | Archery Chronicles - Jan Franko`}</title>
      <meta name="description" content={article.subtitle || `Read historic traditional archery insights from Jan Franko's scrolls.`} />
      <meta property="og:title" content={`${article.title} | Archery Chronicles - Jan Franko`} />
      <meta property="og:description" content={article.subtitle || `Read historic traditional archery insights from Jan Franko's scrolls.`} />
      <meta property="og:image" content={article.image} />
      
      {/* HTML Inject Styles for Rich-Text content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .article-content p {
          margin-bottom: 1.5rem;
          color: rgba(15, 23, 42, 0.85);
          line-height: 1.8;
          font-size: 1rem;
        }
        .article-content h4 {
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #0e3b2e;
          margin-top: 2.25rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .article-content blockquote {
          border-left: 3px solid #c5a880;
          padding-left: 1.5rem;
          font-style: italic;
          font-family: ui-serif, Georgia, Cambria, serif;
          color: #7d603a;
          margin: 2rem 0;
          font-size: 1.15rem;
          line-height: 1.6;
        }
        .article-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          space-y: 0.5rem;
        }
        .article-content li {
          margin-bottom: 0.5rem;
          color: rgba(15, 23, 42, 0.85);
          line-height: 1.7;
        }
      ` }} />

      {/* 1. Cinematic Header Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[350px] bg-primary flex items-end">
        
        {/* Background Cover Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#0e3b2e]/30 z-10" />
        </div>

        {/* Floating Back Anchor */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/scrolls"
            className="flex items-center gap-1.5 px-4 py-2 bg-secondary/80 backdrop-blur-md border border-[#c5a880]/30 hover:border-accent rounded-full text-xs font-serif font-bold text-[#7d603a] hover:text-[#0e3b2e] shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Scrolls
          </Link>
        </div>

        {/* Article Meta Header details */}
        <div className="relative z-20 max-w-6xl mx-auto w-full px-6 pb-8 md:pb-12 space-y-4">
          <div className="flex flex-wrap gap-2">
            {article.categories?.map((catId) => (
              <span key={catId} className="px-3 py-1 bg-[#c5a880]/20 border border-[#c5a880]/40 rounded-full text-[9px] font-serif font-bold uppercase tracking-widest text-[#7d603a]">
                {categories.find(c => c.id === catId)?.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm md:text-base text-primary/80 font-serif italic max-w-3xl">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-primary/70 border-t border-primary/10 pt-4 font-sans">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-[#7d603a]" />
              By {article.author}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#7d603a]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#7d603a]" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Compass className="w-4 h-4 text-[#7d603a]" />
              {regions.find(r => r.id === article.regionId)?.title || article.regionId}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Reading Column */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Area */}
        <article className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-primary/5 rounded-3xl p-6 md:p-10 shadow-sm">
            <div
              className="article-content font-sans text-sm md:text-base leading-relaxed text-primary/90"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* Sidebar widgets */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* About region card */}
          {article.regionId && (
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-serif font-bold border-b border-primary/5 pb-2">
                About the Region
              </h4>
              <h5 className="text-sm font-serif font-bold text-primary">
                {regions.find(r => r.id === article.regionId)?.title}
              </h5>
              <p className="text-xs text-primary/75 leading-relaxed font-sans">
                {regions.find(r => r.id === article.regionId)?.description}
              </p>
              <Link
                href={`/scrolls/region/${article.regionId}`}
                className="inline-flex items-center gap-0.5 text-[10px] font-serif font-bold uppercase tracking-wider text-[#7d603a] hover:text-[#0e3b2e] transition-colors"
              >
                View Region Scrolls <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Related Scrolls column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-serif font-bold border-b border-primary/5 pb-2">
              Related Scrolls
            </h4>
            {relatedScrolls.length === 0 ? (
              <p className="text-xs text-primary/50 italic font-sans">No other scrolls in this region yet.</p>
            ) : (
              <div className="space-y-4">
                {relatedScrolls.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/scrolls/${rel.slug}`}
                    className="block group bg-white border border-primary/5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-28 w-full bg-primary/10">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h5 className="text-xs font-serif font-bold text-primary group-hover:text-[#7d603a] transition-colors duration-300 line-clamp-2">
                        {rel.title}
                      </h5>
                      <span className="text-[9px] text-[#7d603a] font-sans block">
                        {rel.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </aside>

      </div>
    </div>
  );
}
