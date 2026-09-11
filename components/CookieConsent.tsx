"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentChoice = localStorage.getItem("jf_cookie_consent");
    if (!consentChoice) {
      // Delay display slightly for smooth page load
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("jf_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleEssential = () => {
    localStorage.setItem("jf_cookie_consent", "essential");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-[#0e3b2e] text-white p-5 rounded-3xl shadow-2xl border border-[#c5a880]/30 z-[999] animate-in slide-in-from-bottom-5 duration-300 notranslate">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
              <Cookie className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Cookie &amp; Privacy Notice
            </h4>
          </div>
          <button
            onClick={handleEssential}
            className="p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-white/80 font-sans leading-relaxed">
          We use essential functional cookies (such as language preferences via Google Translate) to ensure smooth site operation. No intrusive cross-site advertising trackers are used. Learn more in our{" "}
          <Link href="/privacy-policy" className="text-accent underline font-semibold hover:text-white transition-colors">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-3 bg-accent hover:bg-accent/90 text-primary font-serif font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            Accept Cookies
          </button>
          <button
            onClick={handleEssential}
            className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-serif font-semibold text-[11px] uppercase tracking-wider rounded-xl transition-all border border-white/10 cursor-pointer"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
