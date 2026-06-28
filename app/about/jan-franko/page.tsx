"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, BookOpen, Compass, Award } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const JanFrankoProfilePage = () => {
  const milestones: Milestone[] = [
    {
      year: "1978",
      title: "Birth & Year of the Horse",
      description: "Born under the zodiac sign of Leo, expressing an early curiosity about maps, continents, distant cultures, and mineralogy."
    },
    {
      year: "1985",
      title: "First Encounter with the Bow",
      description: "At seven years old, cousin Marek crafted a simple wooden self bow and natural Broadhead point arrows. This encounter set a silent direction for my life."
    },
    {
      year: "2000",
      title: "Traditional Medicine & Holistic Therapy",
      description: "Began studying acupuncture and Traditional Chinese Medicine in Prague under Beijing professors, combined with comprehensive massage therapy qualifications. Practiced as a therapist for 9+ years in the Tyrol Alps, Austria."
    },
    {
      year: "2011",
      title: "Korean Bow & Intensive Self-Training",
      description: "Acquired first traditional Korean bow and embarked on rigorous self-training, practicing many hours each day, often shooting purely by instinct in complete darkness."
    },
    {
      year: "2020",
      title: "Longbow Mentorship with Henry Bodnik",
      description: "Acquired a Longbow and met Henry Bodnik (founder of Bodnik Bows). Corrected core techniques and began structured teacher training under his personal guidance."
    },
    {
      year: "2024",
      title: "Swiss Bowhunting Certification",
      description: "Completed specialized Swiss Federation of Bowhunting certification under President Chris Mozolowski, scoring 98% in theoretical exams using a traditional bow."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative">
      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Taller Portrait 3:4 aspect ratio Profile Photo */}
        <div className="lg:col-span-5 relative aspect-[3/4] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-primary/10">
          <img
            src="https://janfranko.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-28-at-4.11.13-PM-1024x682.jpeg"
            alt="Jan Franko"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Bio Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#c5a880]/15 border border-[#c5a880]/35 rounded-full text-xs md:text-sm font-serif font-semibold tracking-widest uppercase text-[#5c4629]">
              <Sparkles className="w-3 h-3 text-accent" />
              Founder &amp; Instructor
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight leading-tight">
              Jan Franko
            </h1>
            <p className="text-lg md:text-xl font-serif text-accent italic font-medium leading-relaxed">
              "The path of the bow is not measured only by accuracy. It is a journey of patience, discipline, and continuous learning."
            </p>
          </div>

          <div className="w-16 h-[1px] bg-[#c5a880]/30" />

          <p className="text-sm md:text-base text-primary/85 font-sans leading-relaxed max-w-2xl">
            Founder of the Traditional Archery Academy, Jan Franko unites two decades of holistic therapeutic experience in Traditional Chinese Medicine with rigorous traditional archery training to teach instinctive mastery through structure, mental presence, and safety.
          </p>

          {/* Core Badges Row */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-primary/5 rounded-xl text-xs font-serif uppercase tracking-widest font-bold">
              <Compass className="w-4 h-4 text-accent" />
              <span>Central Europe &amp; Steppes</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-primary/5 rounded-xl text-xs font-serif uppercase tracking-widest font-bold">
              <Award className="w-4 h-4 text-accent" />
              <span>15+ Years Vetted Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Styled Life Timeline Section */}
      <div className="bg-[#0e3b2e] text-white py-16 md:py-24 border-t border-b border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,168,128,0.08),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
          <div className="text-center space-y-2">
            <span className="text-xs md:text-sm font-serif uppercase tracking-widest text-accent font-bold">
              Historical Milestones
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Life Chronology
            </h2>
            <div className="w-10 h-[1px] bg-accent/40 mx-auto mt-3" />
          </div>

          {/* Vertical Line Timeline */}
          <div className="relative border-l border-white/20 pl-6 md:pl-10 ml-2 md:ml-6 space-y-10">
            {milestones.map((m, index) => (
              <div key={index} className="relative group animate-in fade-in duration-300">
                {/* Year Badge Indicator */}
                <span className="absolute w-12 h-6 md:w-16 md:h-7 -left-[48px] md:-left-[72px] rounded-full bg-[#0e3b2e] border-2 border-accent flex items-center justify-center font-serif text-accent text-xs md:text-sm font-bold shadow-md group-hover:scale-105 transition-transform z-10">
                  {m.year}
                </span>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 hover:border-accent/40 transition-colors">
                  <span className="flex items-center gap-1.5 text-xs md:text-sm uppercase tracking-widest text-accent font-serif font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    Year {m.year}
                  </span>
                  <h4 className="font-serif text-sm md:text-base font-bold text-white tracking-wide">
                    {m.title}
                  </h4>
                  <p className="text-sm text-white/80 font-sans leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Field Work & Cultural Research Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-tight">
              Field Work &amp; Cultural Research
            </h2>
            <div className="w-12 h-[1.5px] bg-accent/40" />
          </div>
          <div className="space-y-4 text-sm text-primary/85 font-sans leading-relaxed">
            <p>
              Alongside personal training and teaching, an important part of Jan's work is the exploration and study of traditional archery cultures in different regions of the world. The aim is to observe, learn from, and document living traditions of the bow where they still exist today — among nomadic cultures, traditional craftsmen, and practitioners who continue these skills across generations.
            </p>
            <h3 className="font-serif font-bold text-primary text-sm pt-2">Global Explorations</h3>
            <p>
              Current and planned exploration regions span Europe, Mongolia, Kyrgyzstan, Kazakhstan, Iran, Turkey, Korea, Japan, Bhutan, South Africa, Hawaii, Yukon (Canada), Patagonia, and Tierra del Fuego.
            </p>
            <p>
              These expeditions connect modern field training directly with authentic historical heritage, creating a global network of traditional craftsmen and archers.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-primary text-secondary font-serif text-xs uppercase tracking-wider rounded-xl hover:bg-accent transition-all cursor-pointer shadow-sm"
              >
                Inquire About Expeditions
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden bg-primary/10 border border-primary/10 shadow-lg">
          <img
            src="https://janfranko.com/wp-content/uploads/2026/02/image-25-02-2026-11-33-59.webp"
            alt="Jan Franko Field Work"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
};

export default JanFrankoProfilePage;
