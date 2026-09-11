import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArcheryTransition } from "@/components/ArcheryTransition";
import GoogleTranslate from "@/components/GoogleTranslate";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jan-franko-next.vercel.app"),
  title: "Jan Franko - Traditional Archery",
  description: "A traditional archery academy focused on structured training, cultural study, and expeditions exploring historic archery traditions.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/wp-assets/favicon-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jan-franko-next.vercel.app",
    title: "Jan Franko - Traditional Archery",
    description: "A traditional archery academy focused on structured training, cultural study, and expeditions exploring historic archery traditions.",
    siteName: "Jan Franko - Traditional Archery",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jan Franko - Traditional Archery",
        type: "image/png",
      },
      {
        url: "/og-square.png",
        width: 512,
        height: 512,
        alt: "Jan Franko Emblem",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Franko - Traditional Archery",
    description: "A traditional archery academy focused on structured training, cultural study, and expeditions exploring historic archery traditions.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased scroll-smooth overflow-x-hidden max-w-full`}
    >
      <body className="min-h-full flex flex-col relative bg-[#f0e9d9] text-[#0e3b2e] overflow-x-hidden max-w-full">
        <GoogleTranslate />
        <Navbar />
        <main className="flex-grow">
          <ArcheryTransition>
            {children}
          </ArcheryTransition>
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
