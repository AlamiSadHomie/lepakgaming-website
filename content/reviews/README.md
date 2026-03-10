# Reviews Content Guide

Purpose
- Long-form critiques, scoring, and verdicts for specific games or hardware.

Front matter template
```md
---
title: "Clear, specific review title"
author: "Your Name"
date: "2026-03-10"
category: "reviews"
platform: "PC, PS5"      # comma-separated list ok
image: "https://..."
excerpt: "1–2 sentence summary."   # optional
type: "original"        # or "curated"
source: "IGN"           # required if curated
sourceUrl: "https://..."# required if curated
---
```

Rules
- Filename = slug (lowercase-hyphen). Example: `stellar-blade-review.md`.
- Keep body in markdown; no scripts or inline HTML.
- Use ISO dates for correct ordering.
- If curated, include source + sourceUrl; otherwise omit them.

Notes
- Verdicts, pros/cons, and scores can be simple markdown; styling is handled by the page template.
