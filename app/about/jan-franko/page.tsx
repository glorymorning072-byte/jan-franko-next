import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Compass,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Shield,
  HeartPulse,
  Flame,
  Droplets,
  Wind,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jan Franko | Traditional Archery Instructor & Holistic Bodywork Specialist",
  description:
    "Discover the philosophy, 25+ years of therapeutic bodywork experience, and Traditional Chinese Medicine journey of instructor Jan Franko.",
  openGraph: {
    title: "Jan Franko | Traditional Archery Instructor & Holistic Bodywork Specialist",
    description:
      "Bridging traditional archery, biomechanics, Qigong, and 25+ years of Traditional Chinese Medicine and therapeutic bodywork.",
    images: [{ url: "/images/wp-assets/jan-franko-profile.jpeg" }]
  }
};

export default function JanFrankoProfilePage() {
  const tcmTimeline = [
    {
      period: "1985 – Ongoing",
      title: "Archery Origins & Initial Practice",
      desc: "First discovery and initial practice of traditional bow mechanics, establishing an enduring lifelong foundation in instinctive shooting and traditional field craft."
    },
    {
      period: "2000 – 2003",
      title: "1st School of Traditional Chinese Medicine, Prague",
      desc: "Formal education in Prague covering Traditional Chinese Medicine philosophy, meridian theory, TCM diagnostics, Tuina, acupressure, cupping, moxibustion, TCM nutrition, and the foundations of acupuncture."
    },
    {
      period: "2011 – Ongoing",
      title: "Asiatic & Korean Traditional Bow Discipline",
      desc: "Deep specialization in Asiatic composite archery, traditional thumb-draw mechanics, dynamic horse archery, and Korean bow traditions across mountain and field terrain."
    },
    {
      period: "Field Certifications",
      title: "Henry Bodnik & Chris Mozolowski Certifications",
      desc: "Formal field instructor certifications and traditional archery methodology training completed under master bowyer Henry Bodnik and field archery specialist Chris Mozolowski."
    },
    {
      period: "2000 – 2020",
      title: "Founder & Director — Revital Centre (Slovakia)",
      desc: "Built and managed a professional therapeutic centre for two decades, leading a team of 8–13 therapists and overseeing up to 900 clinical treatments per month. Developed deep practical understanding of human recovery, kinetic adaptation, and client care."
    },
    {
      period: "2020 – 2026",
      title: "Alpine Regeneration & International Luxury Wellness",
      desc: "Senior spa therapist and ritual guide across premier resorts in Tyrol (Alpinhotel Berghaus, Zugspitz Resort, POST Hotel, Der Böglerhof, A-ROSA Kitzbühel) and international luxury charter voyages (M/Y PALOMA luxury yacht in the Caribbean & Mediterranean)."
    },
    {
      period: "January 2027",
      title: "Advanced Studies through TCM INSTITUT",
      desc: "Continuing long-term formal education in Traditional Chinese Medicine through TCM INSTITUT under the programme guidance of MUDr. Jozef Lucký.",
      link: "https://www.tcminstitut.cz/"
    }
  ];

  const therapeuticDisciplines = [
    "Medical, Sports & Deep Tissue Massage",
    "Fascia Massage & Trigger-Point Therapy",
    "Tuina & Acupressure",
    "TCM-Based Cupping & Moxibustion",
    "Manual Lymphatic Drainage",
    "Shiatsu, Thai & Ayurveda Applications",
    "Hot Stone & La Stone Therapy",
    "Foot Reflexology & Lomi Lomi Nui"
  ];

  const wellnessDisciplines = [
    "Qigong & Breathwork Regulation",
    "Tibetan Singing-Bowl Meditation",
    "Cold Exposure & Alpine Ice-Bath Sessions",
    "Traditional Sauna Rituals",
    "Biomechanical Alignment & Kinetic Chain Training",
    "Individual Regeneration & Recovery Concepts"
  ];

  const languages = [
    { lang: "Slovak", level: "Native" },
    { lang: "German", level: "Fluent" },
    { lang: "English", level: "Fluent" },
    { lang: "Spanish", level: "Fluent" },
    { lang: "Czech", level: "Fluent" },
    { lang: "Russian", level: "Fluent" },
    { lang: "French", level: "Basic" },
    { lang: "Italian", level: "Basic" },
    { lang: "Japanese", level: "Basic" }
  ];

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative">
      {/* 1. Hero Header Section */}
      <div className="relative w-full bg-[#0e3b2e] text-white py-16 md:py-24 px-6 overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(14,59,46,0.6))] z-0" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Column: Portrait Photo */}
          <div className="lg:col-span-5 relative aspect-[3/4] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-black/40">
            <Image
              src="/images/wp-assets/jan-franko-profile.jpeg"
              alt="Jan Franko"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e3b2e]/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block">
                Tirol, Austria
              </span>
              <h3 className="font-serif text-xl font-bold">Jan Franko</h3>
            </div>
          </div>

          {/* Right Column: Key Narrative Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#c5a880]/15 border border-[#c5a880]/35 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-accent">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Instructor Profile &amp; Lineage
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                Jan Franko
              </h1>
              <p className="text-sm md:text-base font-serif text-accent uppercase tracking-wider font-semibold">
                Traditional Archery Instructor • Holistic Bodywork Specialist • TCM Practitioner
              </p>
            </div>

            {/* Core Positioning Quote */}
            <blockquote className="border-l-2 border-accent pl-5 py-2 text-base md:text-xl font-serif italic text-white/95 leading-relaxed bg-white/5 rounded-r-2xl">
              "Archery is not only about the bow and the arrow. It is about the relationship between the body, breath, movement, attention and intention."
            </blockquote>

            <p className="text-sm md:text-base text-white/85 font-sans leading-relaxed">
              With more than <strong>25 years of international professional experience</strong> across bodywork, Traditional Chinese Medicine, wellness, and physical conditioning, Jan Franko combines traditional archery disciplines with deep practical understanding of human movement, kinetic alignment, and restorative body awareness.
            </p>

            {/* Badges / Experience Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">Experience</span>
                <span className="text-sm md:text-base font-serif font-bold text-white">25+ Years</span>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">TCM Education</span>
                <span className="text-sm md:text-base font-serif font-bold text-white">Since 2000</span>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">Clinical Scale</span>
                <span className="text-sm md:text-base font-serif font-bold text-white">~900 / Month</span>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              <a
                href="https://wa.me/436641645360"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: +43 664 164 53 60</span>
              </a>
              <a
                href="mailto:janfranko@tutanota.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all hover:scale-105"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>janfranko@tutanota.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20">
        
        {/* Section 1: The Synthesis of Archery & Body Mechanics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
                Philosophy &amp; Method
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary tracking-tight">
                Movement, Breath &amp; Instinctive Focus
              </h2>
              <div className="w-12 h-[1px] bg-accent/40 mt-3" />
            </div>

            <div className="space-y-4 text-sm md:text-base text-primary/85 font-sans leading-relaxed">
              <p>
                Jan's approach to traditional archery is distinct from conventional sport shooting or mechanical target practice. Having worked hands-on with thousands of bodies across 25+ years of clinical and therapeutic practice, he understands how physical tension, skeletal alignment, breathing rhythms, and mental state directly govern archery performance.
              </p>
              <p>
                In instinctive traditional archery, the shot is not engineered through artificial sights or static anchors. It is executed through full-body kinetic coordination, centered posture, and relaxed focus. Integrating classical principles of <strong>Traditional Chinese Medicine (TCM)</strong>, <strong>Tuina</strong>, and <strong>Qigong</strong>, training emphasizes natural posture, structural release, and deep diaphragmatic breathing.
              </p>
              <p>
                This synthesis allows archers to develop enduring stamina, avoid repetitive strain, and achieve a calm, instinctive presence in any terrain—from high alpine forests to the open winds of the Eurasian steppe.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm">
            <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-[#7d603a] border-b border-primary/5 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Core Instructor Pillars
            </h3>
            <ul className="space-y-4 text-xs md:text-sm font-sans">
              <li className="flex gap-3">
                <span className="w-2 h-2 rotate-45 bg-accent shrink-0 mt-1.5" />
                <div>
                  <strong className="font-serif text-primary block">Biomechanical Precision</strong>
                  <span className="text-primary/75">Alignment of shoulders, draw arm, scapular tension, and ground root.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rotate-45 bg-accent shrink-0 mt-1.5" />
                <div>
                  <strong className="font-serif text-primary block">Breath Regulation &amp; Qigong</strong>
                  <span className="text-primary/75">Using breath to drop heart rate, release shoulder tension, and stabilize aim.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rotate-45 bg-accent shrink-0 mt-1.5" />
                <div>
                  <strong className="font-serif text-primary block">Holistic Recovery</strong>
                  <span className="text-primary/75">Post-training regeneration, fascia release, thermal sauna, and cold exposure.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 rotate-45 bg-accent shrink-0 mt-1.5" />
                <div>
                  <strong className="font-serif text-primary block">Cultural Respect &amp; Lineage</strong>
                  <span className="text-primary/75">Deep study of Asiatic composite bows, European longbows, and traditional archery craft.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: 26+ Year TCM Educational Journey */}
        <div className="space-y-10 border-t border-primary/10 pt-16">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#7d603a] font-bold block">
              Continuous Education
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary tracking-tight">
              Traditional Chinese Medicine &amp; Therapeutic Timeline
            </h2>
            <p className="text-xs md:text-sm text-primary/70 font-sans max-w-2xl">
              An ongoing relationship with classical eastern medicine, continuous learning, and practical bodywork spanning over two and a half decades.
            </p>
            <div className="w-12 h-[1px] bg-accent/40 mt-3 mx-auto md:mx-0" />
          </div>

          <div className="relative border-l-2 border-accent/30 pl-6 md:pl-10 ml-4 md:ml-6 space-y-10">
            {tcmTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0e3b2e] border-2 border-accent group-hover:scale-125 transition-transform" />
                <div className="bg-white border border-primary/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-3 hover:border-accent/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold bg-secondary px-3 py-1 rounded-full border border-primary/5">
                      {item.period}
                    </span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-accent hover:underline"
                      >
                        <span>Visit TCM INSTITUT</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-primary/80 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Therapeutic Disciplines & Regeneration Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-primary/10 pt-16">
          {/* Card 1: Therapeutic Bodywork */}
          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <HeartPulse className="w-5 h-5" />
                <span className="text-[10px] font-serif uppercase tracking-widest font-bold text-[#7d603a]">
                  Clinical Expertise
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-primary">
                Therapeutic Disciplines
              </h3>
            </div>
            <p className="text-xs md:text-sm text-primary/75 font-sans leading-relaxed">
              Extensive hands-on mastery in clinical rehabilitation, sports massage, and manual meridian therapies.
            </p>
            <ul className="space-y-2.5 pt-2">
              {therapeuticDisciplines.map((d, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-sans text-primary/85">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Wellness & Regeneration */}
          <div className="bg-white border border-primary/10 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <Flame className="w-5 h-5" />
                <span className="text-[10px] font-serif uppercase tracking-widest font-bold text-[#7d603a]">
                  Restoration &amp; Energy
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-primary">
                Wellness &amp; Regeneration
              </h3>
            </div>
            <p className="text-xs md:text-sm text-primary/75 font-sans leading-relaxed">
              Restorative practices connecting the mind, breath, thermal therapy, and physical recovery.
            </p>
            <ul className="space-y-2.5 pt-2">
              {wellnessDisciplines.map((w, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-sans text-primary/85">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 4: International Experience & Languages */}
        <div className="bg-[#0e3b2e] text-white rounded-3xl p-8 md:p-14 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.1),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-3xl">
            <span className="text-[10px] font-serif uppercase tracking-widest text-accent font-bold">
              Global Perspective
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
              International Experience &amp; Multilingual Care
            </h3>
            <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed">
              Professional practice across Austria, Germany, Spain, Malta, British Virgin Islands, St. Maarten, Dominican Republic, Cyprus, and Slovakia.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
            {languages.map((l, i) => (
              <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-3.5 space-y-1">
                <span className="text-xs font-serif font-bold text-white block">{l.lang}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent">{l.level}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-serif font-bold text-white block">Ready to train or consult?</span>
              <span className="text-xs text-white/70 font-sans">Reach out directly via WhatsApp or Email.</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/436641645360"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-accent hover:bg-accent/90 text-[#0e3b2e] rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:scale-105"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all hover:scale-105"
              >
                Inquiry Form
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
