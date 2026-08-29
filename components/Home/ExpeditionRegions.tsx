"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/Button";
import { EditorialItem } from "@/types/editorial";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Initial Base Level Editorial Items (parent === 0) as fallback and instant initial render
const INITIAL_BASE_VOLUMES: EditorialItem[] = [
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
      card_description: "A rigorous, high-fidelity deployment designed to test the limits of human biological resilience and historical bowmanship. Operating within the unforgiving sub-zero corridors of the Yukon Territory, this expedition demands absolute mastery over organic composite gear, advanced cold-weather physiological management, and traditional pathfinding.",
      card_bullet_1: "Sub-Zero Material Stability",
      card_bullet_2: "Extreme Cold Biomechanics",
      card_bullet_3: "Wilderness Survival Isolation",
      hero: {
        heading: "Yukon Expedition: Sub-Arctic Mastery",
        eyebrow: "WINTER VANGUARD",
        image_external_url: "https://images.pexels.com/photos/11546809/pexels-photo-11546809.jpeg"
      }
    }
  },
  {
    id: 6171,
    slug: "bhutan-expedition",
    parent: 0,
    link: "https://janfranko.com/editorial/bhutan-expedition/",
    title: { rendered: "The Bhutan Expedition" },
    content: { rendered: "" },
    acf: {
      card_title: "The Bhutan Expedition",
      card_description: "Embark on a sacred journey into the heart of the Himalayas, where the ancient traditions of the bow are deeply woven into the spiritual fabric of Bhutan. Study historical martial foundations, local rituals, and meditative focus through high-altitude passes and pristine valleys.",
      card_bullet_1: "High-Altitude Acclimatization",
      card_bullet_2: "Bamboo Bow Mechanics",
      card_bullet_3: "Sacred Valley Targetry",
      hero: {
        heading: "The Bhutan Expedition",
        eyebrow: "Global Academy for Traditional Archery",
        image_external_url: "https://images.pexels.com/photos/10360878/pexels-photo-10360878.jpeg?auto=compress&w=1260&h=750&dpr=1"
      }
    }
  },
  {
    id: 6214,
    slug: "patagonia-expedition",
    parent: 0,
    link: "https://janfranko.com/editorial/patagonia-expedition/",
    title: { rendered: "Patagonia Expedition" },
    content: { rendered: "" },
    acf: {
      card_title: "Patagonia Expedition",
      card_description: "Prepare to test the absolute limits of your traditional archery craft against the relentless, gale-force winds of the Patagonian steppe. A rigorous validation of the Winter Vanguard traditions, designed for the master bowman who seeks to hone their instinctive shot within a vast wilderness.",
      card_bullet_1: "High-Wind Arrow Calibration",
      card_bullet_2: "Sub-Alpine Trail Endurance",
      card_bullet_3: "Gaucho Field Craft",
      hero: {
        heading: "The Patagonia Expedition",
        eyebrow: "Global Expeditions",
        image_external_url: "https://images.pexels.com/photos/4468726/pexels-photo-4468726.jpeg"
      }
    }
  },
  {
    id: 6196,
    slug: "mongolia-expedition",
    parent: 0,
    link: "https://janfranko.com/editorial/mongolia-expedition/",
    title: { rendered: "Mongolia Expedition" },
    content: { rendered: "" },
    acf: {
      card_title: "Mongolia Expedition",
      card_description: "Journey deep into the vast expanse of the Central Asian Steppe, where the legacy of the nomadic horse archer was forged in wind and dust. Our immersive expedition explores the sophisticated construction of horn-sinew composite bows and the precise biomechanics of the traditional thumb draw.",
      card_bullet_1: "Raw Steppe Wind Calibration",
      card_bullet_2: "Classical Horn Draw",
      card_bullet_3: "145m Open Range Audit",
      hero: {
        heading: "The Mongolia Expedition: Land of the Eternal Blue Sky",
        eyebrow: "Global Academy for Traditional Archery",
        image_external_url: "https://images.pexels.com/photos/35497976/pexels-photo-35497976.jpeg"
      }
    }
  }
];

const RegionRow = ({ volume, index }: { volume: EditorialItem; index: number }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements sliding up staggeredly when row enters viewport
      gsap.fromTo(
        [eyebrowRef.current, titleRef.current, descRef.current, bulletsRef.current, buttonsRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, [index]);

  const isOdd = index % 2 !== 0;
  const title = volume.acf?.card_title || volume.title?.rendered || "Archery Lineage";
  const description = volume.acf?.card_description || volume.acf?.hero?.description?.replace(/<[^>]*>/g, "") || "";
  const bullets = [
    volume.acf?.card_bullet_1,
    volume.acf?.card_bullet_2,
    volume.acf?.card_bullet_3,
  ].filter(Boolean) as string[];

  const bgImage = volume.acf?.hero?.image_external_url || "https://images.pexels.com/photos/12177906/pexels-photo-12177906.jpeg";

  return (
    <div
      ref={rowRef}
      className={`flex relative flex-col ${!isOdd ? "md:flex-row-reverse" : "md:flex-row"} p-8 md:p-20 items-center bg-fixed justify-center md:justify-between min-h-[75vh] md:h-screen w-full text-secondary overflow-hidden`}
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className={`absolute top-0 left-0 w-full h-full ${isOdd ? "bg-primary/55" : "bg-secondary/55"}`} />

      {/* Glassmorphic Text Container */}
      <div
        ref={textColRef}
        className={`w-full min-h-[35vh] md:h-auto md:w-5/12 rounded-3xl backdrop-blur-2xl text-center md:text-left ${
          !isOdd ? "bg-primary/75 text-secondary border border-white/10" : "bg-secondary/85 text-primary border border-primary/10"
        } flex flex-col justify-center p-8 md:p-12 relative z-10 shadow-2xl space-y-6`}
      >
        <div className="relative z-10 space-y-4">
          <span
            ref={eyebrowRef}
            className={`block text-xs md:text-sm font-serif font-bold uppercase tracking-[0.2em] ${
              !isOdd ? "text-accent" : "text-[#0e3b2e]"
            }`}
          >
            {volume.acf?.hero?.eyebrow || "Archery Volume"}
          </span>

          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold font-serif leading-tight">
            {title}
          </h2>

          <div
            ref={descRef}
            className="text-sm md:text-base font-light leading-relaxed space-y-2 [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* Unordered List of Key Bullets */}
          {bullets.length > 0 && (
            <ul ref={bulletsRef} className="space-y-2.5 pt-2 text-left">
              {bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-center gap-2.5 text-xs md:text-sm font-medium font-sans">
                  <span className={`w-1.5 h-1.5 rotate-45 shrink-0 ${isOdd ? "bg-accent" : "bg-[#0e3b2e]"}`} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Action Button */}
          <div ref={buttonsRef} className="mt-8 flex items-center relative z-10 pt-2">
            <Button
              href={`/knowledge/${volume.slug}`}
              variant={isOdd ? "accent" : "primary"}
            >
              {volume.acf?.card_button_text || "Explore Editorial"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpeditionRegions = () => {
  const [volumes, setVolumes] = useState<EditorialItem[]>(INITIAL_BASE_VOLUMES);

  useEffect(() => {
    const fetchBaseVolumes = async () => {
      try {
        const res = await fetch("/api/editorial?parent=0");
        if (res.ok) {
          const data: EditorialItem[] = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setVolumes(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live base editorial volumes:", err);
      }
    };

    fetchBaseVolumes();
  }, []);

  return (
    <section className="w-full flex flex-col">
      {volumes.map((volume, index) => (
        <RegionRow
          key={volume.id || index}
          volume={volume}
          index={index}
        />
      ))}
    </section>
  );
};

export default ExpeditionRegions;