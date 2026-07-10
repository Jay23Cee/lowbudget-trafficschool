# Repository Audit

## Current architecture

- Next.js Pages Router with TypeScript
- shared site layout and trust pages
- 50 Markdown-driven static state guides
- server-side affiliate redirects
- server-rendered XML sitemap
- build-time validation for state content, routes, and affiliate destinations

## Public routes

- `/`
- `/california`
- `/about`
- `/privacy`
- `/terms`
- `/affiliate-disclosure`
- `/online-traffic-school/[state]`
- `/go/[state]`
- `/go/trafficschool101`
- `/sitemap.xml`

There is no placeholder API route. Static export is not supported because redirects and the sitemap use server-side rendering.

## Affiliate flow

State selectors link to `/go/[state]`. The route validates the state slug, constructs an HTTPS provider URL, preserves required tracking parameters, and forwards only safe non-reserved query parameters. Invalid states return 404 and invalid provider configuration fails the production build.

All states currently use the verified HTTPS TrafficSchool101 fallback destination. State-specific destinations must be confirmed before being added.

## Validation and error handling

The static build validates:

- complete state coverage and unique SEO metadata
- frontmatter and filename/slug consistency
- affiliate provider fields and HTTPS destinations
- required affiliate tracking parameters
- known internal routes

Client-side state selection handles navigation failures and unavailable browser storage without crashing. Production pages include custom 404 and 500 responses, and the app emits minimal security headers.

## Deployment and repository hygiene

Use Node 20+, npm, and `package-lock.json`. Run `npm run verify` before deployment. Do not commit `.next`, `out`, logs, `*.tsbuildinfo`, `.DS_Store`, `__MACOSX`, secrets, or unrelated hardware-monitoring files.
