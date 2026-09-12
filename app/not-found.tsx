import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center bg-[#0e3b2e] px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">404 · Path not found</p>
        <h1 className="mt-5 font-serif text-5xl font-bold sm:text-7xl">This trail ends here</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">The page may have moved, or the address may be incomplete. Return to the main path or browse the current programs.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-[#0e3b2e]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Return home</Link>
          <Link href="/programs" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white hover:border-accent"><Search aria-hidden="true" className="h-4 w-4" />Browse programs</Link>
        </div>
      </div>
    </main>
  );
}

