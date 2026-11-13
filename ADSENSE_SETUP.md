# PracticalKit advertising activation — requires owner's account and approval

Current state: NO ADS LIVE. NO PUBLISHER ID. NO VERIFIED AD REVENUE.

Google AdSense only serves ads after domain ownership verification and site review. A custom domain is strongly recommended; Cloudflare workers.dev is not a substitute for an owned brand domain for the normal AdSense site-submission flow.

Before activating:
1. Choose and register an owned domain in your name. Do not buy until price, renewal fees, trademark risks and owner approval are reviewed. Connect DNS to Cloudflare.
2. Sign in to an AdSense account you actually control; add the exact domain and choose site verification method.
3. Cloudflare project build environment: add ADSENSE_PUBLISHER_ID=ca-pub-<your real digits> to inject a verification meta tag and an accurate ads.txt file. Keep ADSENSE_ADS_ENABLED unset during review.
4. Request and receive AdSense status Ready (may be denied if site has thin content or policy problems). Add original high-value guides and do human usability/privacy review.
5. Configure a Google-certified consent management platform appropriate for EEA/UK/Switzerland; address US privacy/state obligations and update legal notices. Set ADSENSE_CMP_READY=true ONLY after validation.
6. Set ADSENSE_ADS_ENABLED=true on your production Cloudflare build only after approval and consent setup; new build injects Auto Ads script into each page. The code deliberately prevents early activation and refuses malformed publisher IDs.
7. Test from real devices; do not click your own ads, encourage clicks, auto-refresh ads, hide content under ad overlays, or mislead users.
8. Use Search Console + Cloudflare analytics after privacy review; measure real page RPM, impressions and organic visits. Do not promise any RPM.

The publisher ID is public but must belong to the actual owner. Never invent an account or ad sales. For paid SaaS, consider eliminating ads on authenticated work pages and reserving ads for freely browsable guide/tool content.
