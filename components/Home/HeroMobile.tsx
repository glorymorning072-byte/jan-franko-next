"use client";

import React from "react";
import Link from "next/link";

const HeroMobile = () => {
  return (
    <div
      className="relative w-full flex flex-col items-center justify-center bg-secondary text-primary py-16 px-8 overflow-hidden border-b border-primary/10 select-none min-h-[calc(100vh-80px)] text-center"
    >
      {/* Premium Double Framed Borders */}
      <div className="border-outer absolute inset-5 border border-primary/5 rounded-2xl pointer-events-none z-0" />
      <div className="border-inner absolute inset-6.5 border border-dashed border-accent/15 rounded-2xl pointer-events-none z-0" />

      {/* Stylized Archery Arrowhead Badge */}
      <div className="w-12 h-12 mb-6 text-accent z-10 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3l-6 6m6-6l6 6M12 21l-3-3m3 3l3-3" />
        </svg>
      </div>

      {/* Academy Label */}
      <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-accent uppercase mb-3 z-10">
        Global Academy for Traditional Archery
      </span>

      {/* Main Serif Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif tracking-tight leading-none mb-3 z-10">
        Jan Franko
      </h1>

      {/* Classical Diamond Divider */}
      <div className="flex items-center gap-3 w-32 my-2 z-10">
        <div className="h-[1px] bg-accent/35 flex-1" />
        <div className="w-1.5 h-1.5 rotate-45 bg-accent" />
        <div className="h-[1px] bg-accent/35 flex-1" />
      </div>

      {/* Serif Subtitle */}
      <span className="text-base md:text-lg font-serif text-accent font-semibold tracking-wider mb-6 z-10">
        Training • Expeditions • Cultural Heritage
      </span>

      {/* Description Paragraph */}
      <p className="text-sm text-primary/85 font-light leading-relaxed max-w-sm mb-8 z-10">
        A traditional archery academy focused on structured training, cultural study, and expeditions exploring historic archery traditions.
        At The Global Academy for Traditional Archery, we offer a comprehensive approach to learning the art of traditional archery, designed to build instinct through rigorous, measurable structure.
      </p>

      {/* CTA Button */}
      <Link
        href="/programs"
        className="relative overflow-hidden bg-primary text-secondary font-serif tracking-widest text-xs uppercase py-3.5 px-7 rounded-full shadow-md shadow-primary/10 active:scale-[0.98] flex items-center gap-2 cursor-pointer z-10"
      >
        <span className="relative z-10">Explore Our Programs</span>
        <svg className="w-3.5 h-3.5 text-accent z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
};

export default HeroMobile;
