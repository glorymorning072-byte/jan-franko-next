"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { createConsent, readConsent, storeConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [functional, setFunctional] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    /* eslint-disable react-hooks/set-state-in-effect -- initialize from external consent storage */
    if (saved) setFunctional(saved.functional);
    else setVisible(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    const openPreferences = () => {
      const current = readConsent();
      setFunctional(current?.functional ?? false);
      setVisible(true);
      setPreferencesOpen(true);
    };
    window.addEventListener("jf:open-consent", openPreferences);
    return () => window.removeEventListener("jf:open-consent", openPreferences);
  }, []);

  const save = (allowFunctional: boolean) => {
    storeConsent(createConsent(allowFunctional));
    setFunctional(allowFunctional);
    setVisible(false);
    setPreferencesOpen(false);
  };

  if (!visible) return null;

  return (
    <div className="notranslate fixed inset-0 z-[100] flex items-end justify-center bg-[#051713]/30 p-3 sm:items-center sm:p-6" translate="no" role="presentation">
      <section
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#c5a880]/35 bg-[#0e3b2e] p-5 text-white shadow-2xl sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c5a880]/30 bg-[#c5a880]/15 text-[#c5a880]">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="cookie-consent-title" className="font-serif text-xl font-bold">Your privacy choices</h2>
              <p className="mt-1 text-xs leading-relaxed text-white/75">Essential storage is always active. The third-party translation service loads only if you allow functional cookies. No analytics or advertising tools are currently installed.</p>
            </div>
          </div>
          <button type="button" onClick={() => save(false)} className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Close and reject optional cookies">
            <X className="h-4 w-4" />
          </button>
        </div>

        {preferencesOpen && (
          <div className="mt-6 space-y-3" aria-label="Cookie categories">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div><p className="text-sm font-bold">Essential</p><p className="mt-1 text-[11px] leading-relaxed text-white/65">Stores this privacy choice and enables core security and form operation.</p></div>
              <span className="rounded-full bg-[#c5a880]/20 px-3 py-1 text-[10px] font-bold uppercase text-[#c5a880]">Always on</span>
            </div>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div><span className="text-sm font-bold">Functional translation</span><p className="mt-1 text-[11px] leading-relaxed text-white/65">Loads Google Translate only after permission. Google may set its own language-related cookies.</p></div>
              <input type="checkbox" checked={functional} onChange={(event) => setFunctional(event.target.checked)} className="h-5 w-5 accent-[#c5a880]" />
            </label>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 opacity-75">
              <div><p className="text-sm font-bold">Analytics</p><p className="mt-1 text-[11px] leading-relaxed text-white/65">No analytics platform or tracking script is installed.</p></div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase text-white/60">Not in use</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 opacity-75">
              <div><p className="text-sm font-bold">Marketing</p><p className="mt-1 text-[11px] leading-relaxed text-white/65">No advertising pixels or cross-site marketing trackers are installed.</p></div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase text-white/60">Not in use</span>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
          <button type="button" onClick={() => save(false)} className="min-h-11 rounded-xl border border-white/20 px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10">Reject optional</button>
          <button type="button" onClick={() => setPreferencesOpen((value) => !value)} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"><Settings2 className="h-4 w-4" />{preferencesOpen ? "Hide details" : "Manage choices"}</button>
          {preferencesOpen ? (
            <button type="button" onClick={() => save(functional)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#c5a880] px-4 text-xs font-bold uppercase tracking-wider text-[#0e3b2e] hover:bg-[#d4ba95]"><ShieldCheck className="h-4 w-4" />Save choices</button>
          ) : (
            <button type="button" onClick={() => save(true)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#c5a880] px-4 text-xs font-bold uppercase tracking-wider text-[#0e3b2e] hover:bg-[#d4ba95]"><Check className="h-4 w-4" />Allow functional translation</button>
          )}
        </div>

        <p className="mt-4 text-[10px] leading-relaxed text-white/55">You can reopen these choices from “Cookie settings” in the footer. Read the <Link href="/privacy-policy" className="text-[#c5a880] underline">Privacy Policy</Link> for service and retention details.</p>
      </section>
    </div>
  );
}
