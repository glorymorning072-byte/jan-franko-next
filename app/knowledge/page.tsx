import React from "react";
import { EditorialItem } from "@/types/editorial";
import KnowledgeClientDirectory from "@/components/Editorial/KnowledgeClientDirectory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge & Field Lineages | Traditional Archery - Jan Franko",
  description:
    "Authoritative field volumes, biomechanical orientation guides, and historical martial lineages preserving the global tradition of the bow.",
  openGraph: {
    title: "Knowledge & Field Lineages | Traditional Archery - Jan Franko",
    description:
      "Authoritative field volumes, biomechanical orientation guides, and historical martial lineages preserving the global tradition of the bow.",
  }
};

async function getEditorials(): Promise<EditorialItem[]> {
  try {
    const res = await fetch("https://janfranko.com/wp-json/wp/v2/editorial?per_page=100", {
      next: { revalidate: 600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to load knowledge archives on server:", err);
    return [];
  }
}

export default async function KnowledgePage() {
  const editorials = await getEditorials();
  return <KnowledgeClientDirectory initialEditorials={editorials} />;
}
