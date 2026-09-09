import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Jan Franko Traditional Archery Academy",
  description:
    "Terms and conditions governing workshops, range safety, and field expeditions for Jan Franko Traditional Archery Academy."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-secondary text-primary pt-28 pb-20 select-text font-sans">
      <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">
        
        {/* Simple Header */}
        <div className="border-b border-primary/10 pb-6 space-y-2">
          <nav className="text-xs text-primary/60 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-semibold">Terms &amp; Conditions</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-primary/70 font-sans">
            Terms governing participation in academy workshops, field courses, and expeditions.
          </p>
        </div>

        {/* Legal Text Body */}
        <div className="space-y-8 text-sm text-primary/85 leading-relaxed font-sans">
          
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              1. General Scope
            </h2>
            <p>
              These Terms &amp; Conditions apply to all participants enrolling in traditional archery workshops, field courses, mountain/steppe expeditions, or using resources provided by Jan Franko Traditional Archery Academy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              2. Field Range Safety &amp; Rules
            </h2>
            <p>
              Safety is paramount on all field archery ranges:
            </p>
            <ul className="list-disc list-inside space-y-1 text-primary/80">
              <li>Arrows may only be nocked when straddling the active firing line upon instructor command.</li>
              <li>Participants must immediately stop drawing/shooting upon hearing <em>"STOP"</em> or <em>"CEASE FIRE"</em>.</li>
              <li>Equipment (bow limbs, string, arrow shafts) must be inspected for safety prior to shooting.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              3. Physical Fitness &amp; Medical Disclosures
            </h2>
            <p>
              Participants must disclose prior rotator cuff, joint, or spinal injuries prior to heavy bow draw or high-altitude mountain terrain modules. Instructors reserve the right to adjust draw weight or shooting stances for safety.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              4. Weather &amp; Field Adaptation
            </h2>
            <p>
              Field courses in alpine, steppe, or forest environments take place outdoors. Severe weather conditions (high winds, lightning, sub-zero frost) may require rescheduling or substituting indoor technical workshops.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-primary border-b border-primary/10 pb-1">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the Slovak Republic and applicable European Union regulations.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
