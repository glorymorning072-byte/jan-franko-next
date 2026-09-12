import type { MetadataRoute } from "next";
import { MASTER_BOWYERS } from "@/data/bowyers";
import { BASE_URL } from "@/lib/seo";

const routes = [
  "",
  "/about",
  "/about/jan-franko",
  "/about/partners",
  "/academy",
  "/academy/raptor-path",
  "/academy/special-practice-retreats",
  "/academy/archers-virtues",
  "/academy/training-philosophy",
  "/academy/code-of-conduct",
  "/archery-games",
  "/programs",
  "/equipment",
  "/equipment/arrow-configurator",
  "/contact",
  "/impressum",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
  "/payment-methods",
  "/shipping",
  "/safety-legal-overview",
  "/knowledge",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((route) => ({
      url: new URL(route || "/", BASE_URL).toString(),
      lastModified: now,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/programs" || route === "/equipment" ? 0.9 : 0.7,
    })),
    ...MASTER_BOWYERS.map((bowyer) => ({
      url: new URL(`/bowyer/${bowyer.slug}`, BASE_URL).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
