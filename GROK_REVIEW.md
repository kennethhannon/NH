# Grok independent code-review brief (copy into your account)

Review this GitHub repository: https://github.com/kennethhannon/NH

Do not simply agree with the developer. Find reproducible bugs in:
- shift math: midnight rollover, unpaid break window, differential overlap, regular-rate treatment, workweek overtime
- settlement math: negative inputs, deductible vs payout, tax assumptions, comparables data
- FinishLine: imports and malicious files, localStorage quota, photo memory, lost edits, print/PDF, XSS, mobile UX
- accessibility and privacy language
- launch blockers and missing payment/service support

Return severity, file path, exact reproduction inputs, expected vs actual result, and a regression test for each issue. Never invent customer feedback or laws. Treat all outputs as estimates where relevant.
