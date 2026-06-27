"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Institute() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Label and Line animation
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Title and Description animations
      gsap.fromTo(
        [titleRef.current, descRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Emblem animation
      gsap.fromTo(
        emblemRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: emblemRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Staggered pillar cards animations
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-primary text-secondary py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-accent/15"
    >


      {/* Decorative background elements for premium feel */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-[150px] opacity-25 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-[150px] opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">

          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-3">
              <span ref={lineRef} className="h-[1px] w-12 bg-accent" />
              <span ref={labelRef} className="text-xs md:text-sm font-semibold tracking-[0.3em] text-accent uppercase">
                The Institute
              </span>
            </div>

            <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
              Institute Standards
            </h2>

            <p ref={descRef} className="text-lg md:text-xl text-secondary/80 font-light leading-relaxed max-w-2xl">
              Traditional Archery Academy is dedicated to structured Mediterranean instinctive archery.
              We do not promote trends. We preserve continuity. Our work stands on three pillars:
            </p>
          </div>

          {/* Right Emblem Column */}
          <div ref={emblemRef} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Spinning background halo */}
              <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-spin-slow" />
              <div className="absolute -inset-4 rounded-full border border-double border-accent/10 scale-95 group-hover:scale-100 transition-transform duration-1000" />
            </div>
          </div>

        </div>

        {/* Pillars Grid: Staggered reveal cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Discipline */}
          <div className="group relative bg-dark-bg/10 backdrop-blur-sm border border-accent/15 hover:border-accent/40 rounded-2xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-primary/20 hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="text-4xl lg:text-5xl font-serif font-semibold text-accent/20 group-hover:text-accent/70 transition-colors duration-500">
                  01
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif mb-4 text-white group-hover:text-accent transition-colors duration-300">
                Discipline
              </h3>

              <p className="text-secondary/80 font-light leading-relaxed">
                Structured progression over casual shooting. Measurable standards and rigorous breath control.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-accent/5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-accent/60 group-hover:text-accent transition-colors duration-300">
                Focus & Breath
              </span>
            </div>
          </div>

          {/* Card 2: Craftsmanship */}
          <div className="group relative bg-dark-bg/10 backdrop-blur-sm border border-accent/15 hover:border-accent/40 rounded-2xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-primary/20 hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="text-4xl lg:text-5xl font-serif font-semibold text-accent/20 group-hover:text-accent/70 transition-colors duration-500">
                  02
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif mb-4 text-white group-hover:text-accent transition-colors duration-300">
                Craftsmanship
              </h3>

              <p className="text-secondary/80 font-light leading-relaxed">
                Instruments of precision. We curate and utilize only historically accurate, high-performance bows.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-accent/5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-accent/60 group-hover:text-accent transition-colors duration-300">
                Historical Accuracy
              </span>
            </div>
          </div>

          {/* Card 3: Cultural Memory */}
          <div className="group relative bg-dark-bg/10 backdrop-blur-sm border border-accent/15 hover:border-accent/40 rounded-2xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-primary/20 hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="text-4xl lg:text-5xl font-serif font-semibold text-accent/20 group-hover:text-accent/70 transition-colors duration-500">
                  03
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif mb-4 text-white group-hover:text-accent transition-colors duration-300">
                Cultural Memory
              </h3>

              <p className="text-secondary/80 font-light leading-relaxed">
                Maintaining the dialogue between Central European traditions and living Asian archery cultures.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-accent/5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-accent/60 group-hover:text-accent transition-colors duration-300">
                Traditional Dialogue
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
