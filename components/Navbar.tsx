"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ACADEMY_LINKS,
  EQUIPMENT_CATEGORIES,
  LANGUAGE_GROUPS,
  PROGRAM_LINKS,
  SITE,
  SUPPORTED_LANGUAGES,
} from "@/data/site";
import { ChevronDown, ExternalLink, Globe2, Menu, Phone, X } from "lucide-react";

type MenuName = "academy" | "programs" | "equipment" | "about" | "language" | null;

const bowyers = [
  { label: "Warrick Harvey", href: "/bowyer/warrick-harvey" },
  { label: "MR Bows — Miško Rovčanin", href: "/bowyer/mr-bows" },
  { label: "Kadys Bows — Sergey Tolochko", href: "/bowyer/kadys-bows" },
] as const;

function DesktopDropdown({
  id,
  label,
  activeMenu,
  setActiveMenu,
  children,
}: {
  id: Exclude<MenuName, null>;
  label: string;
  activeMenu: MenuName;
  setActiveMenu: (value: MenuName) => void;
  children: React.ReactNode;
}) {
  const open = activeMenu === id;
  return (
    <div className="relative">
      <button
        type="button"
        className="flex min-h-11 items-center gap-1 rounded-lg px-3 text-xs font-bold uppercase tracking-[0.12em] text-[#0e3b2e] transition hover:bg-[#0e3b2e]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7d603a]"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => setActiveMenu(open ? null : id)}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div
          id={`${id}-menu`}
          className="absolute left-1/2 top-[calc(100%+0.65rem)] z-50 w-[min(92vw,48rem)] -translate-x-1/2 rounded-2xl border border-[#0e3b2e]/10 bg-[#fffdf7] p-5 text-left shadow-2xl"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("en");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- close overlays after an external route transition */
    setActiveMenu(null);
    setMobileOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setActiveMenu(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    const update = (event: Event) => {
      const code = (event as CustomEvent<{ language?: string }>).detail?.language;
      if (code) setActiveLanguage(code);
    };
    window.addEventListener("jf:language-changed", update);
    return () => window.removeEventListener("jf:language-changed", update);
  }, []);

  const requestLanguage = (language: string) => {
    window.dispatchEvent(new CustomEvent("jf:language-request", { detail: { language } }));
    setActiveMenu(null);
    setMobileOpen(false);
  };

  return (
    <header ref={wrapperRef} className="sticky top-0 z-50 border-b border-[#0e3b2e]/10 bg-[#f0e9d9]/95 backdrop-blur-xl">
      <a href="#main-content" className="sr-only z-[100] rounded bg-white px-4 py-3 text-[#0e3b2e] focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to main content
      </a>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7d603a]">
          <span className="notranslate block truncate font-serif text-xl font-bold leading-none text-[#0e3b2e]" translate="no">Jan Franko</span>
          <span className="mt-1 block truncate text-[9px] font-bold uppercase tracking-[0.2em] text-[#7d603a]">Explorer Adventures</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
          <Link className="flex min-h-11 items-center rounded-lg px-3 text-xs font-bold uppercase tracking-[0.12em] text-[#0e3b2e] hover:bg-[#0e3b2e]/5" href="/">Home</Link>

          <DesktopDropdown id="academy" label="Academy" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              <div className="col-span-2 mb-2 flex items-end justify-between border-b border-[#0e3b2e]/10 pb-3">
                <div><p className="font-serif text-lg font-bold text-[#0e3b2e]">The Academy</p><p className="text-xs text-[#0e3b2e]/65">Training philosophy, progression, safety, and governance.</p></div>
                <Link href="/academy" className="text-xs font-bold text-[#7d603a] hover:underline">Academy overview</Link>
              </div>
              {ACADEMY_LINKS.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5 hover:text-[#0e3b2e]">{item.label}</Link>)}
            </div>
          </DesktopDropdown>

          <DesktopDropdown id="programs" label="Programs" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 border-b border-[#0e3b2e]/10 pb-2 font-serif text-base font-bold text-[#0e3b2e]">Program types</p>
                <ul className="space-y-1">{PROGRAM_LINKS.map((item) => <li key={item.href}><Link href={item.href} className="block rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5">{item.label}</Link></li>)}</ul>
              </div>
              <div className="rounded-xl bg-[#0e3b2e] p-5 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c5a880]">Complete directory</p>
                <p className="mt-2 font-serif text-xl font-bold">Filter without waiting</p>
                <p className="mt-2 text-xs leading-relaxed text-white/75">Program type, status, skill level, region, and keyword filters run locally after one resilient data load.</p>
                <Link href="/programs" className="mt-4 inline-flex rounded-full bg-[#c5a880] px-4 py-2 text-xs font-bold text-[#0e3b2e]">Browse programs</Link>
              </div>
            </div>
          </DesktopDropdown>

          <DesktopDropdown id="equipment" label="Equipment" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <div className="grid grid-cols-2 gap-7">
              <div>
                <p className="mb-2 border-b border-[#0e3b2e]/10 pb-2 font-serif text-base font-bold text-[#0e3b2e]">Shop departments</p>
                <ul className="grid grid-cols-2 gap-1">{EQUIPMENT_CATEGORIES.map((category) => <li key={category.slug}><Link href={`/equipment?category=${category.slug}`} className="block rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5">{category.name}</Link></li>)}</ul>
                <Link href="/equipment/arrow-configurator" className="mt-3 flex items-center justify-between rounded-xl border border-[#7d603a]/25 bg-[#c5a880]/10 px-4 py-3 text-sm font-bold text-[#0e3b2e] hover:border-[#7d603a]">Custom Arrow Configurator <span aria-hidden="true">→</span></Link>
              </div>
              <div>
                <p className="mb-2 border-b border-[#0e3b2e]/10 pb-2 font-serif text-base font-bold text-[#0e3b2e]">Master Bowyers</p>
                <ul className="space-y-1">{bowyers.map((bowyer) => <li key={bowyer.href}><Link href={bowyer.href} className="notranslate block rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5" translate="no">{bowyer.label}</Link></li>)}</ul>
                <Link href="/about/partners" className="mt-3 inline-flex text-xs font-bold text-[#7d603a] hover:underline">Meet all three bowyers</Link>
              </div>
            </div>
          </DesktopDropdown>

          <Link className="flex min-h-11 items-center rounded-lg px-3 text-xs font-bold uppercase tracking-[0.12em] text-[#0e3b2e] hover:bg-[#0e3b2e]/5" href="/knowledge">Knowledge</Link>

          <DesktopDropdown id="about" label="About" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <div className="grid gap-1">
              <Link href="/about/jan-franko" className="notranslate rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5" translate="no">About Jan Franko</Link>
              <Link href="/about" className="rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5">Project vision</Link>
              <Link href="/about/partners" className="rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5">Partners &amp; Master Bowyers</Link>
              <Link href="/contact" className="rounded-lg px-3 py-2 text-sm text-[#0e3b2e]/80 hover:bg-[#0e3b2e]/5">Contact &amp; bookings</Link>
            </div>
          </DesktopDropdown>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <button type="button" onClick={() => setActiveMenu(activeMenu === "language" ? null : "language")} className="flex min-h-11 items-center gap-2 rounded-full border border-[#0e3b2e]/15 bg-white/60 px-3 text-xs font-bold uppercase text-[#0e3b2e] hover:border-[#7d603a]/50" aria-label="Select language" aria-expanded={activeMenu === "language"}>
              <Globe2 className="h-4 w-4" aria-hidden="true" />{activeLanguage === "zh-CN" ? "ZH" : activeLanguage.toUpperCase()}
            </button>
            {activeMenu === "language" && (
              <div className="absolute right-0 top-[calc(100%+0.65rem)] z-50 max-h-[70vh] w-[min(92vw,40rem)] overflow-y-auto rounded-2xl border border-[#0e3b2e]/10 bg-[#fffdf7] p-5 shadow-2xl">
                <p className="mb-4 text-sm font-bold text-[#0e3b2e]">Select language</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  {LANGUAGE_GROUPS.map((group) => (
                    <div key={group}>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7d603a]">{group}</p>
                      <div className="grid grid-cols-2 gap-1">
                        {SUPPORTED_LANGUAGES.filter((language) => language.group === group).map((language) => (
                          <button key={language.code} type="button" onClick={() => requestLanguage(language.code)} className={`rounded-lg px-2 py-2 text-left text-xs hover:bg-[#0e3b2e]/5 ${activeLanguage === language.code ? "bg-[#c5a880]/20 font-bold text-[#0e3b2e]" : "text-[#0e3b2e]/75"}`}>{language.label}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 border-t border-[#0e3b2e]/10 pt-3 text-[10px] leading-relaxed text-[#0e3b2e]/55">Names and brand terms are protected from translation. Functional-cookie permission is requested before the translation service loads.</p>
              </div>
            )}
          </div>

          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#0e3b2e] px-4 text-xs font-bold text-white transition hover:bg-[#092a21] xl:flex"><Phone className="h-3.5 w-3.5 text-[#c5a880]" aria-hidden="true" />WhatsApp</a>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0e3b2e]/15 text-[#0e3b2e] lg:hidden" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#0e3b2e]/10 bg-[#fffdf7] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto max-w-2xl space-y-2">
            <Link href="/" className="block rounded-xl px-3 py-3 text-sm font-bold text-[#0e3b2e]">Home</Link>
            <details className="rounded-xl border border-[#0e3b2e]/10 p-3"><summary className="cursor-pointer text-sm font-bold text-[#0e3b2e]">The Academy</summary><div className="mt-3 grid gap-1 border-t border-[#0e3b2e]/10 pt-2"><Link href="/academy" className="rounded-lg px-2 py-2 text-sm text-[#0e3b2e]/75">Academy overview</Link>{ACADEMY_LINKS.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-sm text-[#0e3b2e]/75">{item.label}</Link>)}</div></details>
            <details className="rounded-xl border border-[#0e3b2e]/10 p-3"><summary className="cursor-pointer text-sm font-bold text-[#0e3b2e]">Programs</summary><div className="mt-3 grid gap-1 border-t border-[#0e3b2e]/10 pt-2">{PROGRAM_LINKS.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-sm text-[#0e3b2e]/75">{item.label}</Link>)}</div></details>
            <details className="rounded-xl border border-[#0e3b2e]/10 p-3"><summary className="cursor-pointer text-sm font-bold text-[#0e3b2e]">Equipment</summary><div className="mt-3 grid gap-1 border-t border-[#0e3b2e]/10 pt-2"><Link href="/equipment" className="rounded-lg px-2 py-2 text-sm font-semibold text-[#0e3b2e]">All equipment</Link>{EQUIPMENT_CATEGORIES.map((category) => <Link key={category.slug} href={`/equipment?category=${category.slug}`} className="rounded-lg px-2 py-2 text-sm text-[#0e3b2e]/75">{category.name}</Link>)}<Link href="/equipment/arrow-configurator" className="rounded-lg bg-[#c5a880]/15 px-2 py-2 text-sm font-bold text-[#0e3b2e]">Custom Arrow Configurator</Link>{bowyers.map((bowyer) => <Link key={bowyer.href} href={bowyer.href} className="notranslate rounded-lg px-2 py-2 text-sm text-[#0e3b2e]/75" translate="no">{bowyer.label}</Link>)}</div></details>
            <Link href="/knowledge" className="block rounded-xl px-3 py-3 text-sm font-bold text-[#0e3b2e]">Knowledge</Link>
            <Link href="/about/jan-franko" className="notranslate block rounded-xl px-3 py-3 text-sm font-bold text-[#0e3b2e]" translate="no">About Jan Franko</Link>
            <Link href="/contact" className="block rounded-xl px-3 py-3 text-sm font-bold text-[#0e3b2e]">Contact &amp; bookings</Link>
            <div className="mt-4 border-t border-[#0e3b2e]/10 pt-4 sm:hidden"><label htmlFor="mobile-language" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#7d603a]">Language</label><select id="mobile-language" value={activeLanguage} onChange={(event) => requestLanguage(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#0e3b2e]/20 bg-white px-3 text-sm text-[#0e3b2e]">{SUPPORTED_LANGUAGES.map((language) => <option key={language.code} value={language.code}>{language.label}</option>)}</select></div>
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0e3b2e] px-4 text-sm font-bold text-white"><Phone className="h-4 w-4 text-[#c5a880]" aria-hidden="true" />{SITE.phoneDisplay}<ExternalLink className="h-3.5 w-3.5 text-white/60" aria-hidden="true" /></a>
          </div>
        </nav>
      )}
    </header>
  );
}
