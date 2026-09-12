import React from "react";
import { notFound, redirect } from "next/navigation";
import AcademyPage, { generateMetadata as academyGenerateMetadata } from "../academy/[slug]/page";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Known alias mapping to academy slugs
const ALIAS_MAP: Record<string, string> = {
  "certification": "certification",
  "explorer-rank-system": "explorer-rank-system",
  "rank-system": "explorer-rank-system",
  "code-of-conduct": "code-of-conduct",
  "summit-protocol": "summit-protocol",
  "environmental-stress-index": "environmental-stress-index-esi",
  "environmental-stress-index-esi": "environmental-stress-index-esi",
  "esi": "environmental-stress-index-esi",
  "the-academy": "the-academy",
  "explorer-path": "explorer-path"
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (ALIAS_MAP[slug]) {
    return academyGenerateMetadata({ params: Promise.resolve({ slug: ALIAS_MAP[slug] }) });
  }

  // Fallback metadata for WordPress pages
  try {
    const res = await fetch(`https://janfranko.com/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const pages = await res.json();
      if (Array.isArray(pages) && pages.length > 0) {
        const p = pages[0];
        const title = p.title?.rendered?.replace(/&#8211;/g, "–").replace(/&amp;/g, "&") || "Jan Franko Archery";
        return {
          title: `${title} | Traditional Archery Academy`,
          description: p.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim().substring(0, 160) || "Jan Franko Traditional Archery Academy"
        };
      }
    }
  } catch (err) {
    // Ignore
  }

  return {
    title: "Page | Traditional Archery Academy"
  };
}

export default async function RootSlugAliasPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. If it's a known academy alias, 301 redirect to canonical /academy/ route
  if (slug === "the-academy") {
    redirect("/academy");
  }
  if (ALIAS_MAP[slug]) {
    redirect(`/academy/${ALIAS_MAP[slug]}`);
  }

  // 2. Archery games fallback
  if (slug === "archery-games") {
    redirect("/archery-games");
  }

  // 3. General WordPress page query fallback
  let wordpressPageExists = false;
  try {
    const res = await fetch(`https://janfranko.com/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const pages = await res.json();
      if (Array.isArray(pages) && pages.length > 0) {
        wordpressPageExists = true;
      }
    }
  } catch (err) {
    // Ignore
  }

  if (wordpressPageExists) return <AcademyPage params={Promise.resolve({ slug })} />;

  notFound();
}
