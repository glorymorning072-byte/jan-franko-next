import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum (Legal Notice) | Jan Franko Traditional Archery Academy",
  description:
    "Official company identification, legal notice, and provider information for Jan Franko Traditional Archery Academy."
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary select-text font-sans">
      {/* Distinct Dark Hero Section with Generous Vertical Padding */}
      <section className="relative border-b border-primary/10 bg-[#0e3b2e] text-white pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 space-y-3">
          <nav className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-accent/80 font-semibold">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-accent/50" />
            <span className="text-white font-bold">Impressum</span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Impressum (Legal Notice)
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-sans max-w-xl leading-relaxed">
              Information according to Section 5 TMG / EU E-Commerce Directive.
            </p>
          </div>
        </div>
      </section>

      {/* Clean Minimal Text Body */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-14 md:py-20 space-y-10">
        
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            1. Provider Identification
          </h2>
          <div className="space-y-1.5 text-sm text-primary/80">
            <p><strong>Academy Name:</strong> Jan Franko Traditional Archery Academy</p>
            <p><strong>Director &amp; Representative:</strong> Jan Franko</p>
            <p><strong>Registered Address:</strong> Podunajská 23, 941 48 Podhájska, Slovak Republic (EU)</p>
            <p><strong>Primary Field Locations:</strong> Tyrol (Austria) &amp; Košice / Podhájska (Slovakia)</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            2. Contact Information
          </h2>
          <div className="space-y-1.5 text-sm text-primary/80">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:janfranko@tutanota.com" className="text-[#7d603a] hover:underline font-medium">
                janfranko@tutanota.com
              </a>
            </p>
            <p>
              <strong>Phone / WhatsApp:</strong>{" "}
              <a href="https://wa.me/436641645360" target="_blank" rel="noopener noreferrer" className="text-[#7d603a] hover:underline font-medium">
                +43 664 164 53 60
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            3. Professional Qualifications
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-primary/80">
            <li>Certified Traditional Archery Instructor (Henry Bodnik &amp; Chris Mozolowski Field Certifications)</li>
            <li>Graduate of the 1st School of Traditional Chinese Medicine (Prague, 2000–2003)</li>
            <li>25+ years experience in therapeutic bodywork, TCM diagnostics, and archery biomechanics</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            4. Copyright &amp; Dispute Resolution
          </h2>
          <p className="text-sm text-primary/80 leading-relaxed">
            All content published on this website (text, images, monographs, layout) is protected by European Union copyright laws. Any unauthorized duplication or distribution requires prior written consent.
          </p>
          <p className="pt-2 text-xs text-primary/70">
            EU Online Dispute Resolution Platform:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7d603a] underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . We are neither obliged nor committed to participating in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </section>

      </div>
    </main>
  );
}
