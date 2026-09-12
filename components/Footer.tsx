"use client";

import Link from "next/link";
import { Compass, ExternalLink, Mail, MapPin, Phone, Settings2 } from "lucide-react";
import { ACADEMY_LINKS, EQUIPMENT_CATEGORIES, PROGRAM_LINKS, SITE, TRAINING_LOCATIONS } from "@/data/site";

const legalLinks = [
  { label: "Privacy Policy (GDPR)", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Payment Methods", href: "/payment-methods" },
  { label: "Shipping", href: "/shipping" },
  { label: "Legal Notice / Impressum", href: "/impressum" },
  { label: "Safety & Legal Overview", href: "/safety-legal-overview" },
] as const;

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-[#c5a880]/15 bg-[#0e3b2e] text-[#f0e9d9]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(197,168,128,0.08),transparent_58%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8 lg:py-16">
        <section className="space-y-4 sm:col-span-2 lg:col-span-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c5a880]">Traditional Archery Exploration</p>
          <Link href="/" className="notranslate block font-serif text-2xl font-bold text-white hover:text-[#c5a880]" translate="no">Jan Franko</Link>
          <p className="max-w-sm text-xs leading-relaxed text-[#f0e9d9]/72">A global initiative dedicated to traditional archery research, cultural exploration, and field training rooted in documented traditions.</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a880]"><Compass className="h-4 w-4" aria-hidden="true" />Central Europe &amp; Eurasian field regions</div>
        </section>

        <section>
          <h2 className="mb-3 border-b border-white/10 pb-2 font-serif text-sm font-bold text-white">Explorer Adventures</h2>
          <ul className="space-y-2 text-xs text-[#f0e9d9]/75">
            {PROGRAM_LINKS.slice(1).map((item) => <li key={item.href}><Link href={item.href} className="hover:text-[#c5a880]">{item.label}</Link></li>)}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 border-b border-white/10 pb-2 font-serif text-sm font-bold text-white">The Academy</h2>
          <ul className="space-y-2 text-xs text-[#f0e9d9]/75">
            {ACADEMY_LINKS.slice(0, 6).map((item) => <li key={item.href}><Link href={item.href} className="hover:text-[#c5a880]">{item.label}</Link></li>)}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 border-b border-white/10 pb-2 font-serif text-sm font-bold text-white">Equipment</h2>
          <ul className="space-y-2 text-xs text-[#f0e9d9]/75">
            {EQUIPMENT_CATEGORIES.map((category) => <li key={category.slug}><Link href={`/equipment?category=${category.slug}`} className="hover:text-[#c5a880]">{category.name}</Link></li>)}
            <li><Link href="/equipment/arrow-configurator" className="font-semibold text-[#c5a880] hover:text-white">Custom Arrow Configurator</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 border-b border-white/10 pb-2 font-serif text-sm font-bold text-white">Official contact</h2>
          <ul className="space-y-3 text-xs text-[#f0e9d9]/80">
            <li><a href={`mailto:${SITE.email}`} className="flex items-start gap-2 hover:text-[#c5a880]"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]" /><span>{SITE.email}</span></a></li>
            <li><a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-[#c5a880]"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]" /><span>{SITE.phoneDisplay}</span></a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]" /><span>Tirol, Austria &amp; Košice, Slovakia</span></li>
          </ul>
        </section>
      </div>

      <section className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">Training locations</p><h2 className="mt-1 font-serif text-xl font-bold text-white">Six training locations</h2></div>
            <p className="text-xs text-white/55">Map links open in a new tab.</p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {TRAINING_LOCATIONS.map((location) => (
              <a key={location.name} href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs hover:border-[#c5a880]/50 hover:bg-white/10">
                <span><strong className="text-white">{location.name}</strong><span className="ml-1 text-white/60">— {location.country}</span></span>
                <ExternalLink className="h-3.5 w-3.5 text-[#c5a880]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="relative border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-[11px] text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} <span className="notranslate" translate="no">Jan Franko — Explorer Adventures</span>. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Legal links">
            {legalLinks.map((item) => <Link key={item.href} href={item.href} className="hover:text-[#c5a880]">{item.label}</Link>)}
            <button type="button" onClick={() => window.dispatchEvent(new Event("jf:open-consent"))} className="flex items-center gap-1.5 hover:text-[#c5a880]"><Settings2 className="h-3.5 w-3.5" />Cookie settings</button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
