import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArcheryTransition } from "@/components/ArcheryTransition";
import GoogleTranslate from "@/components/GoogleTranslate";

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
  title: "Jan Franko - Traditional Archery",
  description: "A traditional archery academy focused on structured training, cultural study, and expeditions exploring historic archery traditions.",
  icons: {
    icon: "https://janfranko.com/wp-content/uploads/2026/03/Frame-212.svg",
    shortcut: "https://janfranko.com/wp-content/uploads/2026/03/Frame-212.svg",
    apple: "https://janfranko.com/wp-content/uploads/2026/03/Frame-212.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://janfranko.com",
    title: "Jan Franko - Traditional Archery",
    description: "A traditional archery academy focused on structured training, cultural study, and expeditions exploring historic archery traditions.",
    siteName: "Jan Franko - Traditional Archery",
    images: [
      {
        url: "https://janfranko.com/Jan.png",
        width: 1024,
        height: 682,
        alt: "Jan Franko - Traditional Archery",
      },
    ],
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
      </body>
    </html>
  );
}
