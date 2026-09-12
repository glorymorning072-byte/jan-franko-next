import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Jan Franko",
  description: "How Jan Franko Traditional Archery Academy collects, uses, and protects personal information.",
  canonicalUrl: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Privacy Policy" intro="How personal information is handled when you browse the site, submit an inquiry, or request a commission.">
      <section>
        <h2>1. Data Controller</h2>
        <p>
          The controller is Jan Franko Traditional Archery Academy, represented by Jan Franko, Podunajská 23, 941 48 Podhájska, Slovak Republic. Privacy inquiries may be sent to <a href="mailto:contact@janfranko.com">contact@janfranko.com</a> or by phone/WhatsApp at <a href="https://wa.me/436641645360">+43 664 164 53 60</a>.
        </p>
      </section>

      <section>
        <h2>2. Information We Process</h2>
        <ul>
          <li><strong>Contact and commission inquiries:</strong> name, contact details, request text, and bow or program specifications you choose to provide.</li>
          <li><strong>Program applications:</strong> the application fields you submit, which may include emergency-contact, experience, and health-readiness information required for safe assessment.</li>
          <li><strong>Technical records:</strong> security and delivery logs that hosting or server providers create, such as IP address, browser type, requested route, and timestamp.</li>
          <li><strong>Consent preferences:</strong> the on-device record of the cookie categories you accepted or rejected.</li>
        </ul>
        <p>Please do not send unnecessary medical or other sensitive information through a general contact form.</p>
      </section>

      <section>
        <h2>3. Purposes and Legal Bases</h2>
        <p>
          Inquiries and applications are processed to respond to your request and take steps before a contract (Article 6(1)(b) GDPR). Security and reliable operation are based on legitimate interests (Article 6(1)(f)). Optional functional services, including website translation, load only after consent (Article 6(1)(a)); consent can be withdrawn at any time through Cookie settings.
        </p>
      </section>

      <section>
        <h2>4. Service Providers and International Processing</h2>
        <p>
          The rebuilt site is hosted through Vercel. Inquiry forms may be forwarded to the Academy&apos;s existing WordPress form service. If you enable functional translation, Google Translate resources are requested from Google. These providers may process technical information outside your country; their contractual and transfer safeguards must be confirmed as part of production legal review.
        </p>
      </section>

      <section>
        <h2>5. Cookies and Optional Services</h2>
        <p>
          Essential storage supports consent choices and basic site operation. Functional translation is disabled until the visitor accepts Functional cookies. No analytics, advertising pixels, or marketing scripts are included in this codebase at the date of this policy. If such tools are added later, this notice and the consent controls must be updated before they are enabled.
        </p>
      </section>

      <section>
        <h2>6. Retention and Security</h2>
        <p>
          Personal information is kept only for as long as needed to answer a request, administer a booking or commission, meet legal record-keeping duties, or resolve a dispute. Access should be limited to people and providers who need it. Exact retention periods for production systems must be confirmed before launch.
        </p>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p>
          Subject to the GDPR and applicable law, you may request access, correction, deletion, restriction, portability, or objection, and may withdraw consent without affecting earlier lawful processing. You may also complain to the Slovak Office for Personal Data Protection at <a href="https://dataprotection.gov.sk" target="_blank" rel="noreferrer">dataprotection.gov.sk</a>.
        </p>
      </section>

      <section className="legal-source-note">
        <h2>Policy sources &amp; review status</h2>
        <p>
          This version is based on the Academy&apos;s existing live-site privacy notice and the data flows visible in this rebuild. It is an operational draft pending verification of production processors, retention periods, and review by qualified Slovak/EU counsel.
        </p>
        <p><a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noreferrer">Official source: Regulation (EU) 2016/679 (GDPR)</a></p>
      </section>
    </LegalDocument>
  );
}
