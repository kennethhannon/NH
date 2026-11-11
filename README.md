# PracticalKit — Public Beta

Four lightweight web tools. Free and private-by-default: input values are processed locally and never sent to a server.

- **Settlement Studio**: model total-loss settlement offers, replacement vehicle costs, loan balance, and asking-price comparables.
- **FinishLine**: contractor punch lists, resized photos, statuses, cost summaries, local autosave, JSON import/export, and printable reports.
- **QuickQuote**: itemized contractor estimates with labor, taxable materials, discounts, deposits, printable reports and local backups.
- **Shift Math**: overnight shifts, unpaid breaks, night differential, simple overtime models, and gross-pay comparison.

## Run locally

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. These are ES modules and must be served over HTTP, not opened from the filesystem.

## Test

```sh
npm test
```

Node.js >= 18 required for tests.

## Build and hosting

Run `npm run build` to generate a static `dist/` directory containing the four apps, homepage, privacy page, and assets (without private development files).

**For a commercial site:** Cloudflare Pages is the recommended starting host; connect the GitHub repository `kennethhannon/NH`, production branch `main`, build command `npm run build`, output directory `dist`. After deploying, verify the actual `*.pages.dev` URL before sharing. An owner must connect the accounts.

**Noncommercial showcase:** GitHub Pages can be enabled for a project demo, but GitHub does not permit using Pages primarily as a free storefront/business or commercial SaaS site. The Pages workflow is manual-only.

**Vercel:** its Hobby tier is restricted to noncommercial use; commercial sites require Pro or Enterprise. No live checkout or payment processor exists yet.

## Product limitations

- This is a working **beta**, not a paid application; no payment processing, authentication, telemetry or backend is connected.
- Settlement Studio is a **budget/negotiation estimator**, not a legal calculation of insurer obligations. Tax and fee reimbursement are jurisdiction/policy dependent.
- Shift Math uses an illustrative weekly overtime threshold and configurable differential treatment. Verify actual wage law, overtime regular-rate calculations and employer policies.
- FinishLine uses browser localStorage, which is device/browser-specific and subject to quota/eviction. Photo compression reduces storage requirements but does not eliminate them; download backups.
- Browser `Print` lets the user save output to PDF. This code does not silently create or upload PDFs.

## Privacy

All calculations and stored project data stay in the user's browser (except if the user deliberately exports and shares a backup). No analytics trackers are included.

## Next steps for commercialization

1. Interview 10-20 users in each niche; prove a real recurring pain and willingness to pay.
2. Add account sync, secure private storage, and properly tested PDF exports for high-value workflows.
3. Connect Stripe with disclosed fees and a refund policy; do not simulate a paid checkout.
4. Add clear support/contact pages, terms, privacy notice, and actual domain before paid launch.

All brand/product names are provisional and must be checked for legal conflicts before a commercial launch.

## Release and validation

`npm test` checks math. `python tests/browser_smoke.py` runs browser interactions using installed Playwright+Chromium; it also runs in GitHub Actions. See `LAUNCH.md` for acceptance, customer interviews, monetization steps and outstanding blockers.
