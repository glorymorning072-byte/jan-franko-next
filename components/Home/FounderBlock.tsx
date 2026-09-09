"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FOUNDER_DATA = {
  role: "Founder & Head Instructor",
  name: "Jan Franko",
  biography: [
    "Training and expeditions are led by Jan Franko, founder of the academy. He unites more than 25 years of international professional experience in therapeutic bodywork, Traditional Chinese Medicine (TCM), and Qigong with traditional archery mastery.",
    "This deep synthesis of physical biomechanics, breath regulation, and instinctive focus ensures practitioners develop enduring stamina and natural alignment in any terrain."
  ],
  quote: "Archery is not only about the bow and the arrow. It is about the relationship between the body, breath, movement, attention and intention.",
  image: {
    src: "/images/wp-assets/founder-gallery-1.png",
    alt: "Jan Franko - Founder & Head Instructor"
  }
};

const FounderBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll animations on mobile & tablet screens (< 1024px) for 100% reliable rendering
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Line animation
      gsap.fromTo(lineRef.current, 
        { scaleX: 0, transformOrigin: "left center" },
        { 
          scaleX: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 2. Role text animation
      gsap.fromTo(roleRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: roleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 3. Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 4. Biography text animation
      gsap.fromTo(bioRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 5. Quote block animation
      gsap.fromTo(quoteRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 6. Image fade-in and slide-up animation
      gsap.fromTo(imageWrapperRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full flex min-h-screen items-center justify-center bg-secondary text-primary py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-accent/15 min-h-[90vh]"
    >


      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Grid: Asymmetrical layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-3">
              <span ref={lineRef} className="h-[1px] w-12 bg-primary" />
              <span ref={roleRef} className="text-xs md:text-sm font-semibold tracking-[0.3em] text-primary uppercase">
                {FOUNDER_DATA.role}
              </span>
            </div>

            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-primary tracking-tight leading-none"
            >
              {FOUNDER_DATA.name}
            </h2>

            <div ref={bioRef} className="space-y-4">
              {FOUNDER_DATA.biography.map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-base md:text-lg text-primary/80 font-light leading-relaxed max-w-2xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Blockquote section - clean layout, no quote overlapping */}
            <blockquote 
              ref={quoteRef}
              className="relative pl-8 md:pl-10 border-l-2 border-accent/40 my-8 py-2 max-w-2xl"
            >
              {/* Decorative Quotes Mark */}
              <span className="absolute -left-2 -top-4 text-accent/15 text-7xl font-serif select-none pointer-events-none">
                “
              </span>
              <p className="italic text-lg md:text-xl text-primary/95 font-serif leading-relaxed relative z-10">
                {FOUNDER_DATA.quote}
              </p>
              <cite className="block mt-4 text-right not-italic font-serif text-lg md:text-xl text-accent font-semibold">
                — {FOUNDER_DATA.name}
              </cite>
            </blockquote>

            <div className="pt-2 flex justify-start">
              <Link
                href="/about/jan-franko"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-secondary hover:bg-accent hover:text-[#0e3b2e] rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:scale-105"
              >
                <span>Read Instructor Profile &amp; Lineage</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div ref={imageWrapperRef} className="relative group w-full max-w-[400px] lg:max-w-none">
              {/* Premium offset double frame */}
              <div className="absolute -inset-3 rounded-2xl border border-accent/20 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute -inset-3 rounded-2xl border border-accent/10 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out" />
              
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl border border-accent/15 bg-primary/5 aspect-[4/5]">
                <Image 
                  src={FOUNDER_DATA.image.src}
                  alt={FOUNDER_DATA.image.alt}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 400px"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderBlock;
