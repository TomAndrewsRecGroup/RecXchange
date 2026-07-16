# SEO Operations Guide

How the search/AI-visibility backend works and what needs configuring in
Vercel and Google for it to run at full power.

## What is built in

| Capability | Where | Status |
|---|---|---|
| JobPosting structured data (Google Jobs eligibility) | `app/roles/[id]/page.tsx` | Live automatically |
| Structured address parsing for job locations | `lib/roles/location.ts` | Live automatically |
| Role URLs in the sitemap | `app/sitemap.ts` | Live automatically |
| ItemList + BreadcrumbList schema on roles | `app/roles/page.tsx`, `app/roles/[id]/page.tsx` | Live automatically |
| Daily search-engine pings for all role URLs | `app/api/seo/ping-roles/route.ts` + Vercel cron (06:00 UTC) | Needs env vars (below) |
| Google Indexing API client (Google Jobs fast lane) | `lib/seo/google-indexing.ts` | Needs service account (below) |
| IndexNow (Bing / Copilot) | `lib/indexnow.ts` | Key already hosted; works once cron authorised |
| llms.txt / llms-full.txt for AI crawlers | `public/` | Live automatically |
| Live roles Markdown feed for AI agents | `/roles.md` | Live automatically |
| Split-fee entity authority (DefinedTerm, FAQ, knowsAbout) | `/how-it-works`, `/earn-more-as-a-recruiter`, root layout | Live automatically |

## Required environment variables (Vercel, Production)

1. `RECX_PLATFORM_API_KEY` - the platform API key for
   `app.recxchange.io/api/public/roles` (previously hardcoded in the repo;
   without it the site serves the curated fallback role set).
2. `CRON_SECRET` - any long random string. Vercel automatically sends it as
   `Authorization: Bearer <CRON_SECRET>` on cron invocations; the ping route
   rejects requests without it.
3. `GOOGLE_INDEXING_CLIENT_EMAIL` and `GOOGLE_INDEXING_PRIVATE_KEY` - see
   next section. Optional but strongly recommended: this is how job boards
   get postings into Google Jobs within minutes.

## Google Indexing API setup (one-off, ~15 minutes)

1. In Google Cloud Console, create (or reuse) a project and enable the
   **Web Search Indexing API**.
2. Create a **service account**; download its JSON key.
3. In **Google Search Console** for `recxchange.io`, add the service
   account's email address as an **Owner** (Settings → Users and
   permissions).
4. In Vercel, set:
   - `GOOGLE_INDEXING_CLIENT_EMAIL` = the `client_email` from the JSON key
   - `GOOGLE_INDEXING_PRIVATE_KEY` = the `private_key` from the JSON key
     (paste as-is; escaped `\n` sequences are handled)
5. Verify with:
   `curl -H "Authorization: Bearer $CRON_SECRET" https://recxchange.io/api/seo/ping-roles`
   The response reports IndexNow status and Google success/failure counts.

## Search Console checklist

- Verify both `recxchange.io` and `www.recxchange.io` properties.
- Submit `https://recxchange.io/sitemap.xml`.
- After the redesign deploy, use URL Inspection on `/`, `/how-it-works`,
  `/earn-more-as-a-recruiter`, and two role URLs; request indexing.
- Monitor Enhancements → Job postings for JobPosting validation status.
- Bing Webmaster Tools: verify the site and submit the sitemap (IndexNow
  covers ongoing freshness).

## The target queries and which page owns them

| Query cluster | Owning page |
|---|---|
| "what is split fee recruitment", "how do split fees work" | `/how-it-works` (DefinedTerm + FAQ + HowTo schema) |
| "how can a recruiter earn more", "make more money as a recruiter", "monetise candidates" | `/earn-more-as-a-recruiter` (answer-first + FAQ schema) |
| "split fee network", "NPA Worldwide alternative", "Top Echelon alternative" | `/compare/vs-split-fee-networks` |
| "[job title] [location]" job searches | `/roles/[id]` via Google Jobs (JobPosting schema) |
| AI-assistant questions about any of the above | llms.txt + llms-full.txt + `/roles.md` + consistent entity graph |

Every page states the same canonical definition sentence family and the same
numbers (15,000+ recruiters, $7,000 average cut, up to 70% on RecX Direct,
plans from $1/month) - consistency across pages, schema, and llms files is
what makes both Google and LLMs treat RecXchange as the authority for the
split-fee entity.
