import LegalDocument from "@/components/LegalDocument";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Shipping | Jan Franko",
  description: "Shipping, international delivery, and commissioned-equipment dispatch information.",
  canonicalUrl: "/shipping",
});

export default function ShippingPage() {
  return (
    <LegalDocument title="Shipping" intro="How delivery quotes, international orders, and commissioned equipment dispatch are handled. Last reviewed 12 September 2026.">
      <section><h2>Shipping quote</h2><p>Available destinations, carriers, costs, taxes, and delivery estimates must be shown or confirmed for the specific order. Oversized bows, targets, and custom equipment may require a manual quote.</p></section>
      <section><h2>Custom and commissioned work</h2><p>Build time is separate from transit time. The bowyer or Academy confirms completion, final payment, packing, shipping cost, and the available delivery service before dispatch.</p></section>
      <section><h2>International orders</h2><p>Import VAT, customs duties, brokerage fees, local restrictions, and permits can depend on the destination and are not represented as included unless the checkout or written quotation explicitly says so.</p></section>
      <section><h2>Damage or delivery problem</h2><p>Keep all packaging, photograph the parcel and item, and contact <a href="mailto:contact@janfranko.com">contact@janfranko.com</a> promptly with the order reference. Do not use damaged archery equipment.</p></section>
      <section><h2>Production dependency</h2><p>Final live rates and supported destinations depend on the production WooCommerce shipping zones and carrier configuration. They require merchant-side configuration and a destination-by-destination checkout test.</p></section>
    </LegalDocument>
  );
}
