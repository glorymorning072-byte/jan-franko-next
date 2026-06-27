"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RegionType {
  id: number;
  title: string;
  description: string;
  countries: string[];
  image: string;
  watermark: string;
}

const regionsData: RegionType[] = [
  {
    id: 1,
    title: "Nordic Region",
    description: "Rugged archery disciplines echoing Scandinavian heritage and cold-weather wilderness resilience.",
    countries: ["Norway", "Sweden", "Finland", "Denmark"],
    image: "https://images.pexels.com/photos/12177906/pexels-photo-12177906.jpeg?auto=compress&cs=tinysrgb&w=1200",
    watermark: "Nordic"
  },
  {
    id: 2,
    title: "Europe",
    description: "Traditional bowmanship rooted in the historic forests and alpine terrains of the continent.",
    countries: ["Slovakia", "Austria", "Germany", "Switzerland"],
    image: "https://images.pexels.com/photos/7512302/pexels-photo-7512302.jpeg?auto=compress&cs=tinysrgb&w=1200",
    watermark: "Europe"
  },
  {
    id: 3,
    title: "Central Asian Steppe Archery",
    description: "Nomadic horseback archery traditions.",
    countries: ["Mongolia", "Kyrgyzstan", "Kazakhstan"],
    image: "https://images.pexels.com/photos/30876954/pexels-photo-30876954.jpeg?auto=compress&cs=tinysrgb&w=1200",
    watermark: "Steppe"
  },
  {
    id: 4,
    title: "Historical Turkic & Ottoman Archery",
    description: "Mastery of the powerful composite bow and the legendary flight archery of the Ottoman Empire.",
    countries: ["Turkey"],
    image: "https://images.pexels.com/photos/30736363/pexels-photo-30736363.jpeg?auto=compress&cs=tinysrgb&w=1200",
    watermark: "Ottoman"
  },
  {
    id: 5,
    title: "East Asian Archery",
    description: "Kyudo and classical Asian bow traditions.",
    countries: ["Korea", "Japan", "Bhutan"],
    image: "https://images.pexels.com/photos/7126201/pexels-photo-7126201.jpeg?auto=compress&cs=tinysrgb&w=1200",
    watermark: "East Asia"
  },
  {
    id: 6,
    title: "Expedition Regions",
    description: "Remote wilderness training locations.",
    countries: ["Yukon", "Patagonia", "South Africa", "Australia"],
    image: "https://images.pexels.com/photos/9784441/pexels-photo-9784441.jpeg?auto=compress&cs=tinysrgb&w=1200",
    watermark: "Wilderness"
  }
];

const RegionRow = ({ region, index }: { region: RegionType; index: number }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const countriesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements sliding up staggeredly when row enters viewport
      gsap.fromTo(
        [titleRef.current, descRef.current, countriesRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate subtle parallax scale effect on scroll
      gsap.fromTo(
        imageColRef.current,
        { scale: 1.1 },
        {
          scale: 1.0,
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, [index]);

  const isOdd = index % 2 !== 0;

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between min-h-[75vh] md:h-screen w-full text-secondary overflow-hidden`}
    >
      {/* Text Section */}
      <div 
        ref={textColRef}
        className={`w-full min-h-[35vh] md:h-full md:w-2/5 text-center ${isOdd ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} flex flex-col items-center justify-center p-8 md:p-12 relative z-10`}
      >


        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold font-serif mb-4 md:mb-6">{region.title}</h2>
          <p ref={descRef} className="text-base md:text-lg mb-4 md:mb-6 max-w-md font-light leading-relaxed">{region.description}</p>
          <b ref={countriesRef} className="text-xs md:text-sm tracking-widest uppercase text-accent font-semibold">{region.countries.join(" • ")}</b>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full h-[40vh] md:w-3/5 md:h-full flex items-center justify-center relative overflow-hidden z-0">
        <Image 
          ref={imageColRef}
          src={region.image} 
          alt={region.title} 
          fill
          sizes="(max-w-768px) 100vw, 60vw"
          className="object-cover" 
          priority={region.id === 1}
        />
        <div className={`absolute inset-0 ${isOdd ? 'bg-primary/45' : 'bg-secondary/45'} mix-blend-multiply`} />
      </div>
    </div>
  );
};

const ExpeditionRegions = () => {
  return (
    <section className="w-full flex flex-col">
      {regionsData.map((region, index) => (
        <RegionRow 
          key={region.id} 
          region={region} 
          index={index}
        />
      ))}
    </section>
  );
};

export default ExpeditionRegions;