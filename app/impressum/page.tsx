import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum (Legal Notice) | Jan Franko Traditional Archery Academy",
  description:
    "Official company identification, legal notice, and provider information for Jan Franko Traditional Archery Academy."
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-28 pb-20 select-text font-sans">
      <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">
        
        {/* Simple Header */}
        <div className="border-b border-primary/10 pb-6 space-y-2">
          <nav className="text-xs text-primary/60 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-semibold">Impressum</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
            Impressum (Legal Notice)
          </h1>
          <p className="text-xs sm:text-sm text-primary/70 font-sans">
            Information according to Section 5 TMG / EU E-Commerce Directive.
          </p>
        </div>

        {/* Legal Text Body */}
        <div className="space-y-8 text-sm text-primary/85 leading-relaxed font-sans">
          
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              1. Provider Identification
            </h2>
            <div className="space-y-1 text-sm text-primary/80">
              <p><strong>Academy Name:</strong> Jan Franko Traditional Archery Academy</p>
              <p><strong>Director &amp; Representative:</strong> Jan Franko</p>
              <p><strong>Registered Address:</strong> Podunajská 23, 941 48 Podhájska, Slovak Republic (EU)</p>
              <p><strong>Primary Field Locations:</strong> Tyrol (Austria) &amp; Košice / Podhájska (Slovakia)</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              2. Contact Information
            </h2>
            <div className="space-y-1 text-sm text-primary/80">
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
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              3. Professional Qualifications
            </h2>
            <ul className="list-disc list-inside space-y-1 text-primary/80">
              <li>Certified Traditional Archery Instructor (Henry Bodnik &amp; Chris Mozolowski Field Certifications)</li>
              <li>Graduate of the 1st School of Traditional Chinese Medicine (Prague, 2000–2003)</li>
              <li>25+ years experience in therapeutic bodywork, TCM diagnostics, and archery biomechanics</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              4. Copyright &amp; Dispute Resolution
            </h2>
            <p>
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
      </div>
    </main>
  );
}
