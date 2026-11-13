# Activate Cursor + Grok Bot + ChatGPT Studio

Goal: create a bounded recurring pipeline to research real customers, build tested apps, produce transparent product demo videos, and pursue actual paying customers. Not an infinite self-triggering loop.

## Step 1: Create Grok Bot 'Opportunity Scout'
Open Grok Bot on the same Cursor account. Connect GitHub with access to `kennethhannon/NH` and `kennethhannon/niche-hunter` (private).
First bot message to copy:
> You are my Opportunity Scout for a real software business. Every weekday at 8 AM America/Denver, research up to two HIGH-CONFIDENCE paying-customer problems, prioritizing small contractors and evidence-based niche intelligence. Check both GitHub repositories and AI_PRODUCT_STUDIO.md first. Search official competitor pricing and find the recurring buyer pain. Write or update GitHub issues with citations, pricing and validation questions, never invent leads, users, revenue, market size, trends or customer reviews. Do not purchase services, reveal my private code, contact customers or publish anything. If three unapproved ideas are already waiting, do not create more. Once you complete one good real research cycle, save it as a reusable skill and set a weekday routine. Report blockers, not fabricated results.

## Step 2: Create Grok Bot 'Video Producer'
Message to copy:
> You are my Product Demo Video Producer. Watch GitHub for *approved release* events in kennethhannon/NH; when a release is marked approved, produce up to TWO 20–35-second video drafts showcasing only features actually verified at the live PracticalKit URL. Give storyboards, scripts, on-screen text, captions, an authorized production plan (e.g. HeyGen) and a clear CTA. Provide a draft video only if my existing subscription can generate it at a cost I explicitly approved. Never publish to TikTok, Instagram, YouTube, or other services without my review. Never invent influencer testimonials, views, client outcomes or earnings; disclose realistic AI content and company relationship as required. Save the stable workflow as a skill; after a successful safe test, create a routine triggered narrowly by approved releases.

## Step 3: Cursor Automations
Use https://cursor.com/automations . Connect both repositories and create a cloud-agent Automation:
- Trigger: a GitHub issue manually tagged for engineering, or schedule once daily if issue-label triggers aren't available.
- Instruction: `Read AI_PRODUCT_STUDIO.md. Pick exactly one approved issue with a demonstrated buyer value and no active PR. Implement only that issue with tests and a branch PR. Run CI. Do not change billing, production, domains, secrets, account credentials or send customer messages. Stop after two failed repair attempts. Add a concise demo and cost risk in the PR. Never trigger on your own bot's comments.`
- Second Automation: on PR opened or updated, review CI results, security, unexpected data exposure and mobile UX. Post review results only; don't automatically merge.
- Test each Automation in sandbox/PR before enabling recurring runs. Daily cost and run quotas are owner-controlled.

## Step 4: ChatGPT review
A ChatGPT automation `AI Studio Daily Review` is scheduled for 8:30 AM America/Denver to inspect both connected repositories and summarize verified progress, blockers, costs and next approvals. It is not a GitHub webhook and cannot itself wake Cursor/Grok Bot without those accounts' event triggers.

## Step 5: release gate
Only merge/deploy after CI, product demo, accuracy/privacy review and owner approval. New release triggers video drafts; videos do not automatically trigger more engineering tasks. Customer feedback and real conversion data feed the next research sprint.

## First approved engineering work
- https://github.com/kennethhannon/NH/issues/12
- https://github.com/kennethhannon/niche-hunter/issues/2
- https://github.com/kennethhannon/NH/issues/13
- https://github.com/kennethhannon/NH/issues/14

Note: Cursor's Grok Bot and Cloud Agents can coordinate and use scheduled/event routines when configured and signed in. This file alone does not activate their accounts or routines.

References: https://cursor.com/docs/grok-bot/work and https://cursor.com/docs/cloud-agent/automations