import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Impressum & Legal Notice | Jan Franko",
  description: "Provider identification and contact information for Jan Franko Traditional Archery Academy.",
  canonicalUrl: "/impressum",
});

export default function ImpressumPage() {
  return (
    <LegalDocument title="Impressum & Legal Notice" intro="Provider identification and contact information for this website.">
      <section>
        <h2>Provider</h2>
        <p>
          <strong>Jan Franko Traditional Archery Academy</strong><br />
          Represented by Jan Franko<br />
          Podunajská 23<br />
          941 48 Podhájska<br />
          Slovak Republic
        </p>
        <p>Primary field activity takes place in Austria and Slovakia, with programs offered at the locations identified on the relevant program page.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:contact@janfranko.com">contact@janfranko.com</a><br />
          Phone / WhatsApp: <a href="https://wa.me/436641645360">+43 664 164 53 60</a>
        </p>
      </section>

      <section>
        <h2>Responsible for Editorial Content</h2>
        <p>Jan Franko, at the provider address shown above.</p>
      </section>

      <section>
        <h2>Copyright</h2>
        <p>
          Unless a separate credit states otherwise, the Academy&apos;s original text, training material, photographs, and layout are protected by applicable copyright law. Reproduction or commercial reuse requires prior written permission. Rights in credited third-party material remain with their respective owners.
        </p>
      </section>

      <section>
        <h2>Consumer Dispute Resolution</h2>
        <p>
          Contact <a href="mailto:contact@janfranko.com">contact@janfranko.com</a> first so that a concern can be addressed directly. The former EU Online Dispute Resolution platform was discontinued and Regulation (EU) No 524/2013 was repealed with effect from 20 July 2025. Any legally required statement about participation in a national consumer-arbitration procedure must be confirmed with Slovak counsel before production launch.
        </p>
      </section>

      <section className="legal-source-note">
        <h2>Required owner verification</h2>
        <p>
          The provider name, legal form, business-register number, tax/VAT identifiers, competent register, and any regulated-profession disclosures have not been supplied in the project materials. These fields cannot be guessed and must be confirmed by Jan Franko and qualified Slovak/EU counsel before this legal notice is approved for production.
        </p>
        <p><a href="https://eur-lex.europa.eu/eli/reg/2024/3228/oj/eng" target="_blank" rel="noreferrer">Official source: Regulation (EU) 2024/3228 discontinuing the EU ODR platform</a></p>
      </section>
    </LegalDocument>
  );
}
