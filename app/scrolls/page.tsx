"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Search, Clock, BookOpen, Compass, Tag, ChevronRight, X } from "lucide-react";
import { articles, categories, regions, Article } from "@/data/articles";

const ScrollsContent = () => {
  const searchParams = useSearchParams();
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Sync URL search parameters on mount (e.g., redirect from mega menu)
  useEffect(() => {
    const regionParam = searchParams.get("region");
    const categoryParam = searchParams.get("category");

    if (regionParam) setSelectedRegion(regionParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParams]);

  // GSAP Stagger Entrance Animation for Article Cards
  useEffect(() => {
    gsap.fromTo(
      ".scroll-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        overwrite: "auto"
      }
    );
  }, [searchQuery, selectedRegion, selectedCategory]);

  // Filtering Logic
  const getFilteredArticles = () => {
    return articles.filter((article) => {
      // 1. Region Filter
      if (selectedRegion && article.regionId !== selectedRegion) {
        return false;
      }
      
      // 2. Category Filter
      if (selectedCategory && !article.categories?.includes(selectedCategory)) {
        return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesSubtitle = article.subtitle.toLowerCase().includes(query);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(query);
        const regionTitle = regions.find((r) => r.id === article.regionId)?.title || "";
        const matchesRegionName = regionTitle.toLowerCase().includes(query);
        const matchesTags = article.tags?.some((t) => t.toLowerCase().includes(query));
        
        return matchesTitle || matchesSubtitle || matchesExcerpt || matchesRegionName || matchesTags;
      }

      return true;
    });
  };

  const filteredArticles = getFilteredArticles();
  
  // Determine if we should show the Featured Article banner
  // Only show when there are no active filters/search queries
  const isFiltersActive = searchQuery !== "" || selectedRegion !== "" || selectedCategory !== "";
  const featuredArticle = !isFiltersActive ? articles.find((a) => a.featured) : null;
  
  // Exclude the featured article from the grid list if it is displayed in the featured spot
  const gridArticles = featuredArticle 
    ? filteredArticles.filter((a) => a.slug !== featuredArticle.slug)
    : filteredArticles;

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative">
      
      {/* 1. Hero Section */}
      <div className="relative w-full bg-[#0e3b2e] text-white py-16 md:py-24 px-6 overflow-hidden flex flex-col items-center justify-center border-b border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(14,59,46,0.5))] z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-4 py-1.5 bg-[#c5a880]/10 border border-[#c5a880]/30 rounded-full text-[10px] md:text-xs font-serif font-semibold tracking-widest uppercase text-accent">
            Academy Scrolls
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Knowledge &amp; Archery Lore
          </h1>
          <p className="text-sm md:text-base text-white/80 font-normal max-w-2xl mx-auto leading-relaxed">
            Unrolling the historical records, structural bowyer geometry, and physical disciplines of traditional archery across nomadic cultures.
          </p>
          <div className="pt-2 flex justify-center">
            <div className="w-12 h-[1px] bg-[#c5a880]/30" />
          </div>
        </div>
      </div>

      {/* 2. Main Container */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-8">
        
        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-6 border-b border-primary/10 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Live Search Input */}
            <div className="relative flex items-center w-full md:w-80">
              <span className="absolute left-3.5 pointer-events-none">
                <Search className="w-3.5 h-3.5 text-primary/40" />
              </span>
              <input
                type="text"
                placeholder="Search scrolls by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-primary border border-primary/20 hover:border-primary/45 rounded-full pl-9 pr-8 py-2.5 text-xs outline-none focus:border-accent font-sans transition-all duration-300 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-1 text-primary/40 hover:text-primary transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#7d603a] font-bold mr-2">
                Categories:
              </span>
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === ""
                    ? "bg-primary text-secondary"
                    : "bg-white border border-primary/10 text-primary/80 hover:border-primary/30"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-primary text-secondary"
                      : "bg-white border border-primary/10 text-primary/80 hover:border-primary/30"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-t border-primary/5 pt-4">
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#7d603a] font-bold mr-2">
              Regions:
            </span>
            <button
              onClick={() => setSelectedRegion("")}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                selectedRegion === ""
                  ? "bg-[#c5a880]/20 border border-accent text-[#7d603a]"
                  : "bg-white/40 border border-primary/10 text-primary/80 hover:border-primary/30"
              }`}
            >
              All Regions
            </button>
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                  selectedRegion === reg.id
                    ? "bg-[#c5a880]/25 border border-accent text-[#7d603a] font-semibold"
                    : "bg-white/40 border border-primary/10 text-primary/80 hover:border-primary/30"
                }`}
              >
                {reg.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Row */}
        {isFiltersActive && (
          <div className="flex flex-wrap items-center gap-2 animate-in fade-in duration-300">
            <span className="text-[10px] uppercase tracking-wider text-[#7d603a] font-serif font-bold mr-1">
              Active Filters:
            </span>
            {searchQuery && (
              <span className="flex items-center gap-1.5 bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#7d603a] px-3 py-1 rounded-full text-xs font-sans font-medium">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:text-primary shrink-0 transition-colors cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="flex items-center gap-1.5 bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#7d603a] px-3 py-1 rounded-full text-xs font-sans font-medium">
                Category: {categories.find(c => c.id === selectedCategory)?.title || selectedCategory}
                <button onClick={() => setSelectedCategory("")} className="hover:text-primary shrink-0 transition-colors cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedRegion && (
              <span className="flex items-center gap-1.5 bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#7d603a] px-3 py-1 rounded-full text-xs font-sans font-medium">
                Region: {regions.find(r => r.id === selectedRegion)?.title || selectedRegion}
                <button onClick={() => setSelectedRegion("")} className="hover:text-primary shrink-0 transition-colors cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("");
                setSelectedCategory("");
              }}
              className="text-[#7d603a] hover:text-[#0e3b2e] text-xs font-serif font-bold underline ml-2 cursor-pointer transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* 3. Featured Article Banner */}
        {featuredArticle && (
          <Link
            href={`/scrolls/${featuredArticle.slug}`}
            className="block group bg-white border border-primary/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] lg:col-span-7 bg-primary/10 overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 bg-[#0e3b2e] border border-accent/30 rounded-full text-[10px] font-serif font-bold text-white shadow-sm uppercase tracking-widest">
                  Featured Scroll
                </div>
              </div>
              <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.categories?.map((catId) => (
                      <span key={catId} className="text-[10px] text-[#7d603a] font-bold tracking-widest uppercase font-serif">
                        {categories.find(c => c.id === catId)?.title}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary leading-tight group-hover:text-[#7d603a] transition-colors duration-300">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-sm text-primary/85 leading-relaxed font-sans">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div className="border-t border-primary/5 pt-6 flex items-center justify-between text-xs text-[#7d603a] font-medium font-sans">
                  <span className="flex items-center gap-1">
                    <Compass className="w-4 h-4" />
                    {regions.find((r) => r.id === featuredArticle.regionId)?.title || featuredArticle.regionId}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 4. Article Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-24 bg-white border border-primary/5 rounded-3xl text-primary/60 font-sans">
            No scrolls matched your current filters. Try searching other keywords.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/scrolls/${article.slug}`}
                className="scroll-card group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 flex flex-col h-[380px] cursor-pointer"
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
};

const ScrollsPage = () => {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-secondary flex items-center justify-center p-12 text-[#7d603a] font-serif uppercase tracking-widest text-xs">
        Unrolling scrolls archive...
      </div>
    }>
      <ScrollsContent />
    </Suspense>
  );
};

export default ScrollsPage;
