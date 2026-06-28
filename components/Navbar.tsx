"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Compass, MapPin, Award, Sliders, BookOpen, Tag } from "lucide-react";

interface Term {
  id: number;
  name: string;
  slug: string;
}

interface CategoryTerm {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer toggle
  const [isProgramsMobileOpen, setIsProgramsMobileOpen] = useState(false); // Mobile programs sub-accordion
  const [isKnowledgeMobileOpen, setIsKnowledgeMobileOpen] = useState(false); // Mobile knowledge sub-accordion
  const [isEquipmentMobileOpen, setIsEquipmentMobileOpen] = useState(false); // Mobile equipment sub-accordion
  const [types, setTypes] = useState<Term[]>([]);
  const [skills, setSkills] = useState<Term[]>([]);
  const [regions, setRegions] = useState<Term[]>([]);
  const [equipmentCategories, setEquipmentCategories] = useState<CategoryTerm[]>([]);
  
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProgramsMobileOpen(false);
    setIsKnowledgeMobileOpen(false);
    setIsEquipmentMobileOpen(false);
  }, [pathname]);

  // Fetch all taxonomies on mount to populate Mega Menu columns dynamically
  useEffect(() => {
    const fetchTaxonomies = async () => {
      try {
        const [navRes, eqRes] = await Promise.all([
          fetch("/api/nav-taxonomies"),
          fetch("/api/equipment/categories")
        ]);

        if (navRes.ok) {
          const navData = await navRes.json();
          setTypes(navData.types || []);
          setSkills(navData.skills || []);
          setRegions(navData.regions || []);
        }
        if (eqRes.ok) {
          const eqData = await eqRes.json();
          setEquipmentCategories(eqData || []);
        }
      } catch (err) {
        console.error("Failed to fetch nav menu taxonomies:", err);
      }
    };

    fetchTaxonomies();
  }, []);

  // Filter top-level categories (parent is 0 or 28, excluding Bowyers 114)
  const topCats = equipmentCategories.filter(
    (c) => (c.parent === 0 || c.parent === 28) && c.slug !== "equipment"
  );

  // Group subcategories under parents
  const columns = topCats.map((parentCat) => {
    const subCats = equipmentCategories.filter((c) => c.parent === parentCat.id);
    return {
      parent: parentCat,
      items: subCats
    };
  });

  // Align in 4-column grid, skipping the 4th item position (index 3)
  const gridSlots: Array<{ type: "category"; parent: any; items: any[] } | { type: "special" }> = [];
  let catIndex = 0;
  const totalSlots = columns.length + 1;
  for (let slotIndex = 0; slotIndex < totalSlots; slotIndex++) {
    if (slotIndex === 3) {
      gridSlots.push({ type: "special" });
    } else {
      if (columns[catIndex]) {
        gridSlots.push({
          type: "category",
          parent: columns[catIndex].parent,
          items: columns[catIndex].items
        });
        catIndex++;
      }
    }
  }

  // Label HTML cleanup helper
  const cleanTitle = (raw: string) => {
    return raw
      .replace(/&#8220;/g, "“")
      .replace(/&#8221;/g, "”")
      .replace(/&#8211;/g, "–")
      .replace(/&amp;/g, "&");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-secondary/90 backdrop-blur-md border-b border-primary/10 select-none">
      <nav className="max-w-7xl mx-auto h-20 px-6 md:px-12 flex justify-between items-center relative">
        {/* Logo Branding */}
        <Link href="/" className="flex items-center">
          <img
            src="https://janfranko.com/wp-content/uploads/2026/03/cropped-jan-franko-logo-rgb-04@2x-160x97.png"
            alt="JanFranko Logo"
            className="h-12 object-contain hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* 1. DESKTOP NAVIGATION */}
        <ul className="hidden lg:flex items-center space-x-8 font-serif text-xs tracking-widest uppercase h-full">
          {/* Home Link */}
          <li className="h-full flex items-center">
            <Link
              href="/"
              className={`hover:text-accent transition-colors py-2 border-b-2 ${
                pathname === "/" ? "border-accent text-accent font-semibold" : "border-transparent text-primary/90"
              }`}
            >
              Home
            </Link>
          </li>

          {/* Programs Mega Menu Trigger (Hover active) */}
          <li className="group h-full flex items-center static">
            <Link
              href="/programs"
              className={`hover:text-accent transition-colors py-2 border-b-2 flex items-center gap-1 cursor-pointer ${
                pathname === "/programs" ? "border-accent text-accent font-semibold" : "border-transparent text-primary/90"
              }`}
            >
              Programs
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </Link>

            {/* MEGA MENU CONTAINER */}
            <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl border-t border-primary/5 border-b border-primary/10 rounded-b-3xl shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-40">
              <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">
                {/* Column 1: Types */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-bold border-b border-primary/5 pb-2 flex items-center gap-1.5 font-sans">
                    <Compass className="w-4 h-4" />
                    Program Types
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs tracking-wider normal-case text-primary/80">
                    {types.length === 0 ? (
                      <li className="text-primary/40 italic">Loading types...</li>
                    ) : (
                      types.map((t) => (
                        <li key={t.id}>
                          <Link
                            href={`/programs?program_type=${t.slug}`}
                            className="hover:text-accent transition-colors block py-0.5"
                          >
                            {t.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                {/* Column 2: Skill Levels */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-bold border-b border-primary/5 pb-2 flex items-center gap-1.5 font-sans">
                    <Award className="w-4 h-4" />
                    Skill Levels
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs tracking-wider normal-case text-primary/80">
                    {skills.length === 0 ? (
                      <li className="text-primary/40 italic">Loading levels...</li>
                    ) : (
                      skills.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={`/programs?skill_level=${s.slug}`}
                            className="hover:text-accent transition-colors block py-0.5"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                {/* Column 3: Regions */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-bold border-b border-primary/5 pb-2 flex items-center gap-1.5 font-sans">
                    <MapPin className="w-4 h-4" />
                    Regions
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs tracking-wider normal-case text-primary/80">
                    {regions.length === 0 ? (
                      <li className="text-primary/40 italic">Loading regions...</li>
                    ) : (
                      regions.map((r) => (
                        <li key={r.id}>
                          <Link
                            href={`/programs?region=${r.slug}`}
                            className="hover:text-accent transition-colors block py-0.5"
                          >
                            {r.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                {/* Column 4: Featured Promo Card */}
                <div className="bg-[#0e3b2e] rounded-2xl p-5 text-white flex flex-col justify-between space-y-4 shadow-inner">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold font-sans">
                      Featured Expedition
                    </span>
                    <h5 className="font-serif text-lg font-bold leading-snug">
                      Inner Mongolia Steppe Camp
                    </h5>
                    <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                      Immersive horse archery and traditional archery training in the grasslands of China.
                    </p>
                  </div>
                  <Link
                    href="/programs?open=inner-mongolia-steppe-horse-archery-camp"
                    className="inline-block text-center py-2.5 bg-accent hover:bg-accent/90 text-primary font-serif font-bold text-[10px] tracking-wider uppercase rounded-xl transition-all"
                  >
                    View Expedition
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* Equipment Mega Menu Trigger (Hover active) */}
          <li className="group h-full flex items-center static">
            <Link
              href="/equipment"
              className={`hover:text-accent transition-colors py-2 border-b-2 flex items-center gap-1 cursor-pointer ${
                pathname.startsWith("/equipment") ? "border-accent text-accent font-semibold" : "border-transparent text-primary/90"
              }`}
            >
              Equipment
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </Link>

            {/* MEGA MENU CONTAINER */}
            <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl border-t border-primary/5 border-b border-primary/10 rounded-b-3xl shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-40">
              <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">
                {gridSlots.map((slot, index) => {
                  if (slot.type === "special") {
                    return (
                      <div key="special-promo" className="bg-[#0e3b2e] rounded-2xl p-5 text-white flex flex-col justify-between space-y-4 shadow-inner col-span-1 h-full min-h-[180px]">
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase tracking-widest text-accent font-bold font-sans">
                            Custom Armory
                          </span>
                          <h5 className="font-serif text-lg font-bold leading-snug">
                            Bespoke Bowyer Craft
                          </h5>
                          <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                            Order a custom, handcrafted traditional bow designed for your exact specifications.
                          </p>
                        </div>
                        <Link
                          href="/equipment?custom=true"
                          className="inline-block text-center py-2 bg-accent hover:bg-accent/90 text-primary font-serif font-bold text-[10px] tracking-wider uppercase rounded-xl transition-all"
                        >
                          Request Custom Build
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div key={slot.parent.id} className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-bold border-b border-primary/5 pb-2 flex items-center gap-1.5 font-sans">
                        <Tag className="w-4 h-4" />
                        {cleanTitle(slot.parent.name)}
                      </h4>
                      <ul className="space-y-2.5 font-sans text-xs tracking-wider normal-case text-primary/80">
                        {slot.items.length === 0 ? (
                          <li className="text-primary/40 italic">All {cleanTitle(slot.parent.name)}</li>
                        ) : (
                          slot.items.slice(0, 8).map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/equipment?category=${sub.slug}`}
                                className="hover:text-accent transition-colors block py-0.5"
                              >
                                {cleanTitle(sub.name)}
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </li>

          {/* Knowledge Mega Menu Trigger (Hover active) */}
          <li className="group h-full flex items-center static">
            <Link
              href="/scrolls"
              className={`hover:text-accent transition-colors py-2 border-b-2 flex items-center gap-1 cursor-pointer ${
                pathname === "/scrolls" ? "border-accent text-accent font-semibold" : "border-transparent text-primary/90"
              }`}
            >
              Knowledge
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </Link>

            {/* MEGA MENU CONTAINER */}
            <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl border-t border-primary/5 border-b border-primary/10 rounded-b-3xl shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-40">
              <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">
                {/* Column 1: Categories */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-bold border-b border-primary/5 pb-2 flex items-center gap-1.5 font-sans">
                    <Tag className="w-4 h-4" />
                    Categories
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs tracking-wider normal-case text-primary/80">
                    <li>
                      <Link href="/scrolls?category=bowyer-craft" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Bowyer Craft
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?category=technique" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Technique &amp; Discipline
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?category=history" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        History &amp; Lore
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Regions */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-bold border-b border-primary/5 pb-2 flex items-center gap-1.5 font-sans">
                    <Compass className="w-4 h-4" />
                    Expedition Regions
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs tracking-wider normal-case text-primary/80">
                    <li>
                      <Link href="/scrolls?region=nordic" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Nordic Region
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?region=europe" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Europe
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?region=steppe" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Central Asian Steppe
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?region=ottoman" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Ottoman Archery
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?region=east-asia" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        East Asian
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Topics / Tags */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-bold border-b border-primary/5 pb-2 flex items-center gap-1.5 font-sans">
                    <BookOpen className="w-4 h-4" />
                    Popular Topics
                  </h4>
                  <ul className="space-y-2.5 font-sans text-xs tracking-wider normal-case text-primary/80">
                    <li>
                      <Link href="/scrolls?query=flatbow" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Flatbow Design
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?query=yew" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Alpine Yew Wood
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?query=warbow" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Heavy Warbows
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?query=horse" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Mounted Archery
                      </Link>
                    </li>
                    <li>
                      <Link href="/scrolls?query=composite" className="hover:text-[#7d603a] hover:underline block py-0.5">
                        Composite Bows
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Promo Card */}
                <div className="relative bg-primary text-secondary rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-inner h-[220px]">
                  <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80')" }}></div>
                  <div className="relative z-10 space-y-2">
                    <span className="text-[9px] text-accent font-serif font-bold tracking-widest uppercase block">
                      Featured Lore
                    </span>
                    <h5 className="text-sm font-serif font-bold text-white leading-snug line-clamp-2">
                      The Alpine Bowyer: Crafting Yew Bows in Austria
                    </h5>
                    <p className="text-[10px] text-white/70 font-sans leading-relaxed line-clamp-3">
                      Harvesting and splitting high-altitude mountain yew from the Tyrolean peaks.
                    </p>
                  </div>
                  <Link
                    href="/scrolls/alpine-bowyer-crafting-yew-bows-austria"
                    className="relative z-10 inline-block text-center py-2.5 bg-accent hover:bg-accent/90 text-primary font-serif font-bold text-[10px] tracking-wider uppercase rounded-xl transition-all"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* Contact Anchor Link */}
          <li className="h-full flex items-center">
            <a
              href="#contact"
              onClick={(e) => {
                if (pathname !== "/") {
                  e.preventDefault();
                  window.location.href = "/#contact";
                }
              }}
              className="hover:text-accent transition-colors py-2 border-b-2 border-transparent text-primary/90 cursor-pointer"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger Menu Icon (Mobile/Tablet Viewports) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-full border border-primary/10 hover:border-primary/30 text-primary cursor-pointer transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* 2. MOBILE NAVIGATION SLIDING DRAWER */}
        <div
          className={`fixed top-20 right-0 h-[calc(100vh-80px)] w-full sm:w-[350px] bg-secondary border-l border-primary/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Navigation Links */}
          <div className="p-6 space-y-6">
            <ul className="space-y-5 font-serif text-sm tracking-widest uppercase">
              <li>
                <Link
                  href="/"
                  className={`block py-1 ${pathname === "/" ? "text-accent font-bold" : "text-primary/90"}`}
                >
                  Home
                </Link>
              </li>

              {/* Collapsible Programs Accordion */}
              <li className="space-y-3">
                <button
                  onClick={() => setIsProgramsMobileOpen(!isProgramsMobileOpen)}
                  className="w-full flex justify-between items-center py-1 text-left uppercase tracking-widest hover:text-accent cursor-pointer"
                >
                  <span className={pathname === "/programs" ? "text-accent font-bold" : "text-primary/90"}>
                    Programs
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isProgramsMobileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProgramsMobileOpen && (
                  <div className="pl-4 space-y-4 border-l border-primary/10 animate-in slide-in-from-top-2 duration-200">
                    
                    {/* Types Subgroup */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans font-bold text-[#7d603a] tracking-wider uppercase block">
                        Types
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs tracking-wide text-primary/85 normal-case">
                        {types.map((t) => (
                          <li key={t.id}>
                            <Link href={`/programs?program_type=${t.slug}`} className="hover:text-accent block py-0.5">
                              {t.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skill Levels Subgroup */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans font-bold text-[#7d603a] tracking-wider uppercase block">
                        Skill Levels
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs tracking-wide text-primary/85 normal-case">
                        {skills.map((s) => (
                          <li key={s.id}>
                            <Link href={`/programs?skill_level=${s.slug}`} className="hover:text-accent block py-0.5">
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Regions Subgroup */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans font-bold text-[#7d603a] tracking-wider uppercase block">
                        Regions
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs tracking-wide text-primary/85 normal-case">
                        {regions.map((r) => (
                          <li key={r.id}>
                            <Link href={`/programs?region=${r.slug}`} className="hover:text-accent block py-0.5">
                              {r.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}
              </li>

              {/* Collapsible Equipment Accordion */}
              <li className="space-y-3">
                <button
                  onClick={() => setIsEquipmentMobileOpen(!isEquipmentMobileOpen)}
                  className="w-full flex justify-between items-center py-1 text-left uppercase tracking-widest hover:text-accent cursor-pointer"
                >
                  <span className={pathname.startsWith("/equipment") ? "text-accent font-bold" : "text-primary/90"}>
                    Equipment
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isEquipmentMobileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isEquipmentMobileOpen && (
                  <div className="pl-4 border-l border-primary/10 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {topCats.map((parentCat) => {
                      const subs = equipmentCategories.filter((c) => c.parent === parentCat.id);
                      return (
                        <div key={parentCat.id} className="space-y-2">
                          <span className="text-[10px] tracking-wider text-[#7d603a] font-bold block">{cleanTitle(parentCat.name)}</span>
                          <ul className="pl-2 space-y-2 text-xs tracking-wider normal-case text-primary/75">
                            <li>
                              <Link href={`/equipment?category=${parentCat.slug}`} className="hover:text-accent block">
                                All {cleanTitle(parentCat.name)}
                              </Link>
                            </li>
                            {subs.slice(0, 5).map((sub) => (
                              <li key={sub.id}>
                                <Link href={`/equipment?category=${sub.slug}`} className="hover:text-accent block">
                                  {cleanTitle(sub.name)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>

              {/* Knowledge Accordion (Mobile) */}
              <li className="space-y-2">
                <button
                  onClick={() => setIsKnowledgeMobileOpen(!isKnowledgeMobileOpen)}
                  className="w-full flex justify-between items-center py-1 text-primary/90 font-serif text-xs tracking-widest uppercase text-left"
                >
                  Knowledge
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-primary/60 transition-transform duration-300 ${
                      isKnowledgeMobileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isKnowledgeMobileOpen && (
                  <div className="pl-4 space-y-4 border-l border-primary/10 animate-in slide-in-from-top-2 duration-200">
                    
                    {/* Categories Subgroup */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans font-bold text-[#7d603a] tracking-wider uppercase block">
                        Categories
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs tracking-wide text-primary/85 normal-case">
                        <li>
                          <Link href="/scrolls?category=bowyer-craft" className="hover:text-accent block py-0.5">
                            Bowyer Craft
                          </Link>
                        </li>
                        <li>
                          <Link href="/scrolls?category=technique" className="hover:text-accent block py-0.5">
                            Technique &amp; Discipline
                          </Link>
                        </li>
                        <li>
                          <Link href="/scrolls?category=history" className="hover:text-accent block py-0.5">
                            History &amp; Lore
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Regions Subgroup */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans font-bold text-[#7d603a] tracking-wider uppercase block">
                        Regions
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs tracking-wide text-primary/85 normal-case">
                        <li>
                          <Link href="/scrolls?region=nordic" className="hover:text-accent block py-0.5">
                            Nordic Region
                          </Link>
                        </li>
                        <li>
                          <Link href="/scrolls?region=europe" className="hover:text-accent block py-0.5">
                            Europe
                          </Link>
                        </li>
                        <li>
                          <Link href="/scrolls?region=steppe" className="hover:text-accent block py-0.5">
                            Central Asian Steppe
                          </Link>
                        </li>
                        <li>
                          <Link href="/scrolls?region=ottoman" className="hover:text-accent block py-0.5">
                            Ottoman Archery
                          </Link>
                        </li>
                        <li>
                          <Link href="/scrolls?region=east-asia" className="hover:text-accent block py-0.5">
                            East Asian
                          </Link>
                        </li>
                      </ul>
                    </div>

                  </div>
                )}
              </li>

              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    if (pathname !== "/") {
                      e.preventDefault();
                      window.location.href = "/#contact";
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className="block py-1 text-primary/90 cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Footer Promo */}
          <div className="p-6 bg-[#0e3b2e] text-white space-y-3">
            <span className="text-[9px] uppercase tracking-widest text-accent font-bold font-sans">
              Admission Office
            </span>
            <p className="text-[11px] text-white/70 font-sans leading-relaxed">
              Applications are reviewed on a rolling basis. Suitable fitness levels are required for Level 3/4.
            </p>
            <Link
              href="/programs"
              className="block text-center py-2 bg-accent text-primary font-serif font-bold text-[10px] tracking-wider uppercase rounded-lg transition-all"
            >
              All Directory Listings
            </Link>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
