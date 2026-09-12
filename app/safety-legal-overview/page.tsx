import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Safety & Legal Overview | Jan Franko",
  description: "Essential safety, medical-readiness, insurance, conduct, and intellectual-property information for Academy activities.",
  canonicalUrl: "/safety-legal-overview",
});

export default function SafetyLegalOverviewPage() {
  return (
    <LegalDocument
      title="Safety & Legal Overview"
      intro="Essential responsibilities for traditional archery training, outdoor programs, and expeditions."
    >
      <section>
        <h2>1. Inherent Risk &amp; Environmental Exposure</h2>
        <p>
          Archery uses potentially dangerous equipment. Outdoor programs may also involve uneven ground, remote locations, changing weather, heat, cold, altitude, animals, transport, and delayed access to medical assistance. Participation can reduce but cannot eliminate these risks.
        </p>
      </section>

      <section>
        <h2>2. Safety Commands &amp; Instructor Authority</h2>
        <ul>
          <li>Never nock or draw an arrow unless the shooting area is declared clear and the instructor authorises shooting.</li>
          <li>Immediately lower the bow and stop when any stop or cease-fire command is given.</li>
          <li>Never dry-fire a bow. Inspect limbs, string, nocks, shafts, and points before use.</li>
          <li>Use only equipment, draw weight, targets, and shooting distances approved for the session.</li>
          <li>Follow all site-specific boundaries, retrieval procedures, and protective-equipment instructions.</li>
        </ul>
        <p>
          The instructor may modify or stop an activity, reject unsafe equipment, or remove a participant whose condition or conduct creates a safety risk. There is no place for bravado or pressure to continue when conditions are unsafe.
        </p>
      </section>

      <section>
        <h2>3. Medical Disclosure &amp; Readiness</h2>
        <p>
          Participants must provide relevant and accurate information about injuries, allergies, medication, mobility, cardiovascular or respiratory conditions, and other matters that may affect safe participation. Participation is voluntary; a participant should stop and report pain, dizziness, confusion, loss of coordination, unusual fatigue, or any other concerning symptom immediately.
        </p>
        <p>
          Information on this website is educational and operational, not medical advice. Seek advice from a qualified health professional when uncertain about fitness for a program. The Academy may require medical clearance for higher-intensity or remote activities.
        </p>
      </section>

      <section>
        <h2>4. Minors, Insurance &amp; Travel</h2>
        <p>
          Participation by a minor requires prior written approval and consent from a parent or legal guardian. Participants are responsible for travel documents and for obtaining insurance appropriate to their program, including archery or sporting activity, medical treatment, evacuation, cancellation, and repatriation where relevant. Exact requirements are provided before a booking is accepted.
        </p>
      </section>

      <section>
        <h2>5. Assumption of Risk &amp; Program Documents</h2>
        <p>
          Program-specific risk information, participation requirements, and any waiver or acknowledgement are supplied before final acceptance. A website summary is not a substitute for those documents and does not exclude or restrict liability where exclusion is prohibited by law.
        </p>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>
          Academy training material, written guides, photographs, course structures, and other original content may not be reproduced, sold, or presented as another person&apos;s work without prior written permission. Personal notes may be made for private study unless a session-specific rule says otherwise.
        </p>
      </section>

      <section className="legal-source-note">
        <h2>Document status</h2>
        <p>
          This page carries forward the safety topics used on the current live site and consolidates them for the rebuilt site. Program-specific operating procedures still require Jan Franko&apos;s confirmation, and the liability language requires review by qualified Slovak/EU counsel before production approval.
        </p>
      </section>
    </LegalDocument>
  );
}

