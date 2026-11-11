# PracticalKit launch and first-revenue playbook — November 2026

## Current truthful status
- Working GitHub repository and calculator unit tests.
- Public website **not verified**. For commercial launch, use Cloudflare Pages Git integration; connect the GitHub repository and set build command `npm run build`, output directory `dist`, production branch `main`. GitHub Pages is intended for a project showcase, not commerce/SaaS hosting.
- No payment acceptance, subscription, buyers, or revenue yet. Do not advertise paid reports as available.
- Product terms/branding are provisional; check conflicts before commercial sale.

## Release gate
1. Connect Cloudflare Pages to GitHub and deploy this repository (or choose a commercial Vercel Pro plan). Verify the live URL; do not use GitHub Pages for a website primarily aimed at commerce.
2. Verify all live URLs on mobile and desktop. Run Quality Gate (Node tests + Chromium smoke tests).
3. Confirm sample estimates, browser exports, photo handling, imported backups, print/PDF output, and large-project browser storage behavior.
4. Publish a real contact/support method, privacy notice, terms, refund policy, and accessibility check; do not post personal contact info automatically.
5. Connect Stripe **in the seller's account** and create a genuine test checkout and small real product before a paid link appears.
6. Review all legal/policy language: settlement and shift tools provide illustrative calculations, not insurance or wage-law determinations.

## Which app to sell first?
1. **FinishLine** for owner walkthroughs + remodelers: price-test a $19 one-project export pack or a $15/month solo contractor plan **after** features and payments exist. Value proposition: capture issues, attach photos, print a record.
2. **Settlement Studio** for claimants: test a $9 one-time report template, but users need accurate explanations and evidence capture. Do not claim the output can determine mandatory reimbursements.
3. **Shift Math** as a free acquisition tool: subscription potential depends on payroll-grade accuracy and recurring historical reports; do not charge yet.

## Demand tests
- In 7 days, seek 10 genuine conversations with owner-remodelers, flooring inspectors, small contractors, or renovation managers. Avoid unsolicited bulk messages.
- Ask what they currently use, how long it takes to create a report, and what they would pay for faster reporting. Do not prime them with a price first.
- Offer a **free** beta link for feedback; do not post until the link is live. Respect each community's self-promotion policies.
- Track visits and feedback only after consent-aware measurement is installed; no made-up traffic, testimonials, screenshots, or reviews.
- Test a manually delivered **service** (project report preparation from user-supplied information) rather than promising a software subscription too early.

## Suggested first outreach (edit to fit actual recipient)
"Hi — I built a free browser-based punch-list tool for documenting incomplete renovation work with photos, priorities, and printable reports. I'm looking for 5 remodelers or homeowners to test it on a real job and tell me what is missing. No purchase required. Would you be open to trying it?"

## More product experiments (priority is hypothetical)
| Rank | Concept | Audience | First paid outcome | Key risk |
|---|---|---|---|---|
| 1 | Contractor change-order builder | Remodelers | Signed scope with cost and approval record | Many competitors |
| 2 | Small-shop field inspection reports | Flooring, roofing, paint specialists | Client-ready inspection PDF | Mobile/photo UX |
| 3 | HVAC service quote builder | Solo HVAC shops | Estimate and invoice templates | Pricing liability |
| 4 | Laboratory inventory and expiry tracker | Small clinical labs | Inventory, expiry and QC reminders with audit log | Validation/security |
| 5 | Used-car buying decision report | Private car buyers | Reliability/repair reserve worksheet | Trust and data sourcing |
| 6 | Overnight shift roster | Healthcare shift staff | Shift calendar + expected gross | Employer-specific rules |
| 7 | Renovation material estimator | Owner renovators | Shopping list and cost worksheet | Material waste assumptions |
| 8 | EV charging ROI model | Fleet/home EV owners | Scenario and payback worksheet | Data freshness |
| 9 | Insurance claim evidence organizer | Claimants | Timeline + document inventory | Privacy/security |
| 10 | Macro pressure tracker | Retail investors | Scenario dashboard | Data licensing, accuracy, crowded market |

## Financial discipline
Avoid paid APIs and recurring services until traffic or a paying pilot exists. At $19 per sale, $950 gross needs **50 sales**, before card fees, taxes, refunds, hosting, and support. A monthly plan is useful only if customers have recurring work. The limiting factor is likely distribution, not code volume.

## Publish destinations
- GitHub repo: https://github.com/kennethhannon/NH
- Cloudflare Git deployment: https://developers.cloudflare.com/pages/get-started/git-integration/
- GitHub Pages settings (noncommercial demo only): https://github.com/kennethhannon/NH/settings/pages
- Github Actions: https://github.com/kennethhannon/NH/actions

## Delegating to Cursor and Grok
Use the same repo, but keep an issue per product. Cursor: implement one acceptance-tested feature per PR; never enable billing directly. Grok: independent review for math edge cases, legal-claim wording, privacy, and accessibility. Bring critiques into GitHub issues; never merge without reproducible tests.
