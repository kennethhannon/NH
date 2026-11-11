# PracticalKit — Public Beta

Three lightweight web tools. Free and private-by-default: input values are processed locally and never sent to a server.

- **Settlement Studio**: model total-loss settlement offers, replacement vehicle costs, loan balance, and asking-price comparables.
- **FinishLine**: contractor punch lists, resized photos, statuses, cost summaries, local autosave, JSON import/export, and printable reports.
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

## Deploy

The repo contains `.github/workflows/pages.yml`. In **GitHub → Settings → Pages**, choose **GitHub Actions** as the build and deployment source. Push to `main` to deploy to GitHub Pages. The Pages workflow may not work until Pages is enabled in repository settings.

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
