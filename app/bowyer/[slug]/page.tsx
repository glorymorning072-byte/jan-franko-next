import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import CommissionForm from "@/components/equipment/CommissionForm";
import { findMasterBowyer, MASTER_BOWYERS } from "@/data/bowyers";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MASTER_BOWYERS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bowyer = findMasterBowyer(slug);
  if (!bowyer) return { title: "Master Bowyer Not Found" };
  return {
    title: `${bowyer.bowyerName} — ${bowyer.brand} | Master Bowyer`,
    description: bowyer.introduction,
    openGraph: { images: [{ url: bowyer.photos[0].src, alt: bowyer.photos[0].alt }] },
  };
}

export default async function BowyerProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const bowyer = findMasterBowyer(slug);
  if (!bowyer) notFound();
  if (slug !== bowyer.slug) permanentRedirect(`/bowyer/${bowyer.slug}`);

  return (
    <main className="min-h-screen bg-[#f0e9d9] text-[#0e3b2e]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Link href="/about/partners" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider"><ArrowLeft className="h-4 w-4" />All Master Bowyers</Link>
      </div>

      <header className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#0e3b2e]/10 shadow-xl">
            <Image src={bowyer.photos[0].src} alt={bowyer.photos[0].alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-xs text-[#0e3b2e]/60">{bowyer.photos[0].caption}</figcaption>
        </figure>
        <div>
          <p className="notranslate text-xs font-bold uppercase tracking-[0.2em] text-[#8a6a3f]" translate="no" data-protected-name>{bowyer.brand}</p>
          <h1 className="notranslate mt-3 font-serif text-5xl font-bold leading-none sm:text-7xl" translate="no" data-protected-name>{bowyer.bowyerName}</h1>
          <p className="mt-5 text-sm font-semibold text-[#0e3b2e]/65">{bowyer.location}</p>
          <p className="mt-6 text-base leading-relaxed text-[#0e3b2e]/75">{bowyer.introduction}</p>
          <a href={bowyer.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0e3b2e]/20 px-5 text-xs font-bold uppercase tracking-wider">{bowyer.sourceLabel}<ExternalLink className="h-4 w-4" /></a>
        </div>
      </header>

      <div className="bg-white/60">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <section aria-labelledby="story-heading" className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6a3f]">In the bowyer’s words</p><h2 id="story-heading" className="mt-2 font-serif text-4xl font-bold">The story</h2></div>
            <blockquote className="border-l-2 border-[#c5a880] pl-6 font-serif text-xl leading-relaxed text-[#0e3b2e]/85 sm:text-2xl">{bowyer.story}</blockquote>
          </section>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl border border-[#0e3b2e]/10 bg-white p-6 sm:p-8"><h2 className="font-serif text-3xl font-bold">Background</h2><ul className="mt-6 space-y-4">{bowyer.background.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#0e3b2e]/75"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a6a3f]" />{item}</li>)}</ul></section>
            <section className="rounded-3xl border border-[#0e3b2e]/10 bg-white p-6 sm:p-8"><h2 className="font-serif text-3xl font-bold">Materials &amp; construction</h2>{bowyer.materials.length ? <ul className="mt-6 space-y-4">{bowyer.materials.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#0e3b2e]/75"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a6a3f]" />{item}</li>)}</ul> : <p className="mt-6 text-sm leading-relaxed text-[#0e3b2e]/70">Materials and final construction are confirmed directly for each model and commission through the bowyer’s current specification. No generic material claims have been substituted.</p>}</section>
          </div>

          {bowyer.models.length > 0 && <section className="mt-16" aria-labelledby="models-heading"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6a3f]">Documented range</p><h2 id="models-heading" className="mt-2 font-serif text-4xl font-bold">Signature models</h2><div className="mt-7 grid gap-5 sm:grid-cols-2">{bowyer.models.map((model) => <article key={model.name} className="rounded-2xl border border-[#0e3b2e]/10 bg-white p-6"><h3 className="notranslate font-serif text-2xl font-bold" translate="no">{model.name}</h3><p className="mt-3 text-sm leading-relaxed text-[#0e3b2e]/70">{model.description}</p></article>)}</div></section>}

          <section className="mt-16" aria-labelledby="gallery-heading"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6a3f]">Real work</p><h2 id="gallery-heading" className="mt-2 font-serif text-4xl font-bold">Workshop &amp; product photography</h2><div className="mt-7 grid gap-6 sm:grid-cols-2">{bowyer.photos.slice(1).map((photo) => <figure key={photo.src}><div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0e3b2e]/10"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div><figcaption className="mt-3 text-xs leading-relaxed text-[#0e3b2e]/60">{photo.caption}</figcaption></figure>)}</div></section>

          <p className="mt-10 rounded-2xl border border-[#0e3b2e]/10 bg-[#f0e9d9] p-5 text-xs leading-relaxed text-[#0e3b2e]/65">Content source: the Master Bowyers Implementation Guide supplied by Jan Franko and the bowyer’s official website linked above. The unverified television/commercial-diver claim about Warrick Harvey is intentionally omitted.</p>
          <div className="mt-16"><CommissionForm bowyer={`${bowyer.bowyerName} — ${bowyer.brand}`} heading={`Commission a bow from ${bowyer.bowyerName}`} /></div>
        </div>
      </div>
    </main>
  );
}
