import { NextResponse } from "next/server";
import { fetchWpJson } from "@/lib/wp";
import {
  BOW_REVIEW_BY_SLUG,
  FALLBACK_EQUIPMENT_PRODUCTS,
  formatMinorPrice,
  inferEquipmentCategory,
  type EquipmentProduct,
} from "@/data/equipment";
import { EQUIPMENT_CATEGORIES } from "@/data/site";

type StoreProduct = {
  id: number;
  slug: string;
  name: string;
  permalink?: string;
  date_created?: string;
  description?: string;
  short_description?: string;
  is_in_stock?: boolean;
  low_stock_remaining?: number | null;
  sold_individually?: boolean;
  add_to_cart?: { text?: string; description?: string };
  prices?: { price?: string; currency_code?: string; currency_minor_unit?: number };
  images?: Array<{ src?: string; alt?: string }>;
};

type WpProduct = {
  id: number;
  slug: string;
  date?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  excerpt?: { rendered?: string };
  featured_media?: number;
  yoast_head_json?: { og_image?: Array<{ url?: string }> };
};

type MediaItem = { id: number; source_url: string; alt_text?: string };

export const dynamic = "force-dynamic";

const categoryLabel = (slug: EquipmentProduct["category"]) => EQUIPMENT_CATEGORIES.find((item) => item.slug === slug)?.name || "Equipment";

function applyPublicationPolicy(product: EquipmentProduct): EquipmentProduct {
  const review = BOW_REVIEW_BY_SLUG[product.slug];
  if (!review) return product;
  return {
    ...product,
    title: review.title,
    excerpt: review.summary,
    content: "",
    image: null,
    imageAlt: "",
    price: null,
    currency: null,
    stockStatus: "inquiry",
    purchasable: false,
    purchaseUrl: null,
    publicationStatus: review.publicationStatus,
    provenance: review.imageDecision,
  };
}

async function fetchStoreProducts(): Promise<EquipmentProduct[]> {
  const products = await fetchWpJson<StoreProduct[]>("/wp-json/wc/store/v1/products?per_page=100", { revalidate: 300 });
  if (!Array.isArray(products) || products.length === 0) throw new Error("WooCommerce Store API returned no products.");

  return products.map((item) => {
    const category = inferEquipmentCategory(item.slug, item.name);
    const inStock = item.is_in_stock !== false;
    const price = formatMinorPrice(item.prices?.price, item.prices?.currency_minor_unit ?? 2);
    const purchasable = inStock && price !== null;
    return applyPublicationPolicy({
      id: item.id,
      slug: item.slug,
      title: item.name,
      excerpt: item.short_description || "",
      content: item.description || "",
      date: item.date_created || "",
      image: item.images?.[0]?.src || null,
      imageAlt: item.images?.[0]?.alt || item.name,
      category,
      categoryLabel: categoryLabel(category),
      price,
      currency: item.prices?.currency_code || null,
      stockStatus: inStock ? "in-stock" : "out-of-stock",
      purchasable,
      purchaseUrl: purchasable ? `https://janfranko.com/?add-to-cart=${item.id}` : item.permalink || null,
      publicationStatus: "published",
      provenance: item.images?.[0]?.src ? "WooCommerce product image supplied by the Jan Franko catalog." : "No product image supplied.",
    });
  });
}

async function fetchWordPressProducts(): Promise<EquipmentProduct[]> {
  const products = await fetchWpJson<WpProduct[]>("/wp-json/wp/v2/product?per_page=100", { revalidate: 600 });
  if (!Array.isArray(products)) throw new Error("WordPress product response was invalid.");

  const mediaIds = Array.from(new Set(products.map((item) => item.featured_media).filter((id): id is number => Boolean(id))));
  const mediaMap: Record<number, MediaItem> = {};
  if (mediaIds.length > 0) {
    try {
      const media = await fetchWpJson<MediaItem[]>(`/wp-json/wp/v2/media?include=${mediaIds.join(",")}&per_page=100`, { revalidate: 86_400 });
      media.forEach((item) => { mediaMap[item.id] = item; });
    } catch {
      // A product can still be rendered without an image; never substitute a generic bow.
    }
  }

  return products.map((item) => {
    const title = item.title?.rendered || item.slug;
    const category = inferEquipmentCategory(item.slug, title);
    const media = item.featured_media ? mediaMap[item.featured_media] : undefined;
    const image = item.yoast_head_json?.og_image?.[0]?.url || media?.source_url || null;
    return applyPublicationPolicy({
      id: item.id,
      slug: item.slug,
      title,
      excerpt: item.excerpt?.rendered || "",
      content: item.content?.rendered || "",
      date: item.date || "",
      image,
      imageAlt: media?.alt_text || title,
      category,
      categoryLabel: categoryLabel(category),
      price: null,
      currency: null,
      stockStatus: "inquiry",
      purchasable: false,
      purchaseUrl: null,
      publicationStatus: "published",
      provenance: image ? "Existing Jan Franko WordPress media-library product image." : "No product image supplied.",
    });
  });
}

export async function GET() {
  try {
    let products: EquipmentProduct[];
    let source: "woocommerce" | "wordpress";
    try {
      products = await fetchStoreProducts();
      source = "woocommerce";
    } catch {
      products = await fetchWordPressProducts();
      source = "wordpress";
    }

    return NextResponse.json(
      { products, source, reviewedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    console.error("Equipment catalog fallback activated:", error);
    return NextResponse.json(
      { products: FALLBACK_EQUIPMENT_PRODUCTS, source: "verified-fallback", reviewedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" } },
    );
  }
}
