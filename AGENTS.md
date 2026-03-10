# AGENTS

Purpose-built reference for contributors to the GameHub website.

## Why (What this system does)
- Next.js 16 (App Router) site that curates and publishes gaming content: reviews, news, guides, and Q&A.
- Homepage (`app/page.tsx`) aggregates markdown-sourced articles and renders a filterable grid with a featured story via `ClientHomepage`.
- Category detail pages (`app/reviews/[slug]`, `app/news/[slug]`) render individual articles converted from markdown to HTML.
- Content lives as markdown files in `content/<category>`; metadata in front matter drives UI badges, dates, and external source links.

## Map (Where things live)
- `app/layout.tsx` — Root layout, global fonts (Geist), and Vercel Speed Insights.
- `app/page.tsx` — Homepage entry; loads all articles then hands off to `ClientHomepage`.
- `components/ClientHomepage.tsx` — Client-side homepage UI: category filter, featured card, article grid, responsive nav.
- `app/reviews/[slug]/page.tsx` — Review article page (static params generated from markdown).
- `app/news/[slug]/page.tsx` — News article page (same flow as reviews).
- `lib/markdown.ts` — Markdown loader: reads front matter with `gray-matter`, converts body with `remark`/`remark-html`, sorts by date.
- `lib/types.ts` — Shared `Article` shape.
- `content/` — Markdown sources organized by category (`reviews`, `news`, `guides`, `qa`). File name = slug.
- `public/` — Static assets (currently minimal; add here if you need local images).
- `app/globals.css` — Tailwind v4 entry plus light/dark CSS variables.
- `tailwind.config.ts` — Content globs and typography plugin config.
- `docs/assets.html` — Standalone visual map of asset relationships (open in browser for diagram).
- Project config: `package.json` scripts, `tsconfig.json`, `next-env.d.ts`, `.gitignore`, `eslint.config.mjs`, `postcss.config.mjs`.

## Rules (Allowed / not allowed)
- Content categories are constrained to `reviews`, `news`, `guides`, `qa` (hard-coded in `lib/markdown.ts` and navigation). Add new ones only after updating types, loader, nav, and routes.
- Front matter required fields per article:
  - `title`, `author`, `date` (ISO string), `category`, `platform`, `image`, `type` (`original` | `curated`).
  - Optional: `excerpt` (fallback uses first 150 chars), `source`, `sourceUrl` (shown for curated items).
  - Filename becomes the slug used in URLs; keep it URL-safe (lowercase, hyphens).
- Curated content must provide `source` and `sourceUrl`; original content should omit or leave them empty.
- Images: prefer HTTPS links sized for cards (16:9). No local imports are currently wired; use remote URLs unless you add Next image config.
- HTML safety: markdown is converted with `remark-html` without extra sanitization. Avoid embedding raw HTML or scripts in markdown.
- Date handling: sorting and display rely on parseable dates; use valid ISO strings to keep ordering correct.
- Styling: Tailwind v4 + `@tailwindcss/typography`; globals define fonts via Next font variables. Keep classes consistent; avoid mixing inline styles unless necessary.
- Routing: dynamic pages use `generateStaticParams`; adding routes requires re-running `next build`/`next dev` to pick up new slugs.
- Dependencies: keep React 19/Next 16 compatible; avoid introducing legacy React APIs.

## Workflows (How work gets done)
1) Run the app
   - `npm install`
   - `npm run dev` -> open http://localhost:3000
   - Production check: `npm run build` then `npm start`

2) Add a new article
   - Pick a category directory under `content/` (`reviews`, `news`, `guides`, `qa`).
   - Create `your-slug.md` with front matter fields noted above plus markdown body.
   - For curated pieces set `type: "curated"` and supply `source` + `sourceUrl`.
   - Optional `excerpt`; otherwise it auto-generates.
   - Start dev server; the homepage and category page will render it. Static params are regenerated at build/dev startup.

3) Add a new category (touch all)
   - `lib/types.ts`: extend `Article["category"]` union.
   - `lib/markdown.ts`: add to `categories` array; ensure `getArticlesByCategory` typing.
   - `components/ClientHomepage.tsx`: add to `categories` list and filters.
   - Create `app/<category>/[slug]/page.tsx` similar to existing detail pages.
   - Create `content/<category>/` folder and add markdown files.
   - Update any navigation copy if needed.

4) Adjust styling / layout
   - Global styles in `app/globals.css`; Tailwind config in `tailwind.config.ts`.
   - Homepage UI lives in `components/ClientHomepage.tsx`; detail layouts in their respective `page.tsx` files.

5) Assets diagram
   - Open `docs/assets.html` in a browser to view the current architecture/asset map.

6) Quality checks
   - Lint: `npm run lint`
   - Manual: verify new markdown renders correctly, badges show expected type, curated links open in new tab.