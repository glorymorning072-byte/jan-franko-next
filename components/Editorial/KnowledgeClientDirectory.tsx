"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Compass,
  ArrowRight,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { EditorialItem } from "@/types/editorial";

// Static fallback for instant layout rendering if server returned empty
const FALLBACK_BASE_VOLUMES: EditorialItem[] = [
  {
    id: 6149,
    slug: "east-archery",
    parent: 0,
    link: "https://janfranko.com/editorial/east-archery/",
    title: { rendered: "Eastern Archery Lineages" },
    content: { rendered: "" },
    acf: {
      card_title: "Eastern Archery Lineages",
      card_description: "Comprehensive immersion into the meditative and martial archery traditions of Asia.",
      card_bullet_1: "Holistic Mind-Body Synergy",
      card_bullet_2: "Reflex Bow Architecture",
      card_bullet_3: "145m Benchmark Discipline",
      card_button_text: "Explore Tradition",
      hero: {
        heading: "Eastern Archery: The Soul of the East",
        eyebrow: "Heritage & Discipline",
        image_external_url: "https://images.pexels.com/photos/36919857/pexels-photo-36919857.jpeg"
      }
    }
  },
  {
    id: 6154,
    slug: "composite-archery",
    parent: 0,
    link: "https://janfranko.com/editorial/composite-archery/",
    title: { rendered: "Composite Archery" },
    content: { rendered: "" },
    acf: {
      card_title: "Composite Archery",
      card_description: "Discover the unmatched power of traditional composite bows. Born on the Eurasian steppe and refined over millennia, these weapons combine wood, horn, and sinew to achieve devastating efficiency and speed.",
      card_bullet_1: "Energy Storage Dynamics",
      card_bullet_2: "Asiatic Thumb Release",
      card_bullet_3: "Horn & Sinew Construction",
      card_button_text: "Explore Lineage",
      hero: {
        heading: "The Pinnacle of Organic Ballistics",
        eyebrow: "ANCIENT ENGINEERING",
        image_external_url: "https://images.pexels.com/photos/11807514/pexels-photo-11807514.jpeg"
      }
    }
  },
  {
    id: 6220,
    slug: "yukon-expedition",
    parent: 0,
    link: "https://janfranko.com/editorial/yukon-expedition/",
    title: { rendered: "Yukon Expedition: The Sub-Arctic Corridor" },
    content: { rendered: "" },
    acf: {
      card_title: "Yukon Expedition: The Sub-Arctic Corridor",
      card_description: "A rigorous, high-fidelity deployment designed to test the limits of human biological resilience and historical bowmanship within sub-zero corridors.",
      card_bullet_1: "Sub-Zero Material Stability",
      card_bullet_2: "Extreme Cold Biomechanics",
      card_bullet_3: "Wilderness Survival Isolation",
      card_button_text: "Explore Volume",
      hero: {
        heading: "Yukon Expedition: Sub-Arctic Mastery",
        eyebrow: "WINTER VANGUARD",
        image_external_url: "https://images.pexels.com/photos/11546809/pexels-photo-11546809.jpeg"
      }
    }
  }
];

interface KnowledgeClientDirectoryProps {
  initialEditorials: EditorialItem[];
}

export default function KnowledgeClientDirectory({ initialEditorials }: KnowledgeClientDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const allEditorials = initialEditorials.length > 0 ? initialEditorials : FALLBACK_BASE_VOLUMES;
  const baseVolumes = useMemo(() => {
    const parents = allEditorials.filter((item) => item.parent === 0);
    return parents.length > 0 ? parents : FALLBACK_BASE_VOLUMES;
  }, [allEditorials]);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || searchQuery || baseVolumes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % baseVolumes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, searchQuery, baseVolumes.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % baseVolumes.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + baseVolumes.length) % baseVolumes.length);

  const activeVolume = baseVolumes[currentSlide] || baseVolumes[0];

  // Filter base volumes by search query
  const filteredVolumes = useMemo(() => {
    if (!searchQuery.trim()) return baseVolumes;
    const q = searchQuery.toLowerCase();
    return baseVolumes.filter((volume) => {
      const title = volume.title?.rendered?.toLowerCase() || "";
      const cardTitle = volume.acf?.card_title?.toLowerCase() || "";
      const cardDesc = volume.acf?.card_description?.toLowerCase() || "";
      const eyebrow = volume.acf?.hero?.eyebrow?.toLowerCase() || "";
      return title.includes(q) || cardTitle.includes(q) || cardDesc.includes(q) || eyebrow.includes(q);
    });
  }, [baseVolumes, searchQuery]);

  const bullets = [
    activeVolume?.acf?.card_bullet_1,
    activeVolume?.acf?.card_bullet_2,
    activeVolume?.acf?.card_bullet_3
  ].filter(Boolean) as string[];

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative">
      {/* 1. Hero Header Section */}
      <div className="relative w-full bg-[#0e3b2e] text-white py-20 md:py-28 px-6 overflow-hidden flex flex-col items-center justify-center border-b border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(14,59,46,0.5))] z-0" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-4 py-1.5 bg-[#c5a880]/10 border border-[#c5a880]/30 rounded-full text-[10px] md:text-xs font-serif font-semibold tracking-widest uppercase text-accent">
            Academy Knowledge Archive
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Knowledge &amp; Field Lineages
          </h1>
          <p className="text-sm md:text-base text-white/80 font-normal max-w-2xl mx-auto leading-relaxed font-sans">
            Authoritative field volumes, biomechanical orientation guides, and historical martial lineages preserving the global tradition of the bow.
          </p>
          <div className="pt-2 flex justify-center">
            <div className="w-12 h-[1px] bg-[#c5a880]/30" />
          </div>
        </div>
      </div>

      {/* 2. Main Directory Container */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-20">
        
        {/* Interactive Base Volumes Carousel (Without Pill Badge) */}
        {activeVolume && !searchQuery && (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="bg-[#0e3b2e] rounded-3xl overflow-hidden shadow-2xl border border-accent/20 text-white relative transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Image Banner */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px] bg-black/40 overflow-hidden group">
                <Image
                  key={activeVolume.id}
                  src={activeVolume.acf?.hero?.image_external_url || "https://images.pexels.com/photos/36919857/pexels-photo-36919857.jpeg"}
                  alt={activeVolume.acf?.card_title || activeVolume.title.rendered}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e3b2e] via-transparent to-transparent lg:hidden" />
              </div>

              {/* Text Body Details */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
                    {activeVolume.acf?.hero?.eyebrow || "Heritage & Discipline"}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                    {activeVolume.acf?.card_title || activeVolume.title.rendered}
                  </h2>
                  {activeVolume.acf?.card_description && (
                    <div
                      className="text-xs md:text-sm text-white/80 font-sans leading-relaxed space-y-2 [&_p]:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: activeVolume.acf.card_description }}
                    />
                  )}

                  {/* 3 Bullets */}
                  {bullets.length > 0 && (
                    <ul className="space-y-2 pt-2">
                      {bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs font-sans text-white/90">
                          <span className="w-1.5 h-1.5 rotate-45 bg-accent shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer Controls & CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/knowledge/${activeVolume.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-full font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                  >
                    <span>Explore Volume</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-white/60 tracking-wider">
                      0{currentSlide + 1} / {baseVolumes.length < 10 ? `0${baseVolumes.length}` : baseVolumes.length}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={prevSlide}
                        aria-label="Previous Lineage Volume"
                        className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-accent hover:text-[#0e3b2e] hover:border-accent text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Next Lineage Volume"
                        className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-accent hover:text-[#0e3b2e] hover:border-accent text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Base Knowledge Volumes Section Header & Search */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
                Primary Volumes
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                Academy Knowledge Lineages ({filteredVolumes.length})
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative flex items-center w-full md:w-80">
              <Search className="w-3.5 h-3.5 text-primary/40 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search volumes by topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-primary border border-primary/20 hover:border-primary/45 rounded-full pl-9 pr-8 py-2 text-xs outline-none focus:border-accent font-sans transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-primary/40 hover:text-primary transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Base Volumes Grid */}
          {filteredVolumes.length === 0 ? (
            <div className="text-center py-20 bg-white border border-primary/5 rounded-3xl text-primary/60 font-sans shadow-sm">
              No knowledge lineages matched your search query.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVolumes.map((volume) => {
                const childCount = allEditorials.filter((e) => e.parent === volume.id).length;
                const title = volume.acf?.card_title || volume.title.rendered;
                const desc = volume.acf?.card_description || volume.acf?.hero?.description?.replace(/<[^>]*>/g, "");
                const heroImg = volume.acf?.hero?.image_external_url || "https://images.pexels.com/photos/12177906/pexels-photo-12177906.jpeg";
                const bullets = [
                  volume.acf?.card_bullet_1,
                  volume.acf?.card_bullet_2,
                  volume.acf?.card_bullet_3
                ].filter(Boolean);

                return (
                  <Link
                    key={volume.id}
                    href={`/knowledge/${volume.slug}`}
                    className="group bg-white border border-primary/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-accent/50 transition-all duration-500 flex flex-col justify-between h-[480px] cursor-pointer"
                  >
                    {/* Image Banner */}
                    <div className="relative w-full h-[200px] bg-primary/10 overflow-hidden">
                      <Image
                        src={heroImg}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                      {childCount > 0 && (
                        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-primary/10 rounded-full text-[9px] font-sans font-bold text-[#0e3b2e] uppercase tracking-wider shadow-sm">
                          {childCount} Chapters
                        </div>
                      )}
                    </div>

                    {/* Card Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
                          {volume.acf?.hero?.eyebrow || "Archery Volume"}
                        </span>
                        <h3 className="text-xl font-serif font-bold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                          {title}
                        </h3>
                        {desc && (
                          <div
                            className="text-xs text-primary/75 font-sans leading-relaxed line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: desc }}
                          />
                        )}

                        {/* Unordered Key Bullets List */}
                        {bullets.length > 0 && (
                          <ul className="space-y-1.5 pt-1.5">
                            {bullets.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-center gap-2 text-[11px] font-sans font-medium text-[#7d603a]">
                                <span className="w-1.5 h-1.5 rotate-45 bg-accent shrink-0" />
                                <span className="line-clamp-1">{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Bottom Link Action */}
                      <div className="border-t border-primary/5 pt-3.5 flex items-center justify-between text-[11px] font-serif uppercase tracking-widest font-bold text-accent group-hover:translate-x-1 transition-transform">
                        <span>{volume.acf?.card_button_text || "Explore Volume"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Academy Field Methodology & Research Pillars Section */}
        <div className="pt-10 border-t border-primary/10 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
              Academy Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Core Pillars of the Knowledge Archive
            </h2>
            <p className="text-xs md:text-sm text-primary/75 font-sans leading-relaxed">
              Every monograph and field volume in our archive is grounded in rigorous historical study, living craft traditions, and empirical wilderness trials.
            </p>
            <div className="w-12 h-[1px] bg-accent/40 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-primary/10 rounded-3xl p-8 shadow-sm space-y-4 hover:border-accent/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0e3b2e] flex items-center justify-center text-accent">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-primary">
                Structural Biomechanics &amp; TCM
              </h3>
              <p className="text-xs text-primary/75 font-sans leading-relaxed">
                Integrating 20+ years of Traditional Chinese Medicine, skeletal alignment, and breath regulation into the physical execution of heavy draw weights without joint degeneration.
              </p>
            </div>

            <div className="bg-white border border-primary/10 rounded-3xl p-8 shadow-sm space-y-4 hover:border-accent/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0e3b2e] flex items-center justify-center text-accent">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-primary">
                Living Artisan Craftsmanship
              </h3>
              <p className="text-xs text-primary/75 font-sans leading-relaxed">
                Direct partnerships with master bowyers across Austria, Turkey, and Central Asia to document the harvesting, seasoning, and dynamic mechanics of organic composite bows.
              </p>
            </div>

            <div className="bg-white border border-primary/10 rounded-3xl p-8 shadow-sm space-y-4 hover:border-accent/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0e3b2e] flex items-center justify-center text-accent">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-primary">
                High-Latitude Field Verification
              </h3>
              <p className="text-xs text-primary/75 font-sans leading-relaxed">
                Subjecting ancient techniques to raw environmental reality: sub-zero sub-arctic corridors, Patagonian gales, and high-altitude Himalayan mountain passes.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Bottom Expedition Call to Action Box */}
        <div className="bg-[#0e3b2e] rounded-3xl p-8 md:p-14 text-white text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-serif uppercase tracking-[0.2em] text-accent font-bold block">
              From Lore to Field Mastery
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Experience the Lineages in the Field
            </h3>
            <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed">
              Our knowledge monographs provide the theoretical foundation. Join our master instructors in live wilderness expeditions and intensive technical training camps.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/programs"
              className="px-6 py-3 rounded-full font-serif text-xs uppercase tracking-widest font-bold bg-accent hover:bg-accent/90 text-[#0e3b2e] transition-all duration-300 hover:scale-105 shadow-md"
            >
              Explore Training Programs
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full font-serif text-xs uppercase tracking-widest font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-300"
            >
              Consult with Master Instructor
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
