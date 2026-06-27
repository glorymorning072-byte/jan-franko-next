"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Compass, ChevronRight, ArrowLeft } from "lucide-react";
import { articles, categories, regions } from "@/data/articles";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryFeedPage({ params }: PageProps) {
  const { id } = use(params);
  const category = categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  // Filter scrolls tagged with this category ID
  const filteredArticles = articles.filter((article) =>
    article.categories?.includes(id)
  );

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative">
      
      {/* 1. Hero Header */}
      <div className="relative w-full bg-[#0e3b2e] text-white py-16 md:py-20 px-6 overflow-hidden flex flex-col items-center justify-center border-b border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(14,59,46,0.5))] z-0" />
        
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

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 pt-6">
          <span className="inline-block px-4 py-1.5 bg-[#c5a880]/10 border border-[#c5a880]/30 rounded-full text-[10px] md:text-xs font-serif font-semibold tracking-widest uppercase text-accent">
            Topic Category
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            {category.title}
          </h1>
          <p className="text-xs md:text-sm text-white/80 font-normal max-w-2xl mx-auto leading-relaxed font-sans">
            {category.description}
          </p>
          <div className="pt-2 flex justify-center">
            <div className="w-12 h-[1px] bg-[#c5a880]/30" />
          </div>
        </div>
      </div>

      {/* 2. Feeds Container */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-8">
        
        <div className="flex items-center justify-between border-b border-primary/5 pb-4">
          <h2 className="text-sm uppercase tracking-widest font-serif font-bold text-[#7d603a]">
            Matching Scrolls ({filteredArticles.length})
          </h2>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-primary/5 rounded-3xl text-primary/60 font-sans">
            No scrolls matched this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/scrolls/${article.slug}`}
                className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 flex flex-col h-[380px] cursor-pointer"
              >
                {/* Image Banner */}
                <div className="relative w-full h-[180px] bg-primary/10 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-secondary/95 border border-primary/15 rounded-full text-[9px] font-sans font-bold text-primary uppercase tracking-wider">
                    {article.readTime}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {article.categories?.map((catId) => (
                        <span key={catId} className="text-[9px] text-[#7d603a] font-bold tracking-widest uppercase font-serif">
                          {categories.find(c => c.id === catId)?.title}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary leading-snug group-hover:text-[#7d603a] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-primary/80 line-clamp-2 font-sans leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-primary/5 pt-4 flex items-center justify-between text-[11px] text-[#7d603a] font-sans">
                    <span className="flex items-center gap-1 font-medium">
                      <Compass className="w-3.5 h-3.5" />
                      {regions.find(r => r.id === article.regionId)?.title || article.regionId}
                    </span>
                    <span className="flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-serif font-bold uppercase tracking-wider text-[9px]">
                      Read Scroll <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
