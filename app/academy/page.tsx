import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Feather, Moon, ShieldCheck, Target } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "The Academy | Jan Franko",
  description: "Traditional archery training grounded in safe practice, cultural respect, body mechanics, and field experience.",
  canonicalUrl: "/academy",
});

const academyAreas = [
  {
    href: "/academy/raptor-path",
    title: "The Raptor Path",
    label: "Progression",
    description: "A symbolic progression through instinct, patience, precision, focus, leadership, and night awareness.",
    icon: Feather,
  },
  {
    href: "/academy/special-practice-retreats",
    title: "Special Practice Retreats",
    label: "Small cohorts",
    description: "Focused 24–96 hour retreat formats with clear prices, restrictions, and individual suitability review.",
    icon: Moon,
  },
  {
    href: "/academy/archers-virtues",
    title: "The Archer’s Virtues",
    label: "Character",
    description: "Seven virtues that guide conduct, responsibility, accurate attribution, and respect for every tradition.",
    icon: ShieldCheck,
  },
  {
    href: "/academy/training-philosophy",
    title: "Training Philosophy",
    label: "Practice",
    description: "Instinctive precision, meditative breath, natural settings, and form-led development.",
    icon: Compass,
  },
  {
    href: "/academy/code-of-conduct",
    title: "Code of Conduct",
    label: "Safety & respect",
    description: "The behaviour, range discipline, environmental care, and mutual respect expected in Academy activities.",
    icon: BookOpen,
  },
  {
    href: "/archery-games",
    title: "Archery Games",
    label: "Planned gatherings",
    description: "Proposed traditional archery disciplines and participation information; dates remain unannounced until confirmed.",
    icon: Target,
  },
] as const;

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-secondary pt-20 text-primary">
      <section className="relative overflow-hidden bg-[#0e3b2e] px-6 py-20 text-white md:px-12 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,168,128,0.17),transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Jan Franko Academy</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">The path of the bow, taught with context</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
            Structured traditional archery training that connects form and breath with cultural study, field experience, safety, and personal responsibility.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6c512f]">Academy structure</p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Explore the practice</h2>
          <p className="mt-4 text-sm leading-7 text-primary/75 sm:text-base">
            Start with the training philosophy and virtues, review the progression path, or explore a retreat. Availability, suitability, equipment, and safety requirements are confirmed personally before any booking.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {academyAreas.map((area) => {
            const Icon = area.icon;
            return (
              <article key={area.href} className="flex min-h-72 flex-col rounded-3xl border border-primary/10 bg-white/75 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-[#0e3b2e] p-3 text-accent"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                  <span className="text-right text-[10px] font-bold uppercase tracking-[0.18em] text-[#6c512f]">{area.label}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-bold">{area.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-primary/70">{area.description}</p>
                <Link href={area.href} className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-primary/20 px-5 py-2 text-sm font-bold transition hover:border-primary hover:bg-primary hover:text-white">
                  Read more <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-primary/10 bg-white/55 px-6 py-14 md:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Find the right place to begin</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-primary/75">Tell Jan about your experience, goals, preferred location, and any relevant equipment or accessibility needs.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/programs" className="inline-flex min-h-12 items-center rounded-full bg-[#0e3b2e] px-7 py-3 text-sm font-bold text-white hover:bg-[#09281f]">Browse programs</Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center rounded-full border border-primary/20 px-7 py-3 text-sm font-bold hover:border-primary">Contact Jan</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
