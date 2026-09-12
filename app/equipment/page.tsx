"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, GitCompareArrows, ImageOff, Search, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { EQUIPMENT_CATEGORIES } from "@/data/site";
import { FALLBACK_EQUIPMENT_PRODUCTS, type EquipmentProduct } from "@/data/equipment";

type CatalogResponse = {
  products?: EquipmentProduct[];
  source?: "woocommerce" | "wordpress" | "verified-fallback";
};

const cleanText = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#8211;/g, "–").replace(/\s+/g, " ").trim();

function CatalogContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<EquipmentProduct[]>(FALLBACK_EQUIPMENT_PRODUCTS);
  const [source, setSource] = useState<CatalogResponse["source"]>("verified-fallback");
  const [refreshing, setRefreshing] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("newest");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    const load = async () => {
      try {
        const response = await fetch("/api/equipment/products", { signal: controller.signal });
        if (!response.ok) return;
        const payload = (await response.json()) as CatalogResponse;
        if (Array.isArray(payload.products) && payload.products.length > 0) {
          setProducts(payload.products);
          setSource(payload.source);
        }
      } catch (error) {
        if (!controller.signal.aborted) console.error("Catalog refresh failed:", error);
      } finally {
        window.clearTimeout(timeout);
        setRefreshing(false);
      }
    };

    void load();
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const publishedProducts = useMemo(() => products.filter((product) => product.publicationStatus === "published"), [products]);
  const withheldCount = useMemo(() => products.filter((product) => product.publicationStatus !== "published").length, [products]);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = publishedProducts.filter((product) => {
      if (category && category !== "master-bowyers" && product.category !== category) return false;
      if (category === "master-bowyers") return false;
      if (availability === "in-stock" && product.stockStatus !== "in-stock") return false;
      if (availability === "inquiry" && product.stockStatus !== "inquiry") return false;
      const numericPrice = product.price === null ? null : Number(product.price);
      if (minimumPrice && (numericPrice === null || numericPrice < Number(minimumPrice))) return false;
      if (maximumPrice && (numericPrice === null || numericPrice > Number(maximumPrice))) return false;
      if (!normalizedQuery) return true;
      return `${product.title} ${cleanText(product.excerpt)} ${product.categoryLabel}`.toLowerCase().includes(normalizedQuery);
    });

    return [...result].sort((a, b) => {
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      if (sort === "price-asc") return Number(a.price ?? Number.POSITIVE_INFINITY) - Number(b.price ?? Number.POSITIVE_INFINITY);
      if (sort === "price-desc") return Number(b.price ?? -1) - Number(a.price ?? -1);
      return Date.parse(b.date || "1970-01-01") - Date.parse(a.date || "1970-01-01");
    });
  }, [availability, category, maximumPrice, minimumPrice, publishedProducts, query, sort]);

  const comparedProducts = compare.map((slug) => publishedProducts.find((product) => product.slug === slug)).filter((product): product is EquipmentProduct => Boolean(product));
  const selectedCategory = EQUIPMENT_CATEGORIES.find((item) => item.slug === category);

  const toggleCompare = (slug: string) => {
    setCompare((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 3 ? [...current, slug] : current);
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#f0e9d9] text-[#0e3b2e]">
      <section className="relative overflow-hidden bg-[#0e3b2e] px-6 py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.14),transparent_65%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c5a880]">Equipment &amp; commissions</p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-6xl">A catalog that shows only what can be defended</h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/78 sm:text-base">Bows with unresolved historical, cultural, photographic, or rights questions are withheld. Available products, verified bowyer commissions, targets, accessories, training kits, and the arrow configurator remain directly accessible.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPMENT_CATEGORIES.map((item) => {
            const selected = category === item.slug;
            return (
              <button key={item.slug} type="button" onClick={() => setCategory(selected ? "" : item.slug)} className={`min-h-32 rounded-2xl border p-5 text-left transition ${selected ? "border-[#0e3b2e] bg-[#0e3b2e] text-white shadow-lg" : "border-[#0e3b2e]/10 bg-white hover:border-[#7d603a]/45"}`} aria-pressed={selected}>
                <span className={`font-serif text-xl font-bold ${selected ? "text-white" : "text-[#0e3b2e]"}`}>{item.name}</span>
                <span className={`mt-2 block text-xs leading-relaxed ${selected ? "text-white/70" : "text-[#0e3b2e]/65"}`}>{item.description}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl border border-[#0e3b2e]/10 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative flex min-h-11 flex-1 items-center">
              <span className="sr-only">Search equipment</span><Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#0e3b2e]/40" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search available equipment…" className="min-h-11 w-full rounded-xl border border-[#0e3b2e]/15 bg-[#f0e9d9]/45 pl-10 pr-10 text-sm outline-none focus:border-[#7d603a]" />
              {query && <button type="button" onClick={() => setQuery("")} className="absolute right-3 rounded p-1" aria-label="Clear search"><X className="h-4 w-4" /></button>}
            </label>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <label className="flex items-center gap-2"><SlidersHorizontal className="hidden h-4 w-4 text-[#7d603a] sm:block" /><span className="sr-only">Availability</span><select value={availability} onChange={(event) => setAvailability(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#0e3b2e]/15 bg-white px-3 text-xs"><option value="all">All availability</option><option value="in-stock">In stock</option><option value="inquiry">By inquiry</option></select></label>
              <label><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#0e3b2e]/15 bg-white px-3 text-xs"><option value="newest">Newest</option><option value="title-asc">Title A–Z</option><option value="title-desc">Title Z–A</option><option value="price-asc">Price low–high</option><option value="price-desc">Price high–low</option></select></label>
              <label><span className="sr-only">Minimum catalog price</span><input type="number" min="0" inputMode="decimal" value={minimumPrice} onChange={(event) => setMinimumPrice(event.target.value)} placeholder="Min price" className="min-h-11 w-full rounded-xl border border-[#0e3b2e]/15 bg-white px-3 text-xs sm:w-28" /></label>
              <label><span className="sr-only">Maximum catalog price</span><input type="number" min="0" inputMode="decimal" value={maximumPrice} onChange={(event) => setMaximumPrice(event.target.value)} placeholder="Max price" className="min-h-11 w-full rounded-xl border border-[#0e3b2e]/15 bg-white px-3 text-xs sm:w-28" /></label>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#0e3b2e]/10 pt-4 text-[11px] text-[#0e3b2e]/60">
            <span aria-live="polite">{refreshing ? "Refreshing verified inventory…" : `${filtered.length} available item${filtered.length === 1 ? "" : "s"}`}{selectedCategory ? ` in ${selectedCategory.name}` : ""}</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#7d603a]" />{withheldCount || 22} bow listings withheld pending verification · <Link href="/equipment/verification" className="font-bold text-[#7d603a] underline">View audit</Link></span>
          </div>
        </div>

        {category === "master-bowyers" ? (
          <div className="rounded-3xl bg-[#0e3b2e] p-8 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c5a880]">Three individual profiles</p><h2 className="mt-2 font-serif text-3xl font-bold">Warrick Harvey, MR Bows, and Kadys Bows</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">Read each bowyer’s sourced story, materials, models, and commission process—without a slider or generic filler.</p><Link href="/about/partners" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#c5a880] px-6 text-xs font-bold uppercase tracking-wider text-[#0e3b2e]">Open Master Bowyers <ArrowRight className="h-4 w-4" /></Link></div>
        ) : category === "arrows-shafts" ? (
          <div className="rounded-3xl bg-[#0e3b2e] p-8 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c5a880]">Custom configuration</p><h2 className="mt-2 font-serif text-3xl font-bold">Build a complete arrow request</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">Enter bow type, draw weight, draw length, shooting style, shaft, spine, fletching, point, nock, and quantity. Recommendations and warnings update as you configure.</p><Link href="/equipment/arrow-configurator" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#c5a880] px-6 text-xs font-bold uppercase tracking-wider text-[#0e3b2e]">Open Arrow Configurator <ArrowRight className="h-4 w-4" /></Link></div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-[#0e3b2e]/10 bg-white px-6 py-16 text-center"><ImageOff className="mx-auto h-8 w-8 text-[#7d603a]" /><h2 className="mt-4 font-serif text-2xl font-bold">No unverified substitute will be shown</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#0e3b2e]/65">This department currently has no item that passes the publication gate. Use the consultation form for a specific request or choose another department.</p><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#0e3b2e] px-6 text-xs font-bold uppercase text-white">Ask about this department</Link></div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <article key={product.slug} className="group flex overflow-hidden rounded-2xl border border-[#0e3b2e]/10 bg-white shadow-sm transition hover:border-[#7d603a]/40 hover:shadow-lg sm:flex-col">
                <Link href={`/equipment/${product.slug}`} className="relative block h-44 w-36 shrink-0 overflow-hidden bg-[#0e3b2e]/5 sm:h-56 sm:w-full">
                  {product.image ? <Image src={product.image} alt={product.imageAlt || product.title} fill sizes="(max-width: 640px) 144px, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /> : <span className="flex h-full items-center justify-center"><ImageOff className="h-8 w-8 text-[#0e3b2e]/25" /></span>}
                </Link>
                <div className="flex min-w-0 flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7d603a]">{product.categoryLabel}</p><span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold uppercase ${product.stockStatus === "in-stock" ? "bg-emerald-100 text-emerald-800" : product.stockStatus === "out-of-stock" ? "bg-red-100 text-red-800" : "bg-[#c5a880]/20 text-[#6a4d28]"}`}>{product.stockStatus === "in-stock" ? "In stock" : product.stockStatus === "out-of-stock" ? "Sold out" : "Consultation"}</span></div>
                  <Link href={`/equipment/${product.slug}`} className="mt-2 font-serif text-xl font-bold leading-tight hover:text-[#7d603a]">{cleanText(product.title)}</Link>
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[#0e3b2e]/65">{cleanText(product.excerpt)}</p>
                  <div className="mt-auto pt-5"><div className="mb-3 flex items-center justify-between gap-2 border-t border-[#0e3b2e]/10 pt-4"><span className="font-serif text-lg font-bold">{product.price && product.currency ? new Intl.NumberFormat("en", { style: "currency", currency: product.currency }).format(Number(product.price)) : "Quote after review"}</span><button type="button" onClick={() => toggleCompare(product.slug)} disabled={!compare.includes(product.slug) && compare.length >= 3} className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold ${compare.includes(product.slug) ? "bg-[#0e3b2e] text-white" : "text-[#7d603a] hover:bg-[#c5a880]/15 disabled:opacity-35"}`} aria-pressed={compare.includes(product.slug)}><GitCompareArrows className="h-3.5 w-3.5" />{compare.includes(product.slug) ? "Added" : "Compare"}</button></div>
                    {product.purchasable && product.purchaseUrl ? <a href={product.purchaseUrl} className="flex min-h-11 items-center justify-center rounded-xl bg-[#0e3b2e] text-xs font-bold uppercase tracking-wider text-white">Add to cart</a> : <Link href={`/equipment/${product.slug}#inquiry`} className="flex min-h-11 items-center justify-center rounded-xl bg-[#0e3b2e] text-xs font-bold uppercase tracking-wider text-white">Request details</Link>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {comparedProducts.length > 0 && (
          <section className="mt-10 rounded-3xl border border-[#0e3b2e]/15 bg-white p-5 sm:p-7" aria-label="Product comparison">
            <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7d603a]">Comparison</p><h2 className="mt-1 font-serif text-2xl font-bold">Selected equipment</h2></div><button type="button" onClick={() => setCompare([])} className="text-xs font-bold text-[#7d603a] underline">Clear</button></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{comparedProducts.map((product) => <article key={product.slug} className="rounded-2xl bg-[#f0e9d9]/60 p-4"><div className="flex items-start justify-between gap-2"><h3 className="font-serif text-lg font-bold">{product.title}</h3><button type="button" onClick={() => toggleCompare(product.slug)} aria-label={`Remove ${product.title} from comparison`}><X className="h-4 w-4" /></button></div><dl className="mt-3 space-y-2 text-xs"><div className="flex justify-between gap-3"><dt className="text-[#0e3b2e]/55">Department</dt><dd className="text-right font-semibold">{product.categoryLabel}</dd></div><div className="flex justify-between gap-3"><dt className="text-[#0e3b2e]/55">Availability</dt><dd className="text-right font-semibold">{product.stockStatus}</dd></div><div className="flex justify-between gap-3"><dt className="text-[#0e3b2e]/55">Price</dt><dd className="text-right font-semibold">{product.price ? `${product.price} ${product.currency}` : "Manual quote"}</dd></div></dl></article>)}</div>
          </section>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#7d603a]/20 bg-[#c5a880]/10 p-4 text-xs leading-relaxed text-[#0e3b2e]/72"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7d603a]" /><p>Catalog feed: <strong>{source === "woocommerce" ? "live WooCommerce inventory" : source === "wordpress" ? "live WordPress catalog; prices confirmed manually" : "verified continuity inventory while the live feed refreshes"}</strong>. No generic stock bow image is substituted when an image or source is missing.</p></div>
        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#7d603a]" aria-label="Shop support">
          <Link href="/payment-methods" className="underline">Payment methods</Link>
          <Link href="/shipping" className="underline">Shipping</Link>
          <Link href="/refund-policy" className="underline">Returns &amp; refunds</Link>
          <a href="https://janfranko.com/cart/" className="underline">Cart</a>
          <a href="https://janfranko.com/my-account/" className="underline">Customer account</a>
        </nav>
      </section>
    </main>
  );
}

export default function EquipmentPage() {
  return <Suspense fallback={<main id="main-content" className="min-h-screen bg-[#f0e9d9] px-6 py-24"><div className="mx-auto h-48 max-w-5xl animate-pulse rounded-3xl bg-[#0e3b2e]/10" aria-label="Preparing equipment directory" /></main>}><CatalogContent /></Suspense>;
}
