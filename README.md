````markdown
# Service site template (Next.js + App Router + FSD)

## Requirements
- Node 20+
- pnpm 9+ (or npm/yarn; scripts use pnpm by default)

## Setup
1) Install deps: `pnpm install`
2) Create `.env.local` from `.env.example` and set `NEXT_PUBLIC_SITE_URL` and `REDIRECT_TARGET_URL`.
3) Run dev server: `pnpm dev`
4) Build for production: `pnpm build` then `pnpm start`

## Structure (FSD-style)
- app/ — routing, layouts, metadata, middleware wiring
- shared/ — config, i18n, seo helpers, ui primitives
- features/ — LanguageSwitcher
- widgets/ — Header, Footer
- pages/ — page-level UI blocks

Routes: `/[locale]` with locales `en|th`. SEO pages: home, services, about, pricing, contacts. Redirect page `/[locale]/go` performs 308 to external URL and is excluded from sitemap/robots.
````
