# AI Product Studio — Operating Protocol

Business owner: repository owner. All AI agents use GitHub issues and pull requests as the shared, durable source of truth.

## Roles
- **Grok Bot — research + creative producer.** Gather source-linked customer problems, competitors, current prices, proposed differentiators and distribution ideas. Make 2 short-form video SCRIPT drafts based only on real product functionality. May comment on issues, never publish ads/videos or claim testimonials.
- **Cursor Cloud Agent — engineering.** Choose one approved, small GitHub issue. Implement on a branch with tests, screenshots, rollback notes and a pull request. Do not alter billing, secrets, domains or production.
- **ChatGPT — portfolio reviewer.** Daily scheduled review: inspect open issues, PR checks, live products and any real funnel/financial numbers accessible. Prioritize next experiment, flag blockers and propose approvals. No claim that ChatGPT can run as an event-driven GitHub worker without a configured integration.
- **GitHub Actions — deterministic gate.** Run tests automatically for each PR and main-branch change. Agents cannot self-certify production readiness.
- **Owner — approval gate.** Approves expenditures, new accounts, public posts, customer outreach, publishing and promotions, real checkout, and production release where appropriate.

## Bounded event-driven cycle
1. Grok Bot routine (weekdays at 8 AM America/Denver) opens/updates at most **2** evidence-backed GitHub idea issues, only if fewer than 3 vetted ideas await engineering. No duplicate research or invented demand.
2. Cursor Automation triggers on an explicitly approved issue (manually marked `ready-for-build` in Cursor's workflow), starts **at most one task** and produces a PR. If the label is unavailable, use a manual approved PR/issue URL trigger instead.
3. GitHub CI tests each PR. Failure returns to Cursor on the same PR, up to **2 retries**. On continued failure: stop, mark blocked, await review. No new issue created just because a failure happened.
4. Grok Bot reviews the PR/demo against buyer value, accessible copy, and security implications; leave a GitHub review comment. Independent review does not override failing CI.
5. ChatGPT daily review summarizes tests, evidence, priorities and real performance. Human approves merges and releases. A release never automatically generates unlimited new tasks.
6. On approved release, Grok Bot drafts **up to 2** accurate social-video scripts and a short SEO guide. Keep as drafts awaiting approval; if approved, render using a properly licensed tool such as HeyGen and publish through connected authorized channels.
7. Assess real signups, demos, conversions, revenue, acquisition cost, churn and support. If not available, say 'not measured.' Only renew/expand opportunities showing signs of buyer demand.

## Guardrails
- DO NOT create self-retriggering loops (bot message -> bot message -> bot message) without a task state transition.
- Timeboxing: at most 2 new researched ideas per weekday; max 1 code PR in flight per repo; max 2 review/retry cycles; max 2 draft videos per approved release.
- No production data copying; no real customer health or payroll data; no secrets in prompts or GitHub issues. Grok Bot's Bots share one cloud computer and logins — grant least privilege.
- No silent purchases, credit consumption beyond already-authorized plan limits, domain changes, ad activation, paid API calls, email blasts, mass social posting or false paid testimonials.
- Fact-check claims. Synthetic on-camera speakers must not imitate real people without permission, and realistic AI content should follow platform labeling rules and FTC disclosures.
- Stop on missing integration, failed authorization, payment approval, or repeated errors. Notify owner with specific blocker rather than trying indefinitely.

## Success criteria / weekly operating scorecard
- Evidence-backed buyer conversations, qualified leads, demo requests, actual trials and paid conversions
- MRR, gross profit, churn, CAC, cost of AI/API calls, hosting, refunds and total owner hours
- Per-product deploy success, uptime, crash rate, support backlog, source attribution, conversion on content
- Never interpret number of apps, number of videos or views alone as profit

## Implementation / access to enable
- In Cursor: connect both GitHub repositories; configure one Automation for reviewed issues and PRs. Use https://cursor.com/automations .
- In Grok Bot: connect GitHub, create `Opportunity Scout` and `Video Producer` Bots, then test and save two scoped routines; do not enable auto-publish.
- In ChatGPT: daily scheduled coordination review of these same repositories; this is a periodic audit, not an API webhook between providers.
- For videos: use actual screen recordings/product captures and truthful scripts; rendering and external publishing stay disabled until the owner authorizes the content channel and budget.

## First tasks
PracticalKit: improve QuickQuote and FinishLine repeat-use paid workflows; free calculators already deployed to Cloudflare, AdSense not yet approved.
Niche Hunter: paid research engine still lacks strong verified cross-platform data and working subscriber authentication; preserve private source, do not publish a thin free research tool as Pro.
Revenue first: sell 5 genuine pilots, discover which problem gets paid for, then automate more production. Target is not a guarantee.
