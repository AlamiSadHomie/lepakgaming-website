# News Content Guide

Purpose
- Timely announcements, releases, industry moves; short to mid-length.

Front matter template
```md
---
title: "Concise news headline"
author: "Your Name"
date: "2026-03-10"
category: "news"
platform: "PS5, Xbox Series X/S"   # or "Multi-platform"
image: "https://..."
excerpt: "Brief deck-style summary." # optional
type: "curated"        # or "original"
source: "Publisher/Outlet"   # required if curated
sourceUrl: "https://..."     # required if curated
---
```

Rules
- Filename = slug (lowercase-hyphen). Example: `gta6-release-window.md`.
- Use ISO date; this category is sorted by recency.
- Keep markdown only; avoid raw HTML.
- Curated pieces must include source + sourceUrl for link-out badge.
