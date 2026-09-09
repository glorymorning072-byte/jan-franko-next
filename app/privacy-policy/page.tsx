import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Jan Franko Traditional Archery Academy",
  description:
    "GDPR-compliant privacy policy detailing data processing and protection rights for Jan Franko Traditional Archery Academy."
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-28 pb-20 select-text font-sans">
      <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">
        
        {/* Simple Header */}
        <div className="border-b border-primary/10 pb-6 space-y-2">
          <nav className="text-xs text-primary/60 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-semibold">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-primary/70 font-sans">
            How we handle personal data under the EU General Data Protection Regulation (GDPR).
          </p>
        </div>

        {/* Legal Text Body */}
        <div className="space-y-8 text-sm text-primary/85 leading-relaxed font-sans">
          
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              1. Data Controller
            </h2>
            <p>
              The data controller for this website under Article 4(7) GDPR is:
            </p>
            <div className="text-xs text-primary/80 space-y-0.5 font-sans">
              <p><strong>Jan Franko Traditional Archery Academy</strong></p>
              <p>Representative: Jan Franko</p>
              <p>Podunajská 23, 941 48 Podhájska, Slovak Republic</p>
              <p>Email: <a href="mailto:janfranko@tutanota.com" className="text-[#7d603a] underline">janfranko@tutanota.com</a></p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              2. Data We Collect
            </h2>
            <div className="space-y-2 text-primary/80">
              <p>
                <strong>A. Admission &amp; Contact Queries:</strong> When you send an inquiry, we process the information you provide (name, email address, phone number, message content) to respond to your request (Art. 6(1)(b) GDPR).
              </p>
              <p>
                <strong>B. Server Logs:</strong> Web servers automatically collect access logs (IP address, browser version, timestamp) to maintain site security and stability (Art. 6(1)(f) GDPR).
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              3. Cookies &amp; Third-Party Services
            </h2>
            <p>
              We do not use intrusive cross-site advertising cookies or tracking pixels. Hosting infrastructure is provided by Vercel Inc. under GDPR-compliant data processing terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              4. Your Rights Under GDPR
            </h2>
            <p>
              You have the right to request access to (Art. 15), correction of (Art. 16), or deletion of (Art. 17) your personal data. You may also lodge a complaint with a supervisory authority (Úrad na ochranu osobných údajov SR: <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-[#7d603a] underline">www.dataprotection.gov.sk</a>).
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
