"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Compass } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0e3b2e] text-[#f0e9d9] border-t border-accent/10 relative overflow-hidden select-text">
      {/* Premium radial decorative gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(197,168,128,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-10">
        
        {/* Column 1: Brand & Philosophy */}
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-accent font-bold block">
              Instinctive Discipline
            </span>
            <Link href="/" className="font-serif text-xl font-bold tracking-tight text-white hover:text-accent transition-colors block">
              Traditional Archery Academy
            </Link>
          </div>
          <p className="text-sm text-[#f0e9d9]/75 font-sans leading-relaxed max-w-sm font-medium">
            Studying and practicing traditional archery through real-world field environments, disciplined structural training, and authentic historical craftsman preservation.
          </p>
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-accent font-bold">
            <Compass className="w-4 h-4 text-accent" />
            <span>Central Europe &amp; Eurasian Steppes</span>
          </div>
        </div>

        {/* Column 2: The Academy Navigation */}
        <div className="space-y-4">
          <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-accent border-b border-white/5 pb-2">
            The Academy
          </h3>
          <ul className="space-y-2 text-xs font-sans font-medium text-[#f0e9d9]/80">
            <li>
              <Link href="/academy" className="hover:text-accent transition-colors block py-0.5 font-semibold text-white">
                Academy System Overview
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent transition-colors block py-0.5">
                Academy Profile
              </Link>
            </li>
            <li>
              <Link href="/about/jan-franko" className="hover:text-accent transition-colors block py-0.5">
                Jan Franko (Instructor)
              </Link>
            </li>
            <li>
              <Link href="/about/partners" className="hover:text-accent transition-colors block py-0.5">
                Vetted Bowyers &amp; Partners
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition-colors block py-0.5 font-semibold text-accent">
                Admission Inquiries
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Curriculum & Governance */}
        <div className="space-y-4">
          <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-accent border-b border-white/5 pb-2">
            Curriculum &amp; Governance
          </h3>
          <ul className="space-y-2 text-xs font-sans font-medium text-[#f0e9d9]/80">
            <li>
              <Link href="/academy/certification" className="hover:text-accent transition-colors block py-0.5">
                Certification &amp; Audit
              </Link>
            </li>
            <li>
              <Link href="/academy/explorer-rank-system" className="hover:text-accent transition-colors block py-0.5">
                Explorer Rank System
              </Link>
            </li>
            <li>
              <Link href="/academy/summit-protocol" className="hover:text-accent transition-colors block py-0.5">
                Summit Protocol (Tier III)
              </Link>
            </li>
            <li>
              <Link href="/academy/environmental-stress-index-esi" className="hover:text-accent transition-colors block py-0.5">
                Environmental Stress Index (ESI)
              </Link>
            </li>
            <li>
              <Link href="/academy/code-of-conduct" className="hover:text-accent transition-colors block py-0.5">
                Code of Conduct &amp; Neutrality
              </Link>
            </li>
            <li>
              <Link href="/archery-games" className="hover:text-accent transition-colors block py-0.5 font-semibold text-accent">
                Archery Games &amp; Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Location */}
        <div className="space-y-5">
          <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-accent border-b border-white/5 pb-2">
            Contact &amp; Location
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#f0e9d9]/80 font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>Tirol, Austria &amp; Košice, Slovakia</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <a href="mailto:janfranko@tutanota.com" className="hover:text-accent transition-colors">
                janfranko@tutanota.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <a href="https://wa.me/436641645360" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                +43 664 164 53 60
              </a>
            </li>
          </ul>

          {/* Social Icons row */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/share/16uZNxRu4R/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f0e9d9] hover:text-[#0e3b2e] hover:bg-accent transition-all"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3a5 5 0 00-5 5v2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/exploreradventures1978"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f0e9d9] hover:text-[#0e3b2e] hover:bg-accent transition-all"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
              </svg>
            </a>
            <a
              href="https://wa.me/436641645360"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f0e9d9] hover:text-[#0e3b2e] hover:bg-accent transition-all"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 345.24 345.24" fill="currentColor" className="w-4 h-4">
                <path d="M172.51,0C78.22,0,1.47,76.74,1.43,171.06c-.01,30.15,7.87,59.58,22.84,85.52L0,345.24l90.69-23.79c24.99,13.63,53.12,20.81,81.75,20.82h.07c94.28,0,171.03-76.75,171.07-171.07,.02-45.71-17.76-88.69-50.06-121.02C261.22,17.84,218.27,.02,172.51,0Zm0,313.38h-.06c-25.51,0-50.54-6.87-72.37-19.82l-5.19-3.08-53.81,14.12,14.36-52.47-3.38-5.38c-14.23-22.64-21.75-48.81-21.74-75.67,.03-78.4,63.82-142.18,142.25-142.18,37.98,.01,73.68,14.82,100.52,41.7,26.85,26.87,41.62,62.6,41.61,100.59-.03,78.4-63.82,142.19-142.19,142.19Zm77.99-106.49c-4.27-2.14-25.29-12.48-29.21-13.91-3.92-1.43-6.77-2.14-9.62,2.14-2.85,4.28-11.04,13.91-13.53,16.76-2.49,2.86-4.99,3.21-9.26,1.07-4.27-2.14-18.05-6.66-34.37-21.22-12.71-11.33-21.29-25.33-23.78-29.61-2.49-4.28-.27-6.59,1.88-8.72,1.92-1.91,4.27-4.99,6.41-7.49,2.14-2.5,2.85-4.28,4.27-7.14,1.42-2.85,.71-5.35-.36-7.49-1.07-2.14-9.62-23.18-13.18-31.74-3.47-8.33-6.99-7.21-9.62-7.34-2.49-.13-5.34-.15-8.19-.15s-7.48,1.07-11.4,5.35c-3.92,4.28-14.96,14.62-14.96,35.66s15.32,41.37,17.45,44.22c2.14,2.85,30.14,46.03,73.02,64.54,10.2,4.4,18.16,7.03,24.37,9,10.24,3.25,19.56,2.79,26.92,1.69,8.21-1.23,25.29-10.34,28.85-20.33,3.56-9.98,3.56-18.54,2.49-20.33-1.07-1.78-3.92-2.85-8.19-4.99Z" />
              </svg>
            </a>
            <a
              href="https://t.me/ExplorerAdventuresJF"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f0e9d9] hover:text-[#0e3b2e] hover:bg-accent transition-all"
              aria-label="Telegram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.2-.02-.08.02-1.3 1.15-3.66 2.75-.35.24-.66.36-.94.35-.32-.01-.93-.18-1.38-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.1.09.07.12.17.13.26.01.09 0 .2-.02.26z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar Details */}
      <div className="w-full border-t border-white/5 py-6 px-6 text-center text-xs text-[#f0e9d9]/50 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Traditional Archery Academy. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-semibold">
            <span>Preserving Craft &amp; Field Mastery</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Košice, Slovakia</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
