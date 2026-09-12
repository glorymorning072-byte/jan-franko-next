# Program inventory and pricing gate

Last reviewed: 12 September 2026

The canonical fallback program records are in `data/programs.ts` and are used when the live WordPress feed is unavailable. They must remain aligned with the production CMS.

Pricing rule: do not invent prices. The only supplied retreat guidance currently recorded for editorial review is 24 hours from €250, 48 hours €490, 72–96 hours from €750, and private custom pricing. No program price becomes transactional until Jan confirms the final structure, inclusions, taxes, currency, availability, and cancellation terms.

Before release, export the live program feed and reconcile every title, type, status, region, location, date, capacity, description, image, booking mode, and price against `data/programs.ts`. In particular, confirm the Zemiansky corporate event uses `Zruby Dúbrava, Zemiansky Vrbovok 125, 962 41` and `https://maps.app.goo.gl/qSnTn4Xv527XThck9`.
