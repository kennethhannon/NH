# AI Product Studio — Unattended Operating Policy

**Owner intent:** Keep the existing Grok Bot → GitHub → ChatGPT → Cursor → review pipeline advancing without repeatedly asking the owner to choose between "post now", "expand", or "hold". This is standing guidance for LOW-RISK research, draft content, issue updates, and PR preparation, not a waiver of security approvals.

## Decision policy (no routine user questions)

1. **Post a useful partial result now** if the research has an identified buyer, a concrete recurring problem, at least two independently checkable relevant citations, and clear caveats. Use GitHub issue #13. A post is an internal working research note, NOT a public claim of proven demand.
2. **Expand once, then post with gaps** if the initial result is thin. Timebox to one additional research attempt. Identify missing data. Do not ask the owner whether to expand or post.
3. **Skip duplicate or stale work.** Read the most recent issue comments before every run, and contribute only substantive new evidence or a correction. No new comment simply because a schedule fired.
4. **One research update per weekday maximum**, unless directly correcting an important error. Prefer source-verified competitor pricing, willingness-to-pay evidence, acquisition channels and buyer interviews. Mark speculation as such.
5. **Video Producer:** Draft up to one accurate 20–35s demo storyboard in issue #14 on each approved feature release; do not repeat an existing approved draft. The draft is for owner review. No paid rendering, publication or ad boosting.
6. **Cursor engineering:** Work only on an explicitly accepted, narrow issue; at most one draft PR per issue. Run CI; add regression tests; fix failures on the same PR up to two bounded attempts, then mark blocked. Never self-trigger workflows by adding/changing issue labels.
7. **ChatGPT daily coordination:** At 8:30 AM America/Denver inspect issues #13/#14 and open draft PRs. Incorporate new research, review test failures, report blockers, and suggest or implement at most one safe nonproduction engineering increment when the backlog permits.
8. **Business decision:** Favor one repeat-use contractor paid pilot first (quote → signed scope/change-order → photo closeout) and test demand with real buyers. In parallel, advance genuinely differentiated Niche Hunter Pro behind private access. Do not misrepresent Hacker News mentions, social views, or estimates as purchases.
9. **Heartbeat:** If GitHub, scheduled routines, or PR triggers fail, leave one concise blocker note in the relevant issue and retry on the next scheduled run; do not spam the owner or loop indefinitely. Escalate a real blocker in one consolidated weekly status report.

## Actions preauthorized for internal workflow

- Read connected public/private repos through the existing approved GitHub connection.
- Research official public sources without creating new paid accounts.
- Write sourced findings and draft marketing plans to existing GitHub issues #13 and #14.
- Create/edit a feature branch and **draft** PR for a clearly accepted small task; add tests. No production merge or deployment.
- Run checks that are included in existing allowances.
- Decide internally among "post", "expand", and "hold" using the above criteria.

## Actions that REQUIRE the owner's specific approval

- Purchases, paid/API usage, upgrading a subscription, enabling overage billing, adding payment methods or credit top-ups.
- Creating or charging customer subscriptions, sending unsolicited outreach, committing to obligations or accepting legal terms.
- Publishing videos or social posts on public platforms, buying advertising, presenting synthetic influencer testimonials or real-person likenesses without consent.
- Merge/deploy to production, DNS changes, secret access/changes, customer or personal data exports, deleting significant resources, modifying access controls.
- Changes to external app permissions beyond the previously approved integration scope.

**Never request broad blanket approval for risky actions.** Do not disable Grok Bot's Auto Review or security. A routine permission card may still appear: only use an app-provided narrow Always allow rule for GitHub comments to specified internal issues if the rule clearly matches the intended action. Leave purchases and public publishing on Ask first.

## Explicit reality checks

- GitHub issue updates have been verified; Grok Bot's **routine activation state is not independently readable** by ChatGPT, so report "unverified" until the app shows an active scheduled routine and a successful run.
- The Cursor NH independent PR-review automation is active but its actual review-comment execution is not yet verified.
- Cursor's separate niche-hunter Approved Issue Builder is INACTIVE due to wrong PR-vs-issue label trigger. Do not represent it as running or put a label on a PR to work around the problem.
- ChatGPT's daily automation is enabled. It can poll GitHub; it does not directly command Grok Bot's private chat.
- Current paying customers, MRR, AdSense status and attributable marketing conversions are not independently verified; mark unmeasured metrics "not measured".

## One-time Grok Bot setup instruction

If a Grok Bot is awaiting the owner's selection between "Post it Monday", "Expand it first", and "Hold", its desired default is **post any sufficiently sourced internal GitHub draft immediately** under the conditions above, expand only if it lacks evidence, and save/enable a scoped weekday routine after successful posting. Do not repeat the choice on every run.

The owner should only need to confirm one time that the routine is active in Grok Bot's Routines section. That app configuration cannot be performed through a GitHub file or ChatGPT's current connector alone.

References: https://docs.x.ai/grok-bot/skills-routines-and-automations and https://docs.x.ai/grok-bot/approvals-security-and-privacy
