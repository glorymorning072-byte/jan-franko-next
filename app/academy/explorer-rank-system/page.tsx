import React from "react";
import Link from "next/link";
import { Award, Compass, MapPin, CheckCircle2, ArrowRight, ChevronRight, Layers, Sparkles, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer Rank System | Jan Franko Traditional Archery Academy",
  description:
    "Recognizing archer continuity, presence, and long-term commitment across five global ecosystems: Ocean, Mountain, Steppe, Forest, and Sub-Arctic.",
  openGraph: {
    title: "Explorer Rank System | Jan Franko Traditional Archery Academy",
    description: "Structured progression across 5 global terrain ecosystems."
  }
};

const ECOSYSTEMS_DETAILED = [
  {
    title: "1. Ocean Ecosystem (Humidity & Tides)",
    location: "Okinawa, Japan & Adriatic Coast",
    image: "/images/wp-assets/contact-bg.webp",
    badge: "Coastal Field",
    challenges: [
      "Heavy salt-air humidity causing natural horn and sinew bow limbs to absorb moisture.",
      "Constantly shifting coastal breeze and tidal current timing.",
      "Shifting sand dune footing demanding core stabilizer engagement.",
      "Corrosion-resistant wax treatment for natural linen bowstrings."
    ],
    summary: "Ocean archery tests an archer’s capability to maintain bow tension and arrow flight consistency where high atmospheric humidity and coastal winds constantly alter arrow flight resistance."
  },
  {
    title: "2. Mountain Ecosystem (Altitude & Oxygen)",
    location: "Bhutanese Himalayas & Tyrol Alps",
    image: "/images/wp-assets/Alpine-Highland.webp",
    badge: "High Elevation",
    challenges: [
      "Thin air density altering arrow elevation drop across distances.",
      "Steep uphill (+45°) and downhill (-35°) shooting angles requiring waist bend alignment.",
      "Diaphragmatic breath pauses after rapid 400m altitude trail climbs.",
      "Sudden alpine weather shifts and thermal downdrafts."
    ],
    summary: "Mountain archery forces the archer to master spinal posture. Rather than lifting or dropping arms, the archer bends at the hips, keeping the shoulder T-alignment intact on steep cliffs."
  },
  {
    title: "3. Steppe Ecosystem (Wind & Vastness)",
    location: "Mongolian Grasslands & Kyrgyzstan",
    image: "/images/wp-assets/Steppe-Exposure.webp",
    badge: "Open Gale",
    challenges: [
      "Unsheltered, continuous crosswinds exceeding 50 km/h.",
      "Thumb-ring draw release mechanics for rapid mounted or standing shots.",
      "Lack of vertical reference points (trees/cliffs) across vast horizon targets.",
      "Horseback archery stability and rhythm synchronization."
    ],
    summary: "The Eurasian steppe is the spiritual home of composite reflex archery. Archers must read wind ripples in the grass and execute instinctive releases without relying on static sight points."
  },
  {
    title: "4. Forest Ecosystem (Shadow & Acoustics)",
    location: "Muráň Plateau & Glencoe Woodlands",
    image: "/images/wp-assets/Carpathian-Mountain.webp",
    badge: "Woodland Canopy",
    challenges: [
      "Dappled canopy light and deep shadows distorting distance perception.",
      "Tree trunk obstacle clearance requiring canted bow angles.",
      "Sound acoustics in tight timber stands heightening archer focus.",
      "Uneven leaf litter and mossy rock footing."
    ],
    summary: "Forest archery requires silent footwork and quick adaptation. Archers practice canting the bow to clear low branches while maintaining precise anchor point contact."
  },
  {
    title: "5. Sub-Arctic Ecosystem (Frost & Cold)",
    location: "Yukon Corridor & Sub-Arctic Taiga",
    image: "/images/wp-assets/Artic-Exposure.webp",
    badge: "Sub-Zero Exposure",
    challenges: [
      "Limb stiffness in natural bow materials under sub-zero temperatures (-20°C).",
      "Heavy thermal outerwear clearance during string release.",
      "Cold-weather finger numbness requiring specialized leather tab/glove technique.",
      "Deep snowpack stance stabilization using snowshoes or winter boots."
    ],
    summary: "Sub-Arctic archery tests extreme thermal self-regulation. Archers learn how to keep core muscle groups warm while ensuring heavy parkas do not interfere with string travel."
  }
];

export default function ExplorerRankSystemPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-24 pb-20 select-text font-sans">
      {/* 1. Dark Hero Section */}
      <section className="relative border-b border-primary/10 bg-[#0e3b2e] text-white py-16 md:py-24 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-accent/80 font-semibold">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <Link href="/academy" className="hover:text-accent transition-colors">
              Academy
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <span className="text-white font-bold">Explorer Rank System</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#c5a880]/15 border border-[#c5a880]/30 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
              <Award className="w-4 h-4 text-accent" />
              Continuity &amp; Environmental Mastery
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Explorer Rank System
            </h1>
            <p className="text-base md:text-xl text-white/85 font-sans max-w-3xl leading-relaxed font-light">
              Explorer Adventures is not a collection of isolated journeys. It is a structured progression path designed to test archer presence, kinetic adaptability, and physical resilience across five distinct global ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detailed Ecosystem Breakdown Sections */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-16">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            Environmental Adaptation
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            The 5 Global Terrain Ecosystems
          </h2>
          <p className="text-xs sm:text-sm text-primary/75 max-w-2xl font-sans">
            Each ecosystem presents unique atmospheric, biomechanical, and equipment maintenance challenges.
          </p>
          <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
        </div>

        <div className="space-y-12">
          {ECOSYSTEMS_DETAILED.map((eco, idx) => (
            <div
              key={idx}
              className="bg-white border border-primary/10 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm hover:border-accent/40 transition-all"
            >
              <div className="lg:col-span-5 space-y-3">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/30 border border-primary/10">
                  <img
                    src={eco.image}
                    alt={eco.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#0e3b2e] text-accent text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase border border-accent/30">
                    {eco.location}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-primary/85">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#7d603a] font-bold">
                    {eco.badge}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-primary">
                    {eco.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-primary/80 font-sans">
                  {eco.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-primary/10">
                  <span className="text-xs font-serif uppercase tracking-wider text-primary font-bold block">
                    Core Technical Challenges:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-primary/80">
                    {eco.challenges.map((ch, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7d603a] shrink-0 mt-0.5" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Rank Progression Hierarchy */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-primary/10 space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
            Archer Hierarchy
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            Explorer Ranks &amp; Milestones
          </h2>
          <div className="w-12 h-[1.5px] bg-accent/60 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                Level I Rank
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary">Initiate Explorer</h3>
              <p className="text-xs text-primary/75 leading-relaxed font-sans">
                Completion of 1 primary terrain ecosystem. Archer has proven basic range safety compliance, equipment care, and consistent 30m target accuracy in a single field environment.
              </p>
            </div>
            <div className="pt-3 border-t border-primary/10 text-xs font-serif font-bold text-[#7d603a]">
              Requirement: 1 Ecosystem Module
            </div>
          </div>

          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0e3b2e] text-accent font-bold">
                Level II Rank
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary">Field Explorer</h3>
              <p className="text-xs text-primary/75 leading-relaxed font-sans">
                Completion of 3 distinct terrain ecosystems (e.g. Mountain, Steppe, Forest). Archer demonstrates dynamic slope adaptation, wind drift calculation, and ESI Tier II verification.
              </p>
            </div>
            <div className="pt-3 border-t border-primary/10 text-xs font-serif font-bold text-[#7d603a]">
              Requirement: 3 Ecosystem Modules
            </div>
          </div>

          <div className="bg-white border border-accent/40 rounded-3xl p-8 space-y-4 shadow-md bg-gradient-to-br from-white to-secondary flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-accent text-[#0e3b2e] font-bold">
                Apex Rank
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary">Master Explorer</h3>
              <p className="text-xs text-primary/75 leading-relaxed font-sans">
                Total environmental dominance across all 5 global ecosystems. Proven operational mastery in high altitude mountain gales, sub-arctic frost, coastal humidity, and open steppe winds.
              </p>
            </div>
            <div className="pt-3 border-t border-primary/10 text-xs font-serif font-bold text-[#7d603a]">
              Requirement: All 5 Ecosystem Modules
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Footer */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-[#0e3b2e] text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white">Begin Your Explorer Trajectory</h3>
          <p className="text-xs sm:text-sm text-white/80 font-sans max-w-xl mx-auto">
            Log your expedition hours and apply for rank progression assessments across upcoming European, Steppe, or Ocean modules.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-2xl font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105"
          >
            <span>Apply for Rank Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
