# Content Folder Guide

Why
- Holds all article source files as markdown, grouped by category.
- Front matter drives UI badges, metadata, and routing; filenames become slugs.

Map
- `reviews/` — Long-form critiques and verdicts.
- `news/` — Time-sensitive announcements and industry updates.
- `guides/` — How-tos, tips, build guides, walkthroughs.
- `qa/` — Q&A, FAQs, quick primers.

Rules
- File name = URL slug: lowercase, hyphen-separated, no spaces.
- Required front matter:
  - `title`, `author`, `date` (ISO), `category` (reviews|news|guides|qa), `platform`, `image`, `type` (original|curated)
  - Optional: `excerpt`, `source`, `sourceUrl` (needed when type=curated)
- Markdown body only; avoid raw HTML/scripts. Keep 16:9 hero images via HTTPS.
- Dates must be parseable ISO so sorting works.

Workflows
- Add article: choose category folder → create `slug.md` with template from that folder’s README → run dev/build to regenerate static params.
- Add category (rare): update types, loader, nav, routes, then create new folder and README mirroring these rules.
