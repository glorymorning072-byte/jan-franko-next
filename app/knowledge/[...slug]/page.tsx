import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Compass, ArrowRight } from "lucide-react";
import { EditorialItem } from "@/types/editorial";
import { EditorialSectionRenderer } from "@/components/Editorial/EditorialSectionRenderer";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

async function getEditorialByPath(slugSegments: string[]): Promise<{
  article: EditorialItem | null;
  parentVolume: EditorialItem | null;
}> {
  try {
    if (!slugSegments || slugSegments.length === 0) {
      return { article: null, parentVolume: null };
    }

    // 1. Single Segment Path: /knowledge/[slug] (e.g. /knowledge/east-archery or /knowledge/bhutan-expedition)
    if (slugSegments.length === 1) {
      const slug = slugSegments[0];
      const res = await fetch(`https://janfranko.com/wp-json/wp/v2/editorial?slug=${encodeURIComponent(slug)}&per_page=10`, {
        next: { revalidate: 600 }
      });
      if (!res.ok) return { article: null, parentVolume: null };
      const data: EditorialItem[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) return { article: null, parentVolume: null };

      // Prioritize Base Level volume (parent === 0)
      const baseVolume = data.find((item) => item.parent === 0);
      const article = baseVolume || data[0];

      let parentVolume: EditorialItem | null = null;
      if (article.parent !== 0) {
        const parentRes = await fetch(`https://janfranko.com/wp-json/wp/v2/editorial/${article.parent}`, {
          next: { revalidate: 600 }
        });
        if (parentRes.ok) {
          parentVolume = await parentRes.json();
        }
      }

      return { article, parentVolume };
    }

    // 2. Hierarchical Multi-Segment Path: /knowledge/[parentSlug]/[childSlug]
    // (e.g. /knowledge/bhutan-expedition/geography or /knowledge/mongolia-expedition/horse-culture)
    if (slugSegments.length >= 2) {
      const parentSlug = slugSegments[0];
      const childSlug = slugSegments[1];

      // Step A: Find the parent volume by parentSlug
      const parentRes = await fetch(`https://janfranko.com/wp-json/wp/v2/editorial?slug=${encodeURIComponent(parentSlug)}&per_page=10`, {
        next: { revalidate: 600 }
      });
      let parentVolume: EditorialItem | null = null;
      if (parentRes.ok) {
        const parentData: EditorialItem[] = await parentRes.json();
        if (Array.isArray(parentData) && parentData.length > 0) {
          parentVolume = parentData.find((p) => p.parent === 0) || parentData[0];
        }
      }

      // Step B: Query the child chapter using parent ID and child slug
      if (parentVolume) {
        const childRes = await fetch(
          `https://janfranko.com/wp-json/wp/v2/editorial?slug=${encodeURIComponent(childSlug)}&parent=${parentVolume.id}`,
          { next: { revalidate: 600 } }
        );
        if (childRes.ok) {
          const childData: EditorialItem[] = await childRes.json();
          if (Array.isArray(childData) && childData.length > 0) {
            return { article: childData[0], parentVolume };
          }
        }
      }

      // Step C: Fallback to direct child slug search if parent lookup differed
      const fallbackRes = await fetch(`https://janfranko.com/wp-json/wp/v2/editorial?slug=${encodeURIComponent(childSlug)}&per_page=10`, {
        next: { revalidate: 600 }
      });
      if (fallbackRes.ok) {
        const fallbackData: EditorialItem[] = await fallbackRes.json();
        if (Array.isArray(fallbackData) && fallbackData.length > 0) {
          const article = fallbackData[0];
          if (!parentVolume && article.parent) {
            const pRes = await fetch(`https://janfranko.com/wp-json/wp/v2/editorial/${article.parent}`, {
              next: { revalidate: 600 }
            });
            if (pRes.ok) parentVolume = await pRes.json();
          }
          return { article, parentVolume };
        }
      }

      return { article: null, parentVolume: null };
    }

    return { article: null, parentVolume: null };
  } catch (err) {
    console.error("Error fetching editorial by path:", err);
    return { article: null, parentVolume: null };
  }
}

async function getChildChapters(parentId: number): Promise<EditorialItem[]> {
  try {
    const res = await fetch(`https://janfranko.com/wp-json/wp/v2/editorial?parent=${parentId}&per_page=50`, {
      next: { revalidate: 600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getEditorialByPath(slug);
  if (!article) return { title: "Knowledge Archive | Jan Franko" };

  const title = article.acf?.hero?.heading || article.acf?.card_title || article.title?.rendered;
  const description =
    article.acf?.card_description || article.acf?.hero?.description?.replace(/<[^>]*>/g, "") || "Field monograph and archery lore.";

  return {
    title: `${title} | Knowledge - Jan Franko`,
    description,
    openGraph: {
      title: `${title} | Knowledge - Jan Franko`,
      description,
      images: article.acf?.hero?.image_external_url ? [{ url: article.acf.hero.image_external_url }] : [],
    }
  };
}

export default async function KnowledgeHierarchicalPage({ params }: PageProps) {
  const { slug } = await params;
  const { article, parentVolume } = await getEditorialByPath(slug);

  if (!article) {
    notFound();
  }

  // If a single slug was requested (e.g. /knowledge/geography) and it is actually
  // a child monograph of a parent volume, automatically redirect to canonical hierarchical URL
  if (slug.length === 1 && article.parent !== 0 && parentVolume) {
    redirect(`/knowledge/${parentVolume.slug}/${article.slug}`);
  }

  const isBaseVolume = article.parent === 0;
  const childChapters = isBaseVolume ? await getChildChapters(article.id) : [];

  const hero = article.acf?.hero;
  const sections = article.acf?.body_sections || [];
  const finalCta = article.acf?.final_cta;
  const bullets = [
    article.acf?.card_bullet_1,
    article.acf?.card_bullet_2,
    article.acf?.card_bullet_3
  ].filter(Boolean) as string[];

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative">
      {/* Floating Back Anchor & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#7d603a] hover:text-primary transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Knowledge Hub
        </Link>
        {parentVolume && (
          <Link
            href={`/knowledge/${parentVolume.slug}`}
            className="text-xs font-serif uppercase tracking-wider text-accent hover:underline hidden sm:inline"
          >
            Lineage: {parentVolume.title?.rendered}
          </Link>
        )}
      </div>

      {/* 1. Hero Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Hero Image */}
        <div className="lg:col-span-5 relative aspect-4/3 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-primary/10">
          {hero?.image_external_url ? (
            <Image
              src={hero.image_external_url}
              alt={hero.heading || article.title?.rendered}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-accent/40">
              <Compass className="w-16 h-16" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            {hero?.eyebrow && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#c5a880]/15 border border-[#c5a880]/35 rounded-full text-xs font-serif font-semibold tracking-widest uppercase text-[#7d603a]">
                <Compass className="w-3.5 h-3.5 text-accent" />
                {hero.eyebrow}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary tracking-tight leading-tight">
              {hero?.heading || article.acf?.card_title || article.title?.rendered}
            </h1>
          </div>

          <div className="w-16 h-[1.5px] bg-[#c5a880]/40" />

          {hero?.description ? (
            <div
              className="text-sm md:text-base text-primary/85 font-sans leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: hero.description }}
            />
          ) : article.acf?.card_description ? (
            <p className="text-sm md:text-base text-primary/85 font-sans leading-relaxed">
              {article.acf.card_description}
            </p>
          ) : null}

          {/* Key Bullets List */}
          {bullets.length > 0 && (
            <ul className="space-y-2 pt-2">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium text-[#7d603a]">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 2. Flexible Content Sections */}
      <div className="w-full">
        {sections.map((sec, index) => (
          <EditorialSectionRenderer key={index} section={sec} />
        ))}
      </div>

      {/* 3. If Base Level Volume, display its Child Chapters at the bottom as Keep Reading with hierarchical links */}
      {isBaseVolume && childChapters.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-primary/10 space-y-10">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-[#7d603a] font-bold block">
              Keep Reading
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary tracking-tight">
              Monograph Chapters in this Lineage ({childChapters.length})
            </h2>
            <p className="text-xs md:text-sm text-primary/70 font-sans max-w-2xl">
              Explore tactical field manuals and historical monographs associated with this expedition volume.
            </p>
            <div className="w-12 h-[1px] bg-accent/40 mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {childChapters.map((chapter, idx) => {
              const chapterTitle = chapter.acf?.card_title || chapter.title?.rendered;
              const chapterDesc = chapter.acf?.card_description || chapter.acf?.hero?.description?.replace(/<[^>]*>/g, "");
              // Hierarchical URL: /knowledge/[parentSlug]/[childSlug]
              const chapterHref = `/knowledge/${article.slug}/${chapter.slug}`;

              return (
                <Link
                  key={chapter.id}
                  href={chapterHref}
                  className="group bg-white border border-primary/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300 flex flex-col justify-between h-[250px] cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                        Chapter 0{idx + 1}
                      </span>
                      {chapter.acf?.hero?.eyebrow && (
                        <span className="text-[9px] font-serif font-bold uppercase tracking-wider text-[#7d603a] px-2.5 py-0.5 bg-secondary rounded-full border border-primary/5 line-clamp-1 max-w-[160px]">
                          {chapter.acf.hero.eyebrow}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-serif font-bold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {chapterTitle}
                    </h3>

                    {chapterDesc && (
                      <p className="text-xs text-primary/75 font-sans leading-relaxed line-clamp-3">
                        {chapterDesc}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-primary/5 pt-3.5 flex items-center justify-between text-[10px] font-serif uppercase tracking-widest font-bold text-accent group-hover:translate-x-1 transition-transform">
                    <span>{chapter.acf?.card_button_text || "Read Monograph"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Final Call to Action Box */}
      {finalCta && (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="bg-[#0e3b2e] rounded-3xl p-8 md:p-14 text-white text-center shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.1),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
              {finalCta.eyebrow && (
                <span className="text-[10px] font-serif uppercase tracking-widest text-accent font-bold">
                  {finalCta.eyebrow}
                </span>
              )}
              {finalCta.heading && (
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
                  {finalCta.heading}
                </h3>
              )}
              {finalCta.description && (
                <div
                  className="text-xs md:text-sm text-white/80 font-sans leading-relaxed max-w-2xl mx-auto space-y-2 [&_p]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: finalCta.description }}
                />
              )}
            </div>

            {finalCta.button_group && finalCta.button_group.length > 0 && (
              <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-2">
                {finalCta.button_group.map((btn, i) => (
                  <Link
                    key={i}
                    href={btn.url.startsWith("http") ? "/knowledge" : btn.url}
                    className={`px-6 py-3 rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md ${
                      btn.style === "primary"
                        ? "bg-accent hover:bg-accent/90 text-[#0e3b2e]"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                    }`}
                  >
                    {btn.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
