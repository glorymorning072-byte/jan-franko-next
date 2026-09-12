import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { MASTER_BOWYERS } from "@/data/bowyers";
import CommissionForm from "@/components/equipment/CommissionForm";

export const metadata: Metadata = {
  title: "Master Bowyers | Warrick Harvey, MR Bows & Kadys Bows",
  description: "Sourced profiles and direct commission requests for Warrick Harvey, MR Bows by Miško Rovčanin, and Kadys Bows by Sergey Tolochko.",
};

export default function MasterBowyersPage() {
  return (
    <main className="min-h-screen bg-[#f0e9d9] text-[#0e3b2e]">
      <header className="bg-[#0e3b2e] px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880]">Master Bowyers</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-6xl">Three craftsmen. Three sourced profiles. One direct commission route.</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75">Every profile below uses the bowyer’s real name, documented story, real workshop or product photography, and official website as its source. Names and brands are protected from automated translation.</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="publishing-standard">
        <div className="rounded-3xl border border-[#0e3b2e]/10 bg-white p-6 sm:p-10">
          <h2 id="publishing-standard" className="font-serif text-3xl font-bold">Publishing standard</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Real product and workshop photography—never stock or AI imagery.", "Exact names, stories, materials, and models from the supplied implementation guide.", "Each bowyer has an individual profile connected to the same transparent commission process."].map((item) => <p key={item} className="flex gap-3 text-sm leading-relaxed text-[#0e3b2e]/75"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8a6a3f]" />{item}</p>)}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {MASTER_BOWYERS.map((bowyer) => (
            <article key={bowyer.slug} className="flex overflow-hidden rounded-3xl border border-[#0e3b2e]/10 bg-white shadow-sm">
              <div className="flex w-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0e3b2e]/10">
                  <Image src={bowyer.photos[0].src} alt={bowyer.photos[0].alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 hover:scale-[1.02]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="notranslate text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a3f]" translate="no" data-protected-name>{bowyer.brand}</p>
                  <h2 className="notranslate mt-2 font-serif text-3xl font-bold" translate="no" data-protected-name>{bowyer.bowyerName}</h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#0e3b2e]/70">{bowyer.introduction}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link href={`/bowyer/${bowyer.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0e3b2e] px-5 text-xs font-bold uppercase tracking-wider text-white">Full profile <ArrowRight className="h-4 w-4" /></Link>
                    <a href={bowyer.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 px-2 text-xs font-bold underline underline-offset-4">Official site <ExternalLink className="h-3.5 w-3.5" /></a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16"><CommissionForm /></div>
      </section>
    </main>
  );
}
