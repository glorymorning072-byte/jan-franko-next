import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Admissions | Jan Franko Traditional Archery Academy",
  description:
    "Inquire about custom bow builds, training cohorts, steppe camp registrations, or academy partnerships.",
  openGraph: {
    title: "Contact & Admissions | Jan Franko Traditional Archery Academy",
    description:
      "Inquire about custom bow builds, training cohorts, steppe camp registrations, or academy partnerships.",
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
