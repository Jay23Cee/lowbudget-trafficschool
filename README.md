# Low Budget Traffic School

## Overview

Low Budget Traffic School is a Next.js and TypeScript affiliate referral site. It publishes state-by-state traffic school guides and sends visitors to third-party providers through server-side affiliate redirects.

This repository does not operate traffic school courses, enforce seat time, issue certificates, or store student records.

## Active routes

- `/` national directory and state selector
- `/california` California-focused guide
- `/about`, `/privacy`, `/terms`, and `/affiliate-disclosure` trust pages
- `/online-traffic-school/[state]` 50 statically generated state guides
- `/go/[state]` validated state affiliate redirect
- `/go/trafficschool101` default provider redirect
- `/sitemap.xml` server-rendered sitemap

The redirect and sitemap routes require a Node-capable Next.js host such as Vercel. This app is not configured for static export.

## Requirements and deployment

- Node.js 20 or newer
- npm 10 or newer
- `package-lock.json` is the canonical lockfile

Create deployment variables from `.env.example`. `NEXT_PUBLIC_SITE_URL` must be an HTTP or HTTPS origin without a path, query, or hash. `NEXT_PUBLIC_GA_MEASUREMENT_ID` is optional and is used only when it matches a valid Google Analytics measurement ID.

Typical deployment commands:

```bash
npm ci
npm run verify
npm run start
```

For Vercel, use the Next.js preset, set the environment variables, and use `npm run build` as the build command. Do not deploy the local `.next`, `out`, log, or cache directories.

## Content

State editorial content lives in `src/content/states/*.md`. Each file must match a state slug and include the validated frontmatter fields:

`stateName`, `slug`, `seoTitle`, `seoDescription`, `hero`, `intro`, `eligibility`, `faq`, and `lastReviewed`.

The production build validates complete 50-state coverage, slug/file matches, unique SEO metadata, affiliate configuration, HTTPS destinations, and known routes. The content seeding script only creates missing files:

```bash
node scripts/generate-state-content.mjs
```

## Affiliate redirects

All state entries currently use the HTTPS TrafficSchool101 fallback destination until a state-specific destination is verified. Required tracking parameters are protected from query-string overrides. Unknown state slugs are rejected rather than silently falling back.

Update `src/data/affiliate-links.ts` when provider destinations or tracking parameters change, then run `npm run verify`.

## SEO, analytics, and sitemap

Metadata is assembled in `src/lib/seo.tsx` using `NEXT_PUBLIC_SITE_URL`. Open Graph images use `/assets/traffic-school-og.png`. State pages include breadcrumb and FAQ structured data.

The sitemap includes the core public pages and all state guides, but not redirect routes. It is served as XML with production caching headers.

## Commands

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run verify
npm run start
```

`npm run test` performs the strict TypeScript check. `npm run verify` runs lint, typecheck, and the production build in sequence.

## Repository hygiene

Keep `package.json`, `package-lock.json`, `tsconfig.json`, and `.eslintrc.json` as project configuration. Generated Next output, macOS metadata, editor logs, OCCT files, duplicate lockfiles, and unused legacy UI are intentionally excluded from the repository.
