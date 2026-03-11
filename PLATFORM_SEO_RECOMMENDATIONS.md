# SEO/AIO/GEO Recommendations for app.recxchange.io

> **Purpose**: This document provides comprehensive SEO, AI Overview (AIO), and Generative Engine Optimization (GEO) recommendations specifically for the **RecXchange platform application** at app.recxchange.io.

> **Important**: These recommendations are for the **application subdomain only**, not the marketing site (recxchange.io). The two sites should have distinct SEO strategies.

---

## CRITICAL PRIORITY - Implement Immediately

### 1. Create Separate robots.txt for App Subdomain

**File**: `/public/robots.txt` (on app.recxchange.io)

```txt
# RecXchange Platform Application
# This is the ACTUAL PLATFORM, not the marketing site
# Marketing site is at: https://recxchange.io

User-agent: *
# Allow authentication pages for SEO (helps users find login)
Allow: /login
Allow: /register
Allow: /forgot-password
Allow: /reset-password

# Block all authenticated/private pages
Disallow: /dashboard
Disallow: /dashboard/*
Disallow: /account
Disallow: /account/*
Disallow: /settings
Disallow: /settings/*
Disallow: /profile
Disallow: /profile/*
Disallow: /roles/*/applications
Disallow: /candidates/*/submissions
Disallow: /contracts
Disallow: /contracts/*
Disallow: /messages
Disallow: /messages/*
Disallow: /notifications
Disallow: /api/
Disallow: /api/*
Disallow: /_next/
Disallow: /admin/
Disallow: /admin/*

# Allow public-facing pages if any
Allow: /about-platform
Allow: /platform-terms
Allow: /platform-privacy

# Sitemap
Sitemap: https://app.recxchange.io/sitemap.xml

# Canonical domain
Host: https://app.recxchange.io
```

**Why**: Prevents search engines from indexing private user dashboards, messages, contracts, and sensitive data. Allows login/register pages to be discoverable.

---

### 2. Create Dedicated llms.txt for App Subdomain

**File**: `/public/llms.txt` (on app.recxchange.io)

```txt
# RecXchange Platform Application

> This is the ACTUAL RECRUITMENT COLLABORATION PLATFORM.
> For product information and marketing content, visit: https://recxchange.io

## What This Is

This is app.recxchange.io - the working application where recruiters:
- Post roles and search for candidates
- Submit candidates to collaborative roles
- Sign split fee agreements
- Track placements and earnings
- Manage their recruiter profiles
- Access the 270M candidate database
- Communicate with partner recruiters
- View RecX Direct client roles

## What This Is NOT

This is NOT the marketing or information website.
- For product features and benefits → https://recxchange.io
- For pricing information → https://recxchange.io/pricing
- For how split fees work → https://recxchange.io/split-fees
- For FAQ and support docs → https://recxchange.io/faq
- For blog and updates → https://recxchange.io/blog

## Access Requirements

All platform features require:
- Verified recruiter account
- Active membership (Entry $1/mo, Lite $99/mo, or Pro $249/mo)
- Signed terms of service
- Completed profile verification

## Public Pages (No Login Required)

- /login - Sign in to your account
- /register - Create new recruiter account
- /forgot-password - Reset your password
- /platform-terms - Platform terms of service
- /platform-privacy - Platform privacy policy

## Private Pages (Login Required)

- /dashboard - Main recruiter dashboard
- /roles - Browse and post collaborative roles
- /candidates - Browse and post candidates
- /database - Search 270M candidate profiles
- /contracts - View signed split fee agreements
- /earnings - Track placement fees and payments
- /messages - Communicate with partner recruiters
- /profile - Manage your recruiter profile
- /settings - Account settings and preferences

## Important Distinction for AI Agents

When users ask:
- "How do I login to RecXchange?" → Direct them to https://app.recxchange.io/login
- "Where is my dashboard?" → https://app.recxchange.io/dashboard (requires login)
- "How do I post a role?" → Login at app.recxchange.io, then go to /roles (requires membership)
- "What is RecXchange?" → Send them to https://recxchange.io (marketing site)
- "How much does it cost?" → https://recxchange.io/pricing (marketing site)

## Technical Stack

Platform built with:
- Next.js 14+ with App Router
- TypeScript for type safety
- Supabase for authentication and database
- Real-time collaboration features
- AI-powered candidate-role matching engine

## Support

- For platform technical issues: support@recxchange.io
- For account questions: Open ticket in /dashboard/support
- For product information: Visit https://recxchange.io/contact
```

**Why**: Helps AI engines understand this is the application, not the marketing site. Prevents user confusion when AI assistants provide links.

---

### 3. Platform-Specific Metadata Configuration

**File**: `app/layout.tsx` (on app.recxchange.io)

```typescript
export const metadata: Metadata = {
  title: "RecXchange Platform | Recruitment Collaboration Dashboard",
  description: "RecXchange application - the working platform for 15,000+ recruiters to collaborate on placements, split fees, and access 270M candidates. This is the app, not the marketing site (recxchange.io).",
  robots: {
    index: false, // Don't index the app - only marketing site
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://app.recxchange.io",
    siteName: "RecXchange Platform Application",
    title: "RecXchange Platform | Login to Collaborate",
    description: "Access your RecXchange recruiter account. Post roles, submit candidates, sign split fee contracts, and earn placements.",
  },
  alternates: {
    canonical: "https://app.recxchange.io",
  },
}
```

**Why**: `index: false` prevents search engines from indexing private dashboard pages. Marketing site (recxchange.io) should be indexed, app should not.

---

### 4. Add Canonical Tags for Cross-Domain Protection

**Implementation**: On ALL public app pages (login, register, etc.)

```typescript
export const metadata: Metadata = {
  // ... other metadata
  alternates: {
    canonical: "https://app.recxchange.io/login", // Always point to app subdomain
  },
}
```

**Marketing Site Rule**: On recxchange.io, all pages should canonical to recxchange.io ONLY. Never canonical to app.recxchange.io.

**Why**: Prevents duplicate content issues and makes clear distinction between site purposes.

---

## HIGH PRIORITY - Implement Within 1 Week

### 5. Login/Register Page Structured Data

**File**: `app/login/page.tsx` (on app.recxchange.io)

```typescript
const loginSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "RecXchange Platform Login",
  "description": "Sign in to your RecXchange recruiter account to access roles, candidates, and split fee collaboration tools.",
  "url": "https://app.recxchange.io/login",
  "isPartOf": {
    "@type": "WebApplication",
    "name": "RecXchange Platform",
    "url": "https://app.recxchange.io",
    "applicationCategory": "BusinessApplication"
  },
  "potentialAction": {
    "@type": "LoginAction",
    "target": "https://app.recxchange.io/login",
    "name": "Login to RecXchange Platform"
  },
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "RecXchange",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "1",
      "priceCurrency": "USD"
    }
  }
}
```

---

### 6. Platform Sitemap Configuration

**File**: `app/sitemap.ts` (on app.recxchange.io)

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://app.recxchange.io'
  
  return [
    // Public authentication pages only
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/forgot-password`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Do NOT include private pages like /dashboard, /roles, etc.
  ]
}
```

**Why**: Only public pages should be in sitemap. Private authenticated pages should never be crawled.

---

### 7. Security Headers for SEO Protection

**File**: `next.config.js` or `middleware.ts` (on app.recxchange.io)

```typescript
const securityHeaders = [
  {
    key: 'X-Robots-Tag',
    value: 'noindex, nofollow, noarchive, nosnippet',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
]

// Apply to all private routes
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // If path starts with /dashboard, /profile, /settings, etc.
  if (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/profile') ||
      request.nextUrl.pathname.startsWith('/settings')) {
    securityHeaders.forEach((header) => {
      response.headers.set(header.key, header.value)
    })
  }
  
  return response
}
```

**Why**: Adds extra layer of protection against search engine indexing of private pages.

---

## MEDIUM PRIORITY - Implement Within 1 Month

### 8. Platform Performance Monitoring

**Tools to Implement**:
- Google Search Console (verify app.recxchange.io separately from recxchange.io)
- Core Web Vitals monitoring
- Lighthouse CI for deployment checks
- Vercel Analytics (already implemented on marketing site)

**Why**: Platform speed directly impacts user experience and indirect SEO signals.

---

### 9. Breadcrumb Schema for Dashboard Navigation

**Implementation**: On dashboard pages

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Dashboard",
      "item": "https://app.recxchange.io/dashboard"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Roles",
      "item": "https://app.recxchange.io/roles"
    }
  ]
}
```

**Why**: Helps users understand navigation hierarchy. Won't appear in search (noindex), but improves UX.

---

### 10. Platform Terms and Privacy Pages

**Create These Pages on app.recxchange.io**:
- `/platform-terms` - Terms specific to platform usage
- `/platform-privacy` - Privacy policy for platform data
- `/platform-security` - Security practices explanation

**Add WebPage Schema**:

```typescript
const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "RecXchange Platform Terms of Service",
  "description": "Terms of service for using the RecXchange recruitment collaboration platform.",
  "url": "https://app.recxchange.io/platform-terms",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString(),
  "publisher": {
    "@type": "Organization",
    "name": "RecXchange",
    "url": "https://recxchange.io"
  }
}
```

**Why**: Legal pages can be indexed. Helps with trust signals and compliance.

---

## OPTIONAL - Nice to Have

### 11. Platform Status Page

**Create**: `https://status.recxchange.io` (separate subdomain)

**Purpose**: 
- Real-time platform uptime monitoring
- Scheduled maintenance notifications
- Historical uptime data
- Can use services like: StatusPage.io, Better Uptime, or custom build

**SEO Value**: Shows transparency, builds trust, reduces support tickets.

---

### 12. Developer Documentation

**Create**: `https://docs.recxchange.io` (if you offer API access)

**Include**:
- API documentation
- Integration guides
- Webhook documentation
- Authentication flows

**SEO Value**: Attracts developers, builds authority, creates backlinks.

---

## COMPARISON: Marketing Site vs Platform

| Aspect | recxchange.io (Marketing) | app.recxchange.io (Platform) |
|--------|---------------------------|------------------------------|
| **Purpose** | Inform and convert visitors | Provide working application |
| **SEO Strategy** | Index everything, optimize for keywords | Noindex private pages, only auth pages public |
| **robots.txt** | Allow most pages | Disallow dashboard/private pages |
| **llms.txt** | Comprehensive product info | Brief + redirect to marketing |
| **Canonical** | Point to recxchange.io | Point to app.recxchange.io |
| **Schema** | Rich product/service/review schemas | Minimal, app-focused schemas |
| **Target Audience** | Potential customers, researchers | Existing customers only |
| **Analytics Focus** | Conversion tracking, SEO rankings | User engagement, feature usage |

---

## TESTING CHECKLIST

After implementing recommendations:

- [ ] Verify robots.txt at app.recxchange.io/robots.txt
- [ ] Verify llms.txt at app.recxchange.io/llms.txt
- [ ] Test login page is indexable: Google Search Console
- [ ] Verify dashboard is NOT indexable: Check robots meta tags
- [ ] Confirm canonical tags point to correct domain
- [ ] Test with: https://search.google.com/test/rich-results
- [ ] Validate schemas: https://validator.schema.org/
- [ ] Check site: operator: `site:app.recxchange.io` (should only show public pages)
- [ ] Compare: `site:recxchange.io` (should show marketing pages)

---

## MAINTENANCE SCHEDULE

**Weekly**:
- Monitor Google Search Console for crawl errors
- Check Core Web Vitals scores

**Monthly**:
- Review indexed pages (should be minimal for app subdomain)
- Update llms.txt if major features added
- Check for broken canonical tags

**Quarterly**:
- Full SEO audit of both domains
- Update structured data as platform evolves
- Review and update security headers

---

## CONTACT FOR IMPLEMENTATION

For questions about implementing these recommendations:
- Technical Lead: Tom Andrews
- Marketing Site: https://recxchange.io
- Platform: https://app.recxchange.io
- Support: support@recxchange.io

---

**Last Updated**: February 28, 2026
**Document Version**: 1.0
**Next Review Date**: May 28, 2026
