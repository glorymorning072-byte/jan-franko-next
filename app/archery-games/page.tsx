import React from "react";
import Link from "next/link";
import { Award, Compass, Sparkles, CheckCircle2, ArrowRight, Calendar, MapPin, Shield, Target } from "lucide-react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Archery Games | Gatherings & Competitions",
  description: "Heritage archery gatherings testing skill, posture, and accuracy under natural open skies with Jan Franko Academy.",
});

const GAME_CATEGORIES = [
  {
    title: "1. Distance Flight Archery",
    badge: "Flight Discipline",
    desc: "Testing maximum parabolic arrow flight distance using traditional composite reflex bows and lightweight flight arrows.",
    rules: "Archers release at a 45° elevation angle across open steppe or mountain pasture fields. Only un-assisted natural wooden or composite bows without mechanical releases are permitted."
  },
  {
    title: "2. Speed Release Discipline",
    badge: "Timed Precision",
    desc: "Testing arrow reload rhythm and fluid drawing mechanics under strict time constraints (e.g. 5 arrows in 15 seconds).",
    rules: "Arrows are held in the draw hand or quiver using traditional thumb-ring or Mediterranean loading methods. Focus is maintained on smooth nocking without breaking eye target contact."
  },
  {
    title: "3. Dynamic Slope Target Course",
    badge: "Terrain Course",
    desc: "A field target course laid out across steep alpine slopes, woodland gullies, and timber glades.",
    rules: "Target distances range from 15m to 70m with unknown distances and variable slope angles (+30°/-30°). Archers must adjust posture from the waist while maintaining footing."
  },
  {
    title: "4. Moving Target Tracking",
    badge: "Dynamic Tracking",
    desc: "Tracking moving pendulum targets or rolling ground discs to simulate historical mounted hunting and tactical reflex shooting.",
    rules: "Releasing on moving target targets requires precise lead timing, smooth drawing arm extension, and instinctive release rhythm."
  }
];

const BOW_CLASSES = [
  {
    name: "Composite Reflex Class",
    desc: "Natural horn, sinew, and wood composite bows (Mongolian, Turkic, Ottoman, Korean, Hungarian) drawn with thumb rings or finger tabs."
  },
  {
    name: "Historical Self-Bow & Longbow Class",
    desc: "English Yew Longbows, European Flatbows, and single-wood self-bows drawn with classical Mediterranean three-finger draw."
  },
  {
    name: "Mounted Archery Class",
    desc: "Short composite reflex bows optimized for horseback archery and rapid quiver drawing."
  }
];

export default function ArcheryGamesPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-24 pb-20 select-text font-sans">
      {/* 1. Dark Hero Banner */}
      <section className="relative border-b border-primary/10 bg-[#0e3b2e] text-white py-16 md:py-24 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#c5a880]/15 border border-[#c5a880]/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
            <Award className="w-4 h-4 text-accent" />
            Historical Gatherings &amp; Precision Competitions
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Archery Games
          </h1>
          <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-3xl mx-auto font-light">
            Heritage, precision, and the open sky. The Games are a series of historical archery gatherings designed to test instinctive bowmanship in natural field environments.
          </p>
        </div>
      </section>

      {/* 2. Core Pillars of the Games */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#0e3b2e] flex items-center justify-center text-accent">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary">Historical Authenticity</h3>
            <p className="text-xs sm:text-sm text-primary/75 font-sans leading-relaxed">
              Target geometries, scoring systems, and rules rooted in traditional European and Eurasian nomadic traditions.
            </p>
          </div>

          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#0e3b2e] flex items-center justify-center text-accent">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary">Natural Open Sky</h3>
            <p className="text-xs sm:text-sm text-primary/75 font-sans leading-relaxed">
              No artificial indoor lanes. Events take place across dynamic alpine slopes, forest glades, and grassland pasture fields.
            </p>
          </div>

          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#0e3b2e] flex items-center justify-center text-accent">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary">Lineage Recognition</h3>
            <p className="text-xs sm:text-sm text-primary/75 font-sans leading-relaxed">
              Earn recognized scores across distance flight, speed release, and dynamic slope target modules logged in the academy registry.
            </p>
          </div>
        </div>

        {/* 3. Event Discipline Categories */}
        <div className="space-y-10 pt-8 border-t border-primary/10">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
              Event Disciplines
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
              Gathering Competition Categories
            </h2>
            <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GAME_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm hover:border-accent/40 transition-all"
              >
                <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                    {cat.badge}
                  </span>
                  <Target className="w-5 h-5 text-[#7d603a]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">{cat.title}</h3>
                <p className="text-sm text-primary/85 font-sans leading-relaxed">{cat.desc}</p>
                <div className="bg-secondary p-4 rounded-2xl border border-primary/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#7d603a] font-bold block">Rules &amp; Standards:</span>
                  <p className="text-xs text-primary/80 font-sans leading-relaxed">{cat.rules}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Bow Classes */}
        <div className="space-y-8 pt-8 border-t border-primary/10">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
              Equipment Categories
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-tight">
              Recognized Bow Classes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOW_CLASSES.map((bClass, idx) => (
              <div key={idx} className="bg-white border border-primary/10 rounded-3xl p-6 space-y-3 shadow-sm">
                <h4 className="text-lg font-serif font-bold text-primary">{bClass.name}</h4>
                <p className="text-xs text-primary/75 font-sans leading-relaxed">{bClass.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Navigation CTAs */}
        <div className="pt-8 border-t border-primary/10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-xl font-serif font-bold text-primary">Join the Lineage</h4>
            <p className="text-xs text-primary/75 font-sans">
              Register for upcoming events or inquire about participation requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#0e3b2e] hover:bg-accent hover:text-[#0e3b2e] text-white rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Inquire Event Entry
            </Link>
            <Link
              href="/academy"
              className="px-8 py-3.5 border border-primary/20 hover:border-primary text-primary font-serif text-xs font-bold uppercase tracking-widest rounded-2xl transition-all"
            >
              Back to The Academy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
