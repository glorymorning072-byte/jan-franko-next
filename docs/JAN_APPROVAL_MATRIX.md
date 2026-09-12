# Jan Franko approval matrix

Last code review: 12 September 2026

This is an evidence register, not a blanket “complete” claim. An item becomes release-ready only after its stated test passes in the target deployment. Merchant, legal, DNS, rights, and native-language decisions remain with the relevant owner or specialist.

## Implemented in this branch

| Area | Implementation | Verification gate |
| --- | --- | --- |
| Equipment loading | Immediate verified fallback plus time-limited live catalog refresh; no permanent “Loading Catalog…” page | Production build; local route and delayed/offline API test |
| Equipment departments | Bows; Master Bowyers; Targets; Arrows & Shafts; Quivers & Accessories; Training Kits | Each filter opens and returns the correct department or an honest empty state |
| Bow accuracy | 22 named bows pass through a publication gate; unresolved sales listings and images are withheld | `npm run verify:content`; inspect `/equipment/verification` and every controlled bow route |
| Aurelion / Silverion / Samsara | Marked design-in-development; mismatched photos removed | Owner supplies and approves original artwork before publication |
| English Yew Warbow | Source-only reference page using the supplied Mary Rose standard; former photo removed | Owner approves a rights-cleared, correctly identified photo |
| Slavic / Ancient Rus bow | Source-only reference page using supplied Ancient Rus sources; hooked image removed | Owner approves a rights-cleared reconstruction or credited academic diagram |
| Master Bowyers | Separate profiles for Warrick Harvey, MR Bows / Miško Rovčanin, and Kadys Bows / Sergey Tolochko; Herlan excluded; commission flow included | Cross-check text and photographs against the supplied master guide and official sources |
| Arrow Configurator | Rebuilt route with live-site options, validation, weights, and manual-review submission | Exercise every option group and success/failure delivery paths |
| Programs | Same-origin API, local fallback, filters, Zemiansky corporate event and six locations | Test each URL filter, search, reset, modal, and failed/successful application submission |
| Academy | Raptor Path, Special Practice Retreats, Archer’s Virtues, Training Philosophy, Code of Conduct, and Archery Games status | Internal-link crawl and content check against owner material |
| Contact | Exact five inquiry categories; official email, phone, and WhatsApp; failed delivery is never shown as success | Test 4xx/5xx/offline and confirmed backend delivery |
| Feedback | “Help Us Improve the Academy” form with supplied wording and optional discount-code email | Confirm backend receives all six fields and owner’s code-delivery process |
| Translation controls | 34-language registry; consent-gated Google Translate; protected-name markup and mutation protection | Test every language; native-speaker review remains required for semantic quality |
| Legal/support | Privacy, terms, refund, impressum, safety, payment-method, and shipping pages | Austrian/EU legal review plus merchant-detail confirmation before release |
| SEO/404 | Canonicals, robots, sitemap, branded 404; no fake client-side hreflang | Crawl deployed canonical domain and validate Google Search Console after migration |
| Consent | Essential and functional categories; translation blocked until consent; no analytics/marketing scripts currently installed | Browser storage/network inspection before and after each consent choice |

## External release blockers

| Blocker | Required owner input/access | Why code cannot truthfully invent it |
| --- | --- | --- |
| Checkout and payment methods | Production WooCommerce gateway credentials, merchant approval, and test orders | The enabled methods and settlement behavior exist in the payment account |
| Currency/region pricing | Store currency/geo rules and tax configuration | UI-only conversion would not be a chargeable checkout price |
| Shipping rates | WooCommerce zones, carriers, package dimensions, destinations, taxes/duties policy | Rates and supported destinations are merchant/carrier data |
| Customer accounts | Production WooCommerce account configuration and transactional email test | Account creation, password reset, and order history require the live backend |
| Form delivery | Production form secret, receiving mailbox, spam policy, and end-to-end receipt confirmation | A frontend success response is not proof that an email arrived |
| Legal identity/text | Legal form, full service address, registration/VAT identifiers where applicable, counsel approval | These facts are absent or legally sensitive |
| Bow imagery | Jan’s prototype artwork and rights-cleared, subject-verified historical bow photographs | Visual resemblance is not historical identification or a usage licence |
| Native translations | Qualified review of all public copy in every supported language | “Do not translate” controls names, not linguistic accuracy of every sentence |
| Email/DNS | DNS/mail-provider access and forwarding requirements | MX/SPF/DKIM/DMARC are outside the repository |
| Real hreflang | Locale-specific crawlable URLs and translated server-rendered pages | Client-side Google Translate does not create indexable language URLs |
| Production deployment | Vercel/project access and environment variables | Local build success is not production availability |

## Required pre-release test matrix

- Viewports: 320, 360, 375, 390, 430, 768, 1024, 1366, and 1440 CSS pixels.
- Browsers: current Chrome, Firefox, Edge, and Safari; real iOS Safari and Android Chrome for final sign-off.
- Visitor flows: navigation, all program filters, equipment categories, compare, price/availability filters, arrow configuration, bowyer commissions, contacts, feedback, cart, checkout, account, policies, language consent, keyboard-only use, and 404.
- Failure flows: offline APIs, timeouts, backend rejection, empty catalog, missing image, sold-out product, invalid configurator input, and declined/failed payment in the merchant sandbox.
- Evidence: retain route/viewport screenshots, browser console/network results, backend receipt/order IDs, and the tested commit SHA.

