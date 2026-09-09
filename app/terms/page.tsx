import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Jan Franko Traditional Archery Academy",
  description:
    "Terms and conditions governing workshops, range safety, and field expeditions for Jan Franko Traditional Archery Academy."
};

export default function TermsPage() {
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
            <span className="text-white font-bold">Terms &amp; Conditions</span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-sans max-w-xl leading-relaxed">
              Terms governing participation in academy workshops, field courses, and expeditions.
            </p>
          </div>
        </div>
      </section>

      {/* Clean Minimal Text Body */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-14 md:py-20 space-y-10">
        
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            1. General Scope
          </h2>
          <p className="text-sm text-primary/80 leading-relaxed">
            These Terms &amp; Conditions apply to all participants enrolling in traditional archery workshops, field courses, mountain/steppe expeditions, or using resources provided by Jan Franko Traditional Archery Academy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            2. Field Range Safety &amp; Rules
          </h2>
          <p className="text-sm text-primary/80 leading-relaxed">
            Safety is paramount on all field archery ranges:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-primary/80">
            <li>Arrows may only be nocked when straddling the active firing line upon instructor command.</li>
            <li>Participants must immediately stop drawing/shooting upon hearing <em>"STOP"</em> or <em>"CEASE FIRE"</em>.</li>
            <li>Equipment (bow limbs, string, arrow shafts) must be inspected for safety prior to shooting.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            3. Physical Fitness &amp; Medical Disclosures
          </h2>
          <p className="text-sm text-primary/80 leading-relaxed">
            Participants must disclose prior rotator cuff, joint, or spinal injuries prior to heavy bow draw or high-altitude mountain terrain modules. Instructors reserve the right to adjust draw weight or shooting stances for safety.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            4. Weather &amp; Field Adaptation
          </h2>
          <p className="text-sm text-primary/80 leading-relaxed">
            Field courses in alpine, steppe, or forest environments take place outdoors. Severe weather conditions (high winds, lightning, sub-zero frost) may require rescheduling or substituting indoor technical workshops.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-2">
            5. Governing Law
          </h2>
          <p className="text-sm text-primary/80 leading-relaxed">
            These terms are governed by the laws of the Slovak Republic and applicable European Union regulations.
          </p>
        </section>

      </div>
    </main>
  );
}
