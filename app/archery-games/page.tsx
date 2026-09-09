import React from "react";
import Link from "next/link";
import { Award, Compass, Sparkles, CheckCircle2, ArrowRight, Calendar, MapPin, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archery Games | Historical Gatherings & Precision Events",
  description:
    "Heritage, precision, and the open sky: explore Archery Games historical gatherings, participation standards, and competition rules with Jan Franko Traditional Archery Academy.",
  openGraph: {
    title: "Archery Games | Historical Gatherings & Precision Events",
    description: "Heritage archery gatherings testing skill, posture, and accuracy under natural open skies."
  }
};

export default async function ArcheryGamesPage() {
  let wpPageContent = "";
  try {
    const res = await fetch("https://janfranko.com/wp-json/wp/v2/pages?slug=archery-games", {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        wpPageContent = data[0].content?.rendered || "";
      }
    }
  } catch (err) {
    console.error("Failed to fetch Archery Games WP page:", err);
  }

  // Clean HTML relative links
  wpPageContent = wpPageContent
    .replace(/https:\/\/janfranko\.com\/the-academy\//g, "/academy/")
    .replace(/https:\/\/janfranko\.com\/archery-games\//g, "/archery-games/")
    .replace(/https:\/\/janfranko\.com\//g, "/");

  return (
    <main className="min-h-screen bg-[#0e3b2e] text-[#f0e9d9] pt-24 pb-20 select-text">
      {/* Hero Banner */}
      <section className="relative border-b border-accent/20 bg-gradient-to-b from-[#0e3b2e] via-[#092b21] to-[#0e3b2e] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent/15 border border-accent/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
            <Award className="w-4 h-4" />
            Historical Gatherings &amp; Precision Competitions
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Archery Games
          </h1>
          <p className="text-base sm:text-lg text-[#f0e9d9]/85 font-sans leading-relaxed max-w-3xl mx-auto font-light">
            Heritage, precision, and the open sky. The Games are a series of historical archery gatherings designed to test instinctive bowmanship in natural environments.
          </p>
        </div>
      </section>

      {/* Main Content & Rendered WP Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Historical Authenticity</h3>
            <p className="text-xs sm:text-sm text-[#f0e9d9]/75 font-sans leading-relaxed">
              Target geometries and rules rooted in traditional European and Eurasian nomadic traditions.
            </p>
          </div>

          <div className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Natural Terrain</h3>
            <p className="text-xs sm:text-sm text-[#f0e9d9]/75 font-sans leading-relaxed">
              No artificial indoor lanes. Events take place across dynamic alpine slopes, forest glades, and grassland fields.
            </p>
          </div>

          <div className="bg-[#0b3126] border border-accent/20 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Lineage Verification</h3>
            <p className="text-xs sm:text-sm text-[#f0e9d9]/75 font-sans leading-relaxed">
              Earn recognized scores across distance flight, speed release, and terrain target modules.
            </p>
          </div>
        </div>

        {/* Rendered WordPress HTML */}
        {wpPageContent && (
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
        )}

        {/* Navigation CTAs */}
        <div className="pt-8 border-t border-accent/20 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-serif font-bold text-white">Join the Lineage</h4>
            <p className="text-xs text-[#f0e9d9]/70 font-sans">
              Register for upcoming events or inquire about participation requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Inquire Event Entry
            </Link>
            <Link
              href="/academy"
              className="px-6 py-3 border border-white/20 hover:border-accent text-white font-serif text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Back to The Academy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
