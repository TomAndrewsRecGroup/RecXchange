# Security Posture

What is in place, what it protects against, and the two optional env vars
that upgrade protection further.

## In place (automatic)

| Control | Where | Protects against |
|---|---|---|
| XSS-safe JSON-LD serializer (`safeJsonLd`) | `lib/seo/jsonld.ts`, used by every schema script | `</script>` breakout injection via platform role data (recruiter-authored content) |
| Strict CSP: no `unsafe-eval`, scoped `img-src`, `frame-ancestors 'none'`, `frame-src 'none'`, `upgrade-insecure-requests` | `next.config.ts` | Code injection, clickjacking, mixed content, exfil to arbitrary hosts |
| COOP `same-origin`, HSTS preload, nosniff, referrer policy, permissions policy | `next.config.ts` | Cross-origin window attacks, protocol downgrade, MIME sniffing |
| Rate limiting on all `/api/*` | `middleware.ts` + `lib/rate-limit.ts` | Form spam, enumeration, abuse (see Upstash note below) |
| Contact form hardening | `app/api/contact/route.ts` | Header injection (control chars stripped), spam (honeypot), oversized payloads (length caps), HTML injection (escaped) |
| Constant-time secret comparison | `app/api/seo/ping-roles/route.ts` | Timing attacks on the cron secret |
| Secrets in env vars | `RECX_PLATFORM_API_KEY`, `CRON_SECRET`, SendGrid, Google Indexing | Credential leakage via source |
| Attack surface reduction | Chat/LLM endpoints, Telegram webhook, and 4 orphaned lead-gen routes deleted | Abuse of unmonitored endpoints |
| GHL inbound webhook secret check | `app/api/ghl/webhook/route.ts` (pre-existing) | Forged webhook events |

## CSP design decision

`script-src` retains `'unsafe-inline'` deliberately. A nonce-based CSP in
Next.js requires reading headers on every request, which forces all pages
dynamic and defeats static/ISR rendering - a bad trade for a marketing site.
The compensating controls are: no `unsafe-eval`, no third-party script hosts
except GTM, and XSS-hardened JSON-LD (the only injection path for external
data into inline scripts).

## Recommended env vars (Vercel)

- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` - switches rate
  limiting from best-effort per-instance memory to shared Redis across all
  serverless instances. Create a free Upstash Redis database and paste the
  REST credentials. (Upstash's REST API is used because edge middleware
  cannot open TCP connections to a conventional Redis such as Railway's.)
  Without these, rate limiting still works but each serverless instance
  counts separately.

## Standing items (operational)

- Rotate the platform API key that was previously committed to git history,
  then update `RECX_PLATFORM_API_KEY`.
- Keep `CRON_SECRET` set; the SEO ping route fails closed without it.
- Consider enabling Vercel's WAF / bot protection on the production domain.
