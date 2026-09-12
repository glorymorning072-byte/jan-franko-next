import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Admissions | Jan Franko Archery Academy",
  description: "Inquire about custom bow builds, training cohorts, steppe camp registrations, or academy partnerships.",
  canonicalUrl: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
