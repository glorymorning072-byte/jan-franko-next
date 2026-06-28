"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Compass, Shield, Award, ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";

interface Product {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  categories: number[];
  brands: number[];
}

interface CategoryTerm {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

interface SpecRow {
  label: string;
  value: string;
}

const ProductDetailPage = () => {
  const { slug } = useParams();

  // Detail States
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<CategoryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [parsedContent, setParsedContent] = useState("");
  const [specifications, setSpecifications] = useState<SpecRow[]>([]);

  // Wizard States
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [drawWeight, setDrawWeight] = useState("45 lbs");
  const [drawLength, setDrawLength] = useState("30 inches");
  const [handDominance, setHandDominance] = useState("Right Hand");
  const [riserWood, setRiserWood] = useState("Ash");
  const [hornOverlays, setHornOverlays] = useState(false);
  const [customVeneers, setCustomVeneers] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [customEngraving, setCustomEngraving] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch product on mount
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/equipment/products"),
          fetch("/api/equipment/categories")
        ]);
        if (prodRes.ok && catRes.ok) {
          const prods: Product[] = await prodRes.json();
          const cats: CategoryTerm[] = await catRes.json();
          setCategories(cats);

          const found = prods.find((p) => p.slug === slug);
          if (found) {
            setProduct(found);
            
            // Parse content to extract specifications table
            if (typeof window !== "undefined") {
              const parser = new DOMParser();
              const doc = parser.parseFromString(found.content, "text/html");
              const table = doc.querySelector("table");
              const specs: SpecRow[] = [];
              
              if (table) {
                table.querySelectorAll("tbody tr").forEach((row) => {
                  const cells = row.querySelectorAll("td");
                  if (cells.length >= 2) {
                    specs.push({
                      label: cells[0].textContent?.trim() || "",
                      value: cells[1].textContent?.trim() || ""
                    });
                  }
                });
                table.remove();
                
                // Also remove specification headers
                const specHeader = Array.from(doc.querySelectorAll("h3, h4")).find(
                  (h) => h.textContent?.includes("Specification")
                );
                if (specHeader) specHeader.remove();
              }
              
              setSpecifications(specs);
              setParsedContent(doc.body.innerHTML);
            } else {
              setParsedContent(found.content);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [slug]);

  // GSAP Entrance Stagger when product loads
  useEffect(() => {
    if (loading || !product) return;

    gsap.fromTo(
      ".detail-fade-in",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, [loading, product]);

  // Form Validation
  const handleNextStep = () => {
    if (wizardStep === 3) {
      // Validate Contact Information
      const newErrors: Record<string, string> = {};
      if (!fullName.trim()) newErrors.fullName = "Full Name is required";
      if (!email.trim() || !email.includes("@")) newErrors.email = "Valid Email is required";
      if (!phone.trim()) newErrors.phone = "Phone number is required";
      if (!country.trim()) newErrors.country = "Country is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      setWizardStep(4); // Completion
    } else {
      setWizardStep(wizardStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (wizardStep === 1) {
      setShowWizard(false);
    } else {
      setWizardStep(wizardStep - 1);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-secondary flex items-center justify-center">
        <span className="font-serif text-sm tracking-widest uppercase text-primary/50 animate-pulse">Loading Product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-secondary flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-primary">Gear Not Found</h2>
        <Button href="/equipment" variant="accent">Back to Catalog</Button>
      </div>
    );
  }

  // Resolve taxonomy labels
  const parentId = product.categories.find(
    (id) => categories.find((c) => c.id === id)?.parent === 0
  );
  const parentLabel = parentId
    ? categories.find((c) => c.id === parentId)?.name
    : "Equipment";

  const brandId = product.categories.find(
    (id) => categories.find((c) => c.id === id)?.parent === 114
  );
  const brandLabel = brandId
    ? categories.find((c) => c.id === brandId)?.name
    : "Bespoke Bowyer";

  // HTML entity cleanup helpers
  const cleanTitle = (raw: string | undefined) => {
    if (!raw) return "";
    return raw
      .replace(/&#8220;/g, "“")
      .replace(/&#8221;/g, "”")
      .replace(/&#8211;/g, "–")
      .replace(/&amp;/g, "&");
  };

  return (
    <div className="w-full min-h-screen bg-secondary text-primary select-text relative pb-24">
      {/* CSS Overrides for WordPress Body Typography */}
      <style dangerouslySetInnerHTML={{ __html: `
        .product-body-content h3 {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0e3b2e;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .product-body-content h4 {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #7d603a;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .product-body-content p {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.95rem;
          color: rgba(15, 23, 42, 0.85);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .product-body-content blockquote {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.05rem;
          font-style: italic;
          color: #7d603a;
          border-left: 2px solid #c5a880;
          padding-left: 1rem;
          margin: 1.5rem 0;
          line-height: 1.6;
        }
      ` }} />

      {/* 1. Navigation Breadcrumb Banner */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between text-xs font-serif uppercase tracking-widest text-[#7d603a] font-bold">
        <Link href="/equipment" className="flex items-center gap-1.5 hover:text-[#0e3b2e] transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
        <span className="hidden sm:inline text-primary/40 font-sans normal-case">
          Equipment / {cleanTitle(parentLabel)} / {cleanTitle(product.title)}
        </span>
      </div>

      {/* 2. Main Detail Page Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
        
        {/* Left Side (40%): Big Product Image & Specifications */}
        <div className="lg:col-span-5 space-y-8 detail-fade-in">
          {/* Main Product Image */}
          <div className="relative aspect-square w-full bg-white border border-primary/5 rounded-3xl overflow-hidden shadow-sm">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-w-768px) 100vw, 500px"
              className="object-cover"
            />
          </div>

          {/* Specifications Table Card */}
          {specifications.length > 0 && (
            <div className="bg-white border border-primary/5 p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-serif font-bold border-b border-primary/5 pb-2">
                Technical Specifications
              </h4>
              <div className="divide-y divide-primary/5 text-xs">
                {specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2.5 font-sans">
                    <span className="text-primary/50 font-medium">{spec.label}</span>
                    <span className="text-primary font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side (60%): Description & Custom Order Wizard */}
        <div className="lg:col-span-7 space-y-8 detail-fade-in">
          
          {/* Title & Brand Header */}
          <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-[#7d603a] font-serif font-bold">
              {cleanTitle(brandLabel)}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight leading-tight">
              {cleanTitle(product.title)}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-primary/50 font-sans">
              <span className="flex items-center gap-1">
                <Compass className="w-4 h-4 text-accent" />
                Handcrafted Custom Build
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-accent" />
                Consultation Request Only
              </span>
            </div>
          </div>

          {/* Wizard or Description Container */}
          {!showWizard ? (
            <div className="bg-white border border-primary/5 p-8 md:p-12 rounded-3xl shadow-sm space-y-8">
              
              {/* Request Consultation Action Box */}
              <div className="bg-[#0e3b2e] p-6 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-inner">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                    Order Consultation
                  </h4>
                  <p className="text-xs text-white/70 font-sans leading-relaxed">
                    Custom draw weights, lengths, riser woods, and reinforcements.
                  </p>
                </div>
                <button
                  onClick={() => setShowWizard(true)}
                  className="px-6 py-2.5 bg-accent hover:bg-accent/90 text-primary font-serif font-bold text-xs tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
                >
                  Configure Build
                </button>
              </div>

              {/* Main Description */}
              <div 
                className="product-body-content text-slate-800 leading-relaxed font-sans text-sm md:text-base space-y-6"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            </div>
          ) : (
            // Consultation Form Wizard
            <div className="bg-white border border-primary/5 p-8 md:p-12 rounded-3xl shadow-sm space-y-8">
              
              {/* Wizard Steps Header */}
              <div className="flex items-center justify-between border-b border-primary/5 pb-4">
                <h4 className="text-xs uppercase tracking-widest text-[#7d603a] font-serif font-bold">
                  Custom Build Wizard
                </h4>
                <span className="text-xs font-sans text-primary/40">Step {wizardStep} of 3</span>
              </div>

              {/* Progress Indicator */}
              <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${(wizardStep / 3) * 100}%` }}
                />
              </div>

              {/* STEP 1: Specs */}
              {wizardStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-primary">Step 1: Draw Specifications</h3>
                  
                  {/* Weight Selector */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Preferred Draw Weight</label>
                    <select
                      value={drawWeight}
                      onChange={(e) => setDrawWeight(e.target.value)}
                      className="w-full bg-secondary text-primary border border-primary/10 rounded-xl p-2.5 text-xs outline-none focus:border-accent cursor-pointer"
                    >
                      {["30 lbs", "35 lbs", "40 lbs", "45 lbs", "50 lbs", "55 lbs", "60 lbs", "65 lbs", "70 lbs"].map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  {/* Draw Length Selector */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Preferred Draw Length</label>
                    <select
                      value={drawLength}
                      onChange={(e) => setDrawLength(e.target.value)}
                      className="w-full bg-secondary text-primary border border-primary/10 rounded-xl p-2.5 text-xs outline-none focus:border-accent cursor-pointer"
                    >
                      {["26 inches", "27 inches", "28 inches", "29 inches", "30 inches", "31 inches", "32 inches"].map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  {/* Hand Dominance */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Hand Dominance</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Right Hand", "Left Hand"].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setHandDominance(h)}
                          className={`py-2.5 text-xs font-sans rounded-xl border transition-all cursor-pointer ${
                            handDominance === h
                              ? "bg-primary text-secondary border-primary font-semibold"
                              : "bg-white border-primary/15 text-primary hover:border-primary/30"
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Upgrades */}
              {wizardStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-primary">Step 2: Timber &amp; Add-ons</h3>
                  
                  {/* Riser Wood Selector */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Core / Riser Wood</label>
                    <select
                      value={riserWood}
                      onChange={(e) => setRiserWood(e.target.value)}
                      className="w-full bg-secondary text-primary border border-primary/10 rounded-xl p-2.5 text-xs outline-none focus:border-accent cursor-pointer"
                    >
                      {["Ash (Included)", "Walnut (Included)", "Wenge (+100 EUR)", "Bocote (+100 EUR)", "Bespoke stabilized burls (+150 EUR)"].map((wd) => (
                        <option key={wd} value={wd}>{wd}</option>
                      ))}
                    </select>
                  </div>

                  {/* Checkbox Options */}
                  <div className="space-y-4 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hornOverlays}
                        onChange={(e) => setHornOverlays(e.target.checked)}
                        className="w-4.5 h-4.5 border border-primary/20 rounded accent-accent"
                      />
                      <span className="text-xs font-sans text-primary">Add custom horn tip overlays and riser overlays (+60 EUR)</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customVeneers}
                        onChange={(e) => setCustomVeneers(e.target.checked)}
                        className="w-4.5 h-4.5 border border-primary/20 rounded accent-accent"
                      />
                      <span className="text-xs font-sans text-primary">Select premium outer limb veneers (+80 EUR)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact */}
              {wizardStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-primary">Step 3: Contact Details</h3>
                  
                  {/* Full Name */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full bg-secondary text-primary border rounded-xl p-2.5 text-xs outline-none focus:border-accent ${
                        errors.fullName ? "border-red-500" : "border-primary/10"
                      }`}
                    />
                    {errors.fullName && <span className="text-[10px] text-red-500 font-sans">{errors.fullName}</span>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className={`w-full bg-secondary text-primary border rounded-xl p-2.5 text-xs outline-none focus:border-accent ${
                          errors.email ? "border-red-500" : "border-primary/10"
                        }`}
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-sans">{errors.email}</span>}
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+380..."
                        className={`w-full bg-secondary text-primary border rounded-xl p-2.5 text-xs outline-none focus:border-accent ${
                          errors.phone ? "border-red-500" : "border-primary/10"
                        }`}
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 font-sans">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Country / Region</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Ukraine, Germany"
                      className={`w-full bg-secondary text-primary border rounded-xl p-2.5 text-xs outline-none focus:border-accent ${
                        errors.country ? "border-red-500" : "border-primary/10"
                      }`}
                    />
                    {errors.country && <span className="text-[10px] text-red-500 font-sans">{errors.country}</span>}
                  </div>

                  {/* Custom Engraving */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-serif uppercase tracking-wider text-[#7d603a] font-bold">Special Requests or Engravings (Optional)</label>
                    <textarea
                      value={customEngraving}
                      onChange={(e) => setCustomEngraving(e.target.value)}
                      placeholder="e.g. Custom name engraving on the riser, target draw weight tips..."
                      rows={3}
                      className="w-full bg-secondary text-primary border border-primary/10 rounded-xl p-2.5 text-xs outline-none focus:border-accent resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Completion Screen */}
              {wizardStep === 4 && (
                <div className="text-center py-10 space-y-6">
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-accent animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-primary">Request Submitted</h3>
                    <p className="text-sm text-primary/80 font-sans max-w-md mx-auto leading-relaxed">
                      Thank you, {fullName}. Your custom build configuration for the {cleanTitle(product.title)} has been sent. Jan Franko or the bowyer will reach out to you within 48 hours for review.
                    </p>
                  </div>
                  <div className="pt-4 flex justify-center gap-4">
                    <Button onClick={() => setShowWizard(false)} variant="primary">
                      Close Configurator
                    </Button>
                    <Button href="/equipment" variant="outline">
                      Return to Catalog
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              {wizardStep < 4 && (
                <div className="flex justify-between items-center pt-6 border-t border-primary/5">
                  <button
                    onClick={handlePrevStep}
                    className="text-xs font-serif font-bold tracking-widest uppercase hover:text-accent transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-secondary font-serif font-bold text-xs tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    {wizardStep === 3 ? "Submit Request" : "Continue"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
