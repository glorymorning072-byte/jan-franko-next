"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ChevronDown,
  Quote,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Award
} from "lucide-react";
import {
  EditorialBodySection,
  Intro7525Section,
  SideBySideSection,
  CenteredBreakoutSection,
  EditorialTimelineSection,
  InfoBoxX3Section,
  EditorialAccordionSection,
  FeatureMatrixX4Section,
  OversizedStatSection,
  FullBleedFeatureSection,
  BackgroundStyle,
  ButtonGroupItem
} from "@/types/editorial";

// Helper to determine styling classes based on background_style
const getBgClasses = (style?: BackgroundStyle) => {
  switch (style) {
    case "slate-dark":
      return {
        section: "bg-[#0e3b2e] text-[#f0e9d9] border-t border-b border-accent/15",
        heading: "text-white",
        bodyText: "text-[#f0e9d9]/80",
        eyebrow: "text-accent",
        cardBg: "bg-white/5 border-white/10",
        cardText: "text-white",
        cardDesc: "text-[#f0e9d9]/70"
      };
    case "parchment-beige":
      return {
        section: "bg-[#f0e9d9] text-[#0e3b2e] border-t border-b border-primary/5",
        heading: "text-[#0e3b2e]",
        bodyText: "text-[#0e3b2e]/85",
        eyebrow: "text-[#7d603a]",
        cardBg: "bg-white border-primary/5",
        cardText: "text-[#0e3b2e]",
        cardDesc: "text-[#0e3b2e]/75"
      };
    case "clean-white":
    default:
      return {
        section: "bg-white text-[#0e3b2e] border-t border-b border-primary/5",
        heading: "text-[#0e3b2e]",
        bodyText: "text-[#0e3b2e]/85",
        eyebrow: "text-[#7d603a]",
        cardBg: "bg-[#f0e9d9]/50 border-primary/5",
        cardText: "text-[#0e3b2e]",
        cardDesc: "text-[#0e3b2e]/75"
      };
  }
};

const renderButtonGroup = (buttonGroup?: ButtonGroupItem[] | null) => {
  if (!buttonGroup || buttonGroup.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-4 pt-4">
      {buttonGroup.map((btn, i) => {
        const isPrimary = btn.style === "primary";
        let targetHref = btn.url || "#";
        
        // Normalize WordPress domain links to Next.js internal hierarchical routes
        if (targetHref.startsWith("https://janfranko.com") || targetHref.startsWith("http://janfranko.com")) {
          try {
            const urlObj = new URL(targetHref);
            const pathParts = urlObj.pathname.split("/").filter(Boolean).filter((p) => p !== "editorial");
            targetHref = pathParts.length > 0 ? `/knowledge/${pathParts.join("/")}` : "/knowledge";
          } catch (e) {
            targetHref = "/knowledge";
          }
        }

        return (
          <Link
            key={i}
            href={targetHref}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer ${
              isPrimary
                ? "bg-accent hover:bg-accent/90 text-[#0e3b2e]"
                : "bg-[#0e3b2e] hover:bg-[#071f18] text-[#f0e9d9] border border-white/10"
            }`}
          >
            <span>{btn.text}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        );
      })}
    </div>
  );
};

// 1. Intro 75 / 25 Layout
export const Intro7525Block = ({ section }: { section: Intro7525Section }) => {
  const styles = getBgClasses(section.background_style);
  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 ${styles.section}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main 75% column */}
        <div className="lg:col-span-8 space-y-6">
          {section.heading && (
            <h2 className={`text-3xl md:text-4xl font-serif font-bold tracking-tight ${styles.heading}`}>
              {section.heading}
            </h2>
          )}
          {section.main_text && (
            <div
              className={`font-sans text-sm md:text-base leading-relaxed space-y-4 ${styles.bodyText}`}
              dangerouslySetInnerHTML={{ __html: section.main_text }}
            />
          )}
          {renderButtonGroup(section.button_group)}
        </div>

        {/* Sidebar 25% stats column */}
        <div className={`lg:col-span-4 p-6 md:p-8 rounded-3xl border shadow-sm space-y-6 ${styles.cardBg}`}>
          {section.sidebar_eyebrow && (
            <h4 className={`text-xs font-serif font-bold uppercase tracking-widest border-b pb-2.5 ${styles.eyebrow} border-current/10`}>
              {section.sidebar_eyebrow}
            </h4>
          )}
          {section.quick_stats && section.quick_stats.length > 0 && (
            <div className="space-y-4">
              {section.quick_stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold block">
                    {stat.label}
                  </span>
                  <span className={`text-sm md:text-base font-serif font-bold ${styles.cardText}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// 2. Side By Side Layout
export const SideBySideBlock = ({ section }: { section: SideBySideSection }) => {
  const styles = getBgClasses(section.background_style);
  const isImageRight = section.image_alignment === "right";

  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 ${styles.section}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Image Column */}
        <div
          className={`lg:col-span-5 relative aspect-4/3 w-full rounded-3xl overflow-hidden shadow-xl border border-current/10 bg-primary/10 ${
            isImageRight ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {section.image_external_url ? (
            <Image
              src={section.image_external_url}
              alt={section.title || "Editorial illustration"}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover hover:scale-102 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-accent/40">
              <Compass className="w-12 h-12" />
            </div>
          )}
        </div>

        {/* Text Column */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            isImageRight ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="space-y-2">
            {section.eyebrow && (
              <span className={`text-[10px] font-serif uppercase tracking-widest font-bold block ${styles.eyebrow}`}>
                {section.eyebrow}
              </span>
            )}
            {section.title && (
              <h3 className={`text-2xl md:text-3xl font-serif font-bold tracking-tight leading-snug ${styles.heading}`}>
                {section.title}
              </h3>
            )}
          </div>
          {section.text_content && (
            <div
              className={`font-sans text-sm md:text-base leading-relaxed space-y-4 ${styles.bodyText}`}
              dangerouslySetInnerHTML={{ __html: section.text_content }}
            />
          )}
          {renderButtonGroup(section.button_group)}
        </div>
      </div>
    </section>
  );
};

// 3. Centered Breakout Quote Layout
export const CenteredBreakoutBlock = ({ section }: { section: CenteredBreakoutSection }) => {
  const styles = getBgClasses(section.background_style);
  return (
    <section className={`py-20 md:py-28 px-6 md:px-12 text-center relative overflow-hidden ${styles.section}`}>
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <Quote className="w-10 h-10 text-accent/30 mx-auto" />
        {section.quote_text && (
          <blockquote className={`text-xl md:text-3xl font-serif italic leading-relaxed tracking-tight ${styles.heading}`}>
            “{section.quote_text}”
          </blockquote>
        )}
        {section.attribution && (
          <div className="pt-2">
            <cite className="not-italic text-xs font-serif uppercase tracking-widest text-accent font-bold">
              — {section.attribution}
            </cite>
          </div>
        )}
        {renderButtonGroup(section.button_group)}
      </div>
    </section>
  );
};

// 4. Timeline Milestones Layout
export const EditorialTimelineBlock = ({ section }: { section: EditorialTimelineSection }) => {
  const styles = getBgClasses(section.background_style);
  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 ${styles.section}`}>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          {section.eyebrow && (
            <span className={`text-[10px] font-serif uppercase tracking-widest font-bold ${styles.eyebrow}`}>
              {section.eyebrow}
            </span>
          )}
          {section.heading && (
            <h2 className={`text-2xl md:text-4xl font-serif font-bold tracking-tight ${styles.heading}`}>
              {section.heading}
            </h2>
          )}
          <div className="w-12 h-[1px] bg-accent/40 mx-auto mt-3" />
        </div>

        {section.milestones && section.milestones.length > 0 && (
          <div className="relative border-l-2 border-accent/30 pl-6 md:pl-8 ml-4 md:ml-8 space-y-8">
            {section.milestones.map((m, i) => (
              <div key={i} className="relative group">
                <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0e3b2e] border-2 border-accent group-hover:scale-125 transition-transform" />
                <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${styles.cardBg}`}>
                  {m.time_marker && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">
                      {m.time_marker}
                    </span>
                  )}
                  {m.title && (
                    <h4 className={`font-serif text-base font-bold ${styles.cardText}`}>
                      {m.title}
                    </h4>
                  )}
                  {m.description && (
                    <div
                      className={`text-xs md:text-sm font-sans leading-relaxed ${styles.cardDesc}`}
                      dangerouslySetInnerHTML={{ __html: m.description || "" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {renderButtonGroup(section.button_group)}
      </div>
    </section>
  );
};

// 5. Info Box x3 Layout
export const InfoBoxX3Block = ({ section }: { section: InfoBoxX3Section }) => {
  const styles = getBgClasses(section.background_style);
  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 ${styles.section}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          {section.eyebrow && (
            <span className={`text-[10px] font-serif uppercase tracking-widest font-bold ${styles.eyebrow}`}>
              {section.eyebrow}
            </span>
          )}
          {section.heading && (
            <h2 className={`text-2xl md:text-4xl font-serif font-bold tracking-tight ${styles.heading}`}>
              {section.heading}
            </h2>
          )}
          <div className="w-12 h-[1px] bg-accent/40 mx-auto mt-3" />
        </div>

        {section.boxes && section.boxes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.boxes.map((box, i) => (
              <div key={i} className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 flex flex-col justify-between hover:border-accent/40 transition-all ${styles.cardBg}`}>
                <div className="space-y-3">
                  {box.tag && (
                    <span className="inline-block px-3 py-1 bg-accent/15 border border-accent/30 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-accent">
                      {box.tag}
                    </span>
                  )}
                  {box.title && (
                    <h4 className={`text-lg font-serif font-bold leading-snug ${styles.cardText}`}>
                      {box.title}
                    </h4>
                  )}
                  {box.description && (
                    <div
                      className={`text-xs md:text-sm font-sans leading-relaxed ${styles.cardDesc}`}
                      dangerouslySetInnerHTML={{ __html: box.description || "" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {renderButtonGroup(section.button_group)}
      </div>
    </section>
  );
};

// 6. Editorial Accordion Layout
export const EditorialAccordionBlock = ({ section }: { section: EditorialAccordionSection }) => {
  const styles = getBgClasses(section.background_style);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 ${styles.section}`}>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          {section.eyebrow && (
            <span className={`text-[10px] font-serif uppercase tracking-widest font-bold ${styles.eyebrow}`}>
              {section.eyebrow}
            </span>
          )}
          {section.heading && (
            <h2 className={`text-2xl md:text-4xl font-serif font-bold tracking-tight ${styles.heading}`}>
              {section.heading}
            </h2>
          )}
          <div className="w-12 h-[1px] bg-accent/40 mx-auto mt-3" />
        </div>

        {section.items && section.items.length > 0 && (
          <div className="space-y-4">
            {section.items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={`border rounded-2xl overflow-hidden transition-all shadow-sm ${styles.cardBg}`}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm md:text-base cursor-pointer"
                  >
                    <span className={styles.cardText}>{item.trigger}</span>
                    <ChevronDown className={`w-4 h-4 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-current/5">
                      <div
                        className={`text-xs md:text-sm font-sans leading-relaxed ${styles.cardDesc}`}
                        dangerouslySetInnerHTML={{ __html: item.panel || "" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {renderButtonGroup(section.button_group)}
      </div>
    </section>
  );
};

// 7. Feature Matrix x4 Layout
export const FeatureMatrixX4Block = ({ section }: { section: FeatureMatrixX4Section }) => {
  const styles = getBgClasses(section.background_style);
  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 ${styles.section}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          {section.eyebrow && (
            <span className={`text-[10px] font-serif uppercase tracking-widest font-bold ${styles.eyebrow}`}>
              {section.eyebrow}
            </span>
          )}
          {section.heading && (
            <h2 className={`text-2xl md:text-4xl font-serif font-bold tracking-tight ${styles.heading}`}>
              {section.heading}
            </h2>
          )}
          <div className="w-12 h-[1px] bg-accent/40 mx-auto mt-3" />
        </div>

        {section.columns && section.columns.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.columns.map((col, i) => (
              <div key={i} className={`p-6 rounded-2xl border shadow-sm space-y-3 flex flex-col justify-between hover:border-accent/40 transition-all ${styles.cardBg}`}>
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center font-mono text-accent text-xs font-bold">
                    0{i + 1}
                  </div>
                  <h4 className={`text-base font-serif font-bold leading-snug ${styles.cardText}`}>
                    {col.title}
                  </h4>
                  {col.desc && (
                    <div
                      className={`text-xs font-sans leading-relaxed ${styles.cardDesc}`}
                      dangerouslySetInnerHTML={{ __html: col.desc || "" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {renderButtonGroup(section.button_group)}
      </div>
    </section>
  );
};

// 8. Oversized Stat Layout
export const OversizedStatBlock = ({ section }: { section: OversizedStatSection }) => {
  const styles = getBgClasses(section.background_style);
  return (
    <section className={`py-20 md:py-28 px-6 md:px-12 text-center ${styles.section}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {section.stat_number && (
          <div className="text-6xl md:text-8xl font-serif font-bold text-accent tracking-tighter drop-shadow-sm">
            {section.stat_number}
          </div>
        )}
        {section.stat_label && (
          <h3 className={`text-xl md:text-2xl font-serif font-bold uppercase tracking-wider ${styles.heading}`}>
            {section.stat_label}
          </h3>
        )}
        {section.description && (
          <div
            className={`text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed space-y-2 ${styles.bodyText}`}
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        )}
        {renderButtonGroup(section.button_group)}
      </div>
    </section>
  );
};

// 9. Full Bleed Feature Layout
export const FullBleedFeatureBlock = ({ section }: { section: FullBleedFeatureSection }) => {
  const hasImage = Boolean(section.background_image_external_url);
  const styles = getBgClasses(section.background_style);

  return (
    <section
      className={`relative w-full py-28 md:py-36 px-6 md:px-12 flex items-center justify-center text-center overflow-hidden border-t border-b ${
        hasImage ? "bg-[#0e3b2e] text-white border-accent/20" : styles.section
      }`}
    >
      {/* Background Image */}
      {hasImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={section.background_image_external_url!}
            alt={section.heading || "Feature landscape"}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0e3b2e]/85 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto space-y-6 ${hasImage ? "text-white" : ""}`}>
        {section.eyebrow && (
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-serif font-semibold tracking-widest uppercase ${
              hasImage ? "bg-accent/15 border border-accent/30 text-accent" : `${styles.cardBg} ${styles.eyebrow}`
            }`}
          >
            {section.eyebrow}
          </span>
        )}
        {section.heading && (
          <h2
            className={`text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight ${
              hasImage ? "text-white" : styles.heading
            }`}
          >
            {section.heading}
          </h2>
        )}
        {section.description && (
          <div
            className={`text-base md:text-lg font-sans font-light max-w-2xl mx-auto leading-relaxed space-y-2 ${
              hasImage ? "text-white/85" : styles.bodyText
            }`}
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        )}
        {renderButtonGroup(section.button_group)}
      </div>
    </section>
  );
};

// Master Section Dispatcher
export const EditorialSectionRenderer = ({ section }: { section: EditorialBodySection }) => {
  switch (section.acf_fc_layout) {
    case "intro_75_25":
      return <Intro7525Block section={section} />;
    case "side_by_side":
      return <SideBySideBlock section={section} />;
    case "centered_breakout":
      return <CenteredBreakoutBlock section={section} />;
    case "editorial_timeline":
      return <EditorialTimelineBlock section={section} />;
    case "info_box_x3":
      return <InfoBoxX3Block section={section} />;
    case "editorial_accordion":
      return <EditorialAccordionBlock section={section} />;
    case "feature_matrix_x4":
      return <FeatureMatrixX4Block section={section} />;
    case "oversized_stat":
      return <OversizedStatBlock section={section} />;
    case "full_bleed_feature":
      return <FullBleedFeatureBlock section={section} />;
    default:
      return null;
  }
};
