"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, ExternalLink, ImageOff, Mail, ShieldCheck } from "lucide-react";
import { BOW_REVIEW_BY_SLUG, FALLBACK_EQUIPMENT_PRODUCTS, type EquipmentProduct } from "@/data/equipment";
import { SITE } from "@/data/site";

const cleanText = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#8211;/g, "–").replace(/\s+/g, " ").trim();

function ControlledBowPage({ slug }: { slug: string }) {
  const review = BOW_REVIEW_BY_SLUG[slug];
  if (!review) return null;

  const isReference = review.publicationStatus === "reference-only";
  return (
    <main id="main-content" className="min-h-screen bg-[#f0e9d9] text-[#0e3b2e]">
      <section className="bg-[#0e3b2e] px-6 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl"><Link href="/equipment" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a880]"><ArrowLeft className="h-4 w-4" />Back to equipment</Link><p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a880]">{isReference ? "Source-backed reference · not for sale" : review.publicationStatus === "design-in-development" ? "Design in development" : "Listing withdrawn pending verification"}</p><h1 className="notranslate mt-3 font-serif text-4xl font-bold sm:text-6xl" translate="no">{review.title}</h1><p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/76 sm:text-base">{review.summary}</p></div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-[#0e3b2e]/25 bg-white p-7 text-center">
          <ImageOff className="h-10 w-10 text-[#7d603a]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-bold">No substitute image</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#0e3b2e]/65">{review.imageDecision}</p>
        </div>

        <div className="space-y-6">
          {review.facts ? (
            <article className="rounded-3xl border border-[#0e3b2e]/10 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#7d603a]" /><h2 className="font-serif text-2xl font-bold">Identification standard</h2></div>
              <ul className="mt-5 space-y-3">{review.facts.map((fact) => <li key={fact} className="flex gap-3 text-sm leading-relaxed text-[#0e3b2e]/75"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7d603a]" />{fact}</li>)}</ul>
            </article>
          ) : (
            <article className="rounded-3xl border border-amber-800/20 bg-amber-50 p-6 sm:p-8"><div className="flex items-center gap-2 text-amber-900"><AlertTriangle className="h-5 w-5" /><h2 className="font-serif text-2xl font-bold">Publication stopped</h2></div><p className="mt-4 text-sm leading-relaxed text-amber-950/75">No historical or performance description from the former listing is being carried forward. The page remains only as an explicit audit record so an old direct link cannot continue serving misleading content.</p></article>
          )}

          {review.sources && (
            <article className="rounded-3xl border border-[#0e3b2e]/10 bg-white p-6 sm:p-8"><h2 className="font-serif text-2xl font-bold">Sources used for this correction</h2><div className="mt-4 space-y-2">{review.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-3 rounded-xl border border-[#0e3b2e]/10 p-3 text-sm font-semibold text-[#7d603a] hover:border-[#7d603a]"><span>{source.label}</span><ExternalLink className="mt-0.5 h-4 w-4 shrink-0" /></a>)}</div></article>
          )}
        </div>
      </section>

      <section className="px-6 pb-16"><div className="mx-auto flex max-w-5xl flex-col justify-between gap-5 rounded-3xl bg-[#0e3b2e] p-7 text-white sm:flex-row sm:items-center"><div><h2 className="font-serif text-2xl font-bold">Verification before publication</h2><p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/70">Candidate photographs are reviewed by identity, construction, silhouette, source, and usage rights before this page can become a product listing.</p></div><Link href="/equipment/verification" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#c5a880] px-6 text-xs font-bold uppercase text-[#0e3b2e]">View full bow audit</Link></div></section>
    </main>
  );
}

export default function EquipmentProductPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const controlledReview = BOW_REVIEW_BY_SLUG[slug];
  const fallback = useMemo(() => FALLBACK_EQUIPMENT_PRODUCTS.find((item) => item.slug === slug) || null, [slug]);
  const [product, setProduct] = useState<EquipmentProduct | null>(fallback);
  const [refreshing, setRefreshing] = useState(!controlledReview);
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", destination: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });

  useEffect(() => {
    if (controlledReview) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);
    const load = async () => {
      try {
        const response = await fetch("/api/equipment/products", { signal: controller.signal });
        if (!response.ok) throw new Error("Catalog request failed.");
        const payload = await response.json();
        const found = Array.isArray(payload.products) ? payload.products.find((item: EquipmentProduct) => item.slug === slug && item.publicationStatus === "published") : null;
        if (found) setProduct(found);
        else if (!fallback) setNotFound(true);
      } catch {
        if (!fallback && !controller.signal.aborted) setNotFound(true);
      } finally {
        window.clearTimeout(timeout);
        setRefreshing(false);
      }
    };
    void load();
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [controlledReview, fallback, slug]);

  if (controlledReview) return <ControlledBowPage slug={slug} />;

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;
    setSubmitting(true);
    setFormStatus({ type: "", message: "" });
    try {
      const response = await fetch("/api/forms/equipment-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_url: window.location.href,
          fields: { product_name: product.title, full_name: form.fullName, email: form.email, phone: form.phone, shipping_destination: form.destination, message: form.message },
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || "Delivery could not be confirmed.");
      setFormStatus({ type: "success", message: payload.message || "Your inquiry was delivered." });
      setForm({ fullName: "", email: "", phone: "", destination: "", message: "" });
    } catch (error) {
      setFormStatus({ type: "error", message: error instanceof Error ? error.message : `Delivery could not be confirmed. Email ${SITE.email}.` });
    } finally {
      setSubmitting(false);
    }
  };

  if (!product && refreshing) return <main id="main-content" className="min-h-screen bg-[#f0e9d9] px-6 py-24"><div className="mx-auto h-96 max-w-5xl animate-pulse rounded-3xl bg-[#0e3b2e]/10" aria-label="Preparing product details" /></main>;
  if (!product || notFound) return <main id="main-content" className="min-h-screen bg-[#f0e9d9] px-6 py-24 text-center text-[#0e3b2e]"><h1 className="font-serif text-4xl font-bold">This item is not published</h1><p className="mx-auto mt-4 max-w-xl text-sm text-[#0e3b2e]/65">The catalog has no verified, public record for this URL.</p><Link href="/equipment" className="mt-6 inline-flex rounded-full bg-[#0e3b2e] px-6 py-3 text-xs font-bold uppercase text-white">Return to equipment</Link></main>;

  return (
    <main id="main-content" className="min-h-screen bg-[#f0e9d9] text-[#0e3b2e]">
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-16">
        <Link href="/equipment" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7d603a]"><ArrowLeft className="h-4 w-4" />Back to equipment</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden rounded-3xl border border-[#0e3b2e]/10 bg-white sm:min-h-[32rem]">{product.image ? <Image src={product.image} alt={product.imageAlt || product.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : <div className="flex h-full min-h-80 flex-col items-center justify-center p-8 text-center"><ImageOff className="h-10 w-10 text-[#7d603a]" /><p className="mt-3 text-sm text-[#0e3b2e]/60">No product image supplied; no generic substitute used.</p></div>}</div>
          <div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d603a]">{product.categoryLabel}</p><h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">{cleanText(product.title)}</h1><p className="mt-5 text-sm leading-7 text-[#0e3b2e]/72 sm:text-base">{cleanText(product.excerpt)}</p><dl className="mt-7 divide-y divide-[#0e3b2e]/10 border-y border-[#0e3b2e]/10 text-sm"><div className="flex justify-between gap-4 py-3"><dt className="text-[#0e3b2e]/55">Availability</dt><dd className="font-bold">{product.stockStatus === "in-stock" ? "In stock" : product.stockStatus === "out-of-stock" ? "Sold out" : "Confirmed during consultation"}</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-[#0e3b2e]/55">Price</dt><dd className="font-bold">{product.price && product.currency ? new Intl.NumberFormat("en", { style: "currency", currency: product.currency }).format(Number(product.price)) : "Manual quote"}</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-[#0e3b2e]/55">Photo record</dt><dd className="max-w-xs text-right text-xs">{product.provenance}</dd></div></dl>{product.purchasable && product.purchaseUrl ? <a href={product.purchaseUrl} className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[#0e3b2e] px-6 text-xs font-bold uppercase tracking-wider text-white">Add to cart</a> : <a href="#inquiry" className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[#0e3b2e] px-6 text-xs font-bold uppercase tracking-wider text-white">Request price and availability</a>}</div>
        </div>
      </section>

      <section id="inquiry" className="bg-[#0e3b2e] px-6 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c5a880]">Structured equipment inquiry</p><h2 className="mt-2 font-serif text-3xl font-bold">Request verified details</h2><p className="mt-4 text-sm leading-relaxed text-white/70">Price, stock, sizing, shipping, and suitability are confirmed before any payment. A submission is shown as successful only after the receiving server confirms delivery.</p><a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c5a880]"><Mail className="h-4 w-4" />{SITE.email}</a></div>
          <form onSubmit={submitInquiry} className="grid gap-4 rounded-3xl bg-white/5 p-5 sm:grid-cols-2 sm:p-7"><label className="text-xs font-bold">Full name *<input required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-white/10 px-3 font-normal text-white outline-none focus:border-[#c5a880]" /></label><label className="text-xs font-bold">Email *<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-white/10 px-3 font-normal text-white outline-none focus:border-[#c5a880]" /></label><label className="text-xs font-bold">Phone / WhatsApp<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-white/10 px-3 font-normal text-white outline-none focus:border-[#c5a880]" /></label><label className="text-xs font-bold">Shipping destination<input value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value })} className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-white/10 px-3 font-normal text-white outline-none focus:border-[#c5a880]" /></label><label className="text-xs font-bold sm:col-span-2">Request details *<textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 p-3 font-normal text-white outline-none focus:border-[#c5a880]" /></label><label className="flex items-start gap-2 text-[11px] font-normal leading-relaxed text-white/70 sm:col-span-2"><input required type="checkbox" className="mt-0.5 h-4 w-4 accent-[#c5a880]" />I agree to the processing of this inquiry under the <Link href="/privacy-policy" className="text-[#c5a880] underline">Privacy Policy</Link>.</label>{formStatus.message && <div role="status" className={`rounded-xl p-3 text-xs sm:col-span-2 ${formStatus.type === "success" ? "bg-emerald-400/15 text-emerald-100" : "bg-red-400/15 text-red-100"}`}>{formStatus.type === "success" && <CheckCircle2 className="mr-2 inline h-4 w-4" />}{formStatus.message}</div>}<button disabled={submitting} type="submit" className="min-h-12 rounded-xl bg-[#c5a880] px-5 text-xs font-bold uppercase tracking-wider text-[#0e3b2e] disabled:opacity-60 sm:col-span-2">{submitting ? "Confirming delivery…" : "Send equipment inquiry"}</button></form>
        </div>
      </section>
    </main>
  );
}
