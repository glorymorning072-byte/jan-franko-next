import LegalDocument from "@/components/LegalDocument";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Payment Methods | Jan Franko",
  description: "Verified payment information for Jan Franko equipment purchases and commissioned bows.",
  canonicalUrl: "/payment-methods",
});

export default function PaymentMethodsPage() {
  return (
    <LegalDocument title="Payment Methods" intro="How payment availability is confirmed for catalog purchases and commissioned bows. Last reviewed 12 September 2026.">
      <section><h2>What is confirmed</h2><p>For an in-stock product, the secure checkout displays the payment methods currently enabled by the store operator for that order. A method is available only when it appears in checkout.</p></section>
      <section><h2>Commissioned bows</h2><p>Custom bow commissions follow the written commission agreement: a 50% deposit begins the build, and the remaining 50% plus shipping becomes due under the agreed completion and delivery terms.</p></section>
      <section><h2>No unsupported payment claims</h2><p>This page deliberately does not advertise card brands, wallets, financing, currencies, or regional methods that have not been verified in the production payment account. If checkout does not show a suitable method, contact <a href="mailto:contact@janfranko.com">contact@janfranko.com</a> before sending funds.</p></section>
      <section><h2>Production dependency</h2><p>The final payment-method list depends on the merchant payment gateway and WooCommerce configuration. It must be confirmed with a real production checkout after the merchant credentials are connected.</p></section>
    </LegalDocument>
  );
}
