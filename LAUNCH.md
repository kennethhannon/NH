# PracticalKit launch plan — 11 Nov 2026

## Confirmed status, not assumptions

- Source pushed to GitHub: `kennethhannon/NH`.
- Four working client-side beta applications: Settlement Studio, FinishLine, Shift Math, QuickQuote.
- Automated numeric tests: 9 tests passing locally as of this version.
- End-to-end browser smoke tests: authored and scheduled in GitHub Actions. **Not yet observed passing in hosted CI**.
- GitHub Pages: blocked until Pages is activated by the repository owner. Vercel is an alternate host.
- No payment processor, subscribers, verified demand, analytics, user reviews, or actual revenue.

## Release gates

1. CI math tests and end-to-end smoke tests both green on latest main commit.
2. Production Vercel URL returns pages and assets; check errors on mobile/desktop.
3. Privacy notice and disclaimers reviewed; verify business/trade names and domain availability.
4. Do 10 moderated demos: 5 local independent contractors, 3 homeowners or project managers, 2 night-shift workers.
5. Ask each user to finish one real task. Collect consented feedback on what they would pay for and why.
6. Offer paid service only after Stripe account, checkout, deliverable definition, refund policy, support contact, and private-data handling are in place.
7. Measure demo → report completed → returning users → paying customers. No fabricated testimonials or reviews.

## Prioritized sales experiments (do not assert revenue)

- **QuickQuote**: visit small remodelers, handymen, painters; offer a free 5-minute estimate demo. Ask if they need a repeatable template and client-signature flow. Hypothesis: $19–$39/month if mobile job history, branding, and client acceptance are added.
- **FinishLine**: show to home inspectors and small GC crews. Ask whether documented before/after photos and a weekly inspection report could replace their spreadsheets. Hypothesis: $12–$29/month team workflow, not yet built.
- **Settlement Studio**: SEO around replacement-cost math; collect feedback from claimants about export requirements, comparable evidence, state rules. One-time paid report only once verified.
- **Shift Math**: ask nurses/MLS teams to compare screenshots of real **redacted** pay rules, not employee data. Restrict to illustrative calculations until a payroll subject-matter review.

## Example transparent outreach copy (do not auto-send spam)

**Contractors:** “I built a free mobile estimate tool for small renovation jobs: line items, materials, labor, deposit, and print-to-PDF. Could I get 10 minutes to watch you build a real estimate with it? I’m testing whether it saves time and would appreciate feedback. No purchase needed.”

**Homeowners:** “I made a free punch-list tool for documenting bad finishing work with photos, costs and a printable report. I’d love a few testers who are managing renovations. I made the tool and want feedback; this is not a sponsored recommendation.”

## Next product ideas, researched as hypotheses

1. **Inspection recheck reports** — contractor returns to photos and closes outstanding issues; job-level subscription. Strong adjacency to FinishLine.
2. **Painter estimate wizard** — walls/ceilings area × prep/coat/labor rates; strong local-service purchase intent; requires robust assumptions.
3. **Change-order approval tool** — track job scope changes, signature, and priced change-orders for sole-proprietor trades. Needs secure auth and signatures.
4. **On-call night-shift scheduling** — nights and rotating schedules with differential forecast; repeat usage, but crowded.
5. **Used car shopping inspection template** — budget-focused checklist and repair-cost estimator; one-time upsell.
6. **MLS non-patient QC reminders** — high-value niche B2B, but defer until workflow interviews, auditability and compliance checks.

## Focus rule

Run the first ten demos and close one paying customer before funding a dozen new apps. A portfolio can follow proof of demand; unvalidated software alone earns $0.
