# Page-Specific Metadata Templates

**Priority:** HIGH - Required for proper SEO  
**Status:** Templates ready to implement  
**Time Required:** 30-60 minutes

---

## Why Page-Specific Metadata?

Every page needs unique:
- **Title** - Shows in search results and browser tabs
- **Description** - Shows in search results snippets
- **Canonical URL** - Tells search engines the preferred URL
- **Open Graph tags** - For social media sharing

**Without unique metadata:** All pages show the same title/description in search results ❌  
**With unique metadata:** Each page has relevant, targeted SEO ✅

---

## How to Add Metadata

### For Server Components (Most Pages)
Add to top of `page.tsx` file:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Your metadata here
};
```

### For Client Components ('use client')
Create separate `layout.tsx` in the same folder or use `generateMetadata` function.

---

## Page Templates

### 1. `/recruiter` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "For Recruiters: Split Fees Up to 70% | RecXchange",
  description: "Join 15,000+ recruiters earning split fees on placements. Access 270M candidates, $750K+ in live fees, and RecX Direct premium roles with 70% commission. Average placement fee: $7,000.",
  keywords: [
    "recruiter collaboration",
    "split fee recruitment",
    "recruiter network",
    "collaborative recruiting",
    "fee sharing platform",
    "RecX Direct",
    "recruitment partnership",
  ],
  alternates: {
    canonical: '/recruiter',
  },
  openGraph: {
    title: "For Recruiters: Split Fees Up to 70% | RecXchange",
    description: "Join 15,000+ recruiters splitting fees on placements. Access RecX Direct roles with 70% commission.",
    url: 'https://recxchange.io/recruiter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "For Recruiters: Split Fees Up to 70% | RecXchange",
    description: "Join 15,000+ recruiters earning on split fee placements.",
  },
};
```

---

### 2. `/pricing` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pricing: $1 to $250/month | RecXchange Recruiter Platform",
  description: "RecXchange pricing: Entry at $1/month (5 tokens), Lite at $99/month (150 tokens + RecX Direct access), or Pro at $250/month (400 tokens + instant RecX Direct with 70% splits). No upfront fees.",
  keywords: [
    "RecXchange pricing",
    "recruitment platform cost",
    "split fee platform pricing",
    "recruiter network membership",
    "RecX Direct pricing",
    "recruitment collaboration cost",
  ],
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: "Pricing: $1 to $250/month | RecXchange",
    description: "Three tiers to fit your needs: Entry $1/month, Lite $99/month, Pro $250/month. Earn up to 70% on placements.",
    url: 'https://recxchange.io/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "RecXchange Pricing: Entry $1, Lite $99, Pro $250/month",
    description: "Flexible pricing for recruiters. Earn up to 70% on split fee placements.",
  },
};
```

---

### 3. `/why-recxchange` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Choose RecXchange vs Traditional Agencies | Split Fee Platform",
  description: "RecXchange vs traditional agencies: Keep 50-70% of fees (vs 40%), collaborate with 15,000+ recruiters, access 270M candidates, automated contracts, and RecX Direct exclusive roles. Learn why recruiters are switching.",
  keywords: [
    "RecXchange vs traditional recruitment",
    "split fee vs standard commission",
    "why use RecXchange",
    "recruiter collaboration benefits",
    "recruitment network advantages",
  ],
  alternates: {
    canonical: '/why-recxchange',
  },
  openGraph: {
    title: "Why Choose RecXchange vs Traditional Agencies",
    description: "Keep more commission, collaborate with 15,000+ recruiters, access premium RecX Direct roles with 70% splits.",
    url: 'https://recxchange.io/why-recxchange',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why RecXchange? 50-70% Commission vs Traditional 40%",
    description: "Collaborate with 15,000+ recruiters and keep more of your fees.",
  },
};
```

---

### 4. `/collaboration` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Split Fee Recruitment Works | RecXchange Collaboration Platform",
  description: "Learn how split fee recruitment collaboration works on RecXchange. Post roles to get candidates, share candidates to find roles. Automated agreements, 50/50 or 60/40 splits, timestamped protection, and up to 70% on RecX Direct roles.",
  keywords: [
    "how split fees work",
    "recruitment collaboration explained",
    "split fee agreements",
    "recruiter partnership process",
    "fee sharing how to",
  ],
  alternates: {
    canonical: '/collaboration',
  },
  openGraph: {
    title: "How Split Fee Recruitment Works | RecXchange",
    description: "Post roles to get candidates, or share candidates to find roles. Automated split fee agreements and timestamped protection.",
    url: 'https://recxchange.io/collaboration',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Split Fee Collaboration Works on RecXchange",
    description: "Automated agreements, transparent splits, timestamped protection.",
  },
};
```

---

### 5. `/faq` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | RecXchange Support",
  description: "RecXchange FAQ: How do split fees work? What is RecX Direct? How much does it cost? How fast can I make placements? Is it suitable for solo recruiters? Get answers to common questions about our recruiter collaboration platform.",
  keywords: [
    "RecXchange FAQ",
    "split fee questions",
    "recruitment platform help",
    "RecX Direct explained",
    "recruiter collaboration questions",
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: "Frequently Asked Questions | RecXchange",
    description: "Get answers about split fees, RecX Direct, pricing, and how our recruiter collaboration platform works.",
    url: 'https://recxchange.io/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "RecXchange FAQ",
    description: "Answers to common questions about our split fee recruitment platform.",
  },
};
```

---

### 6. `/contact` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | RecXchange Support",
  description: "Contact RecXchange for support, sales inquiries, or partnership opportunities. Email support@recxchange.io or use our contact form. We typically respond within 24 hours.",
  keywords: [
    "contact RecXchange",
    "RecXchange support",
    "recruitment platform help",
    "get in touch",
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Us | RecXchange",
    description: "Get in touch with RecXchange for support or inquiries.",
    url: 'https://recxchange.io/contact',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

### 7. `/hiring-manager-home` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "For Hiring Managers: Access 15,000+ Recruiters | RecXchange",
  description: "Hiring managers: Post your role to 15,000+ recruiters and access 270M candidates. RecXchange connects your open positions with the best recruitment talent. Live placements and strategic hiring support available.",
  keywords: [
    "hiring manager platform",
    "recruiter network for employers",
    "access multiple recruiters",
    "recruitment outsourcing",
    "hiring solutions",
  ],
  alternates: {
    canonical: '/hiring-manager-home',
  },
  openGraph: {
    title: "For Hiring Managers: Access 15,000+ Recruiters | RecXchange",
    description: "Post roles to 15,000+ recruiters. Access 270M candidates. Get placements faster.",
    url: 'https://recxchange.io/hiring-manager-home',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hiring Managers: Access 15,000+ Recruiters on RecXchange",
    description: "Post once, reach thousands of recruiters competing to fill your role.",
  },
};
```

---

### 8. `/deal-protection` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Deal Protection & Timestamped Agreements | RecXchange",
  description: "RecXchange protects your submissions with timestamped agreements and automated contracts. Clear terms, secure fee splits, legal protection, and transparent submission tracking ensure fair collaboration.",
  keywords: [
    "recruitment deal protection",
    "timestamped submissions",
    "split fee agreements",
    "recruitment contract protection",
    "candidate submission security",
  ],
  alternates: {
    canonical: '/deal-protection',
  },
  openGraph: {
    title: "Deal Protection & Timestamped Agreements | RecXchange",
    description: "Automated contracts, timestamped submissions, and transparent fee split protection.",
    url: 'https://recxchange.io/deal-protection',
    type: 'website',
  },
};
```

---

### 9. `/roles` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Live Roles: $750K+ in Active Fees | RecXchange",
  description: "Browse 100+ live recruitment roles with $750K+ in active placement fees. Engineering, Healthcare, Tech, Sales, Finance, and more. RecX Direct premium roles available with up to 70% commission splits.",
  keywords: [
    "live recruitment roles",
    "split fee opportunities",
    "recruitment marketplace",
    "RecX Direct roles",
    "open recruitment positions",
  ],
  alternates: {
    canonical: '/roles',
  },
  openGraph: {
    title: "Live Roles: $750K+ in Active Fees | RecXchange",
    description: "Browse 100+ live recruitment roles. Start earning split fees today.",
    url: 'https://recxchange.io/roles',
    type: 'website',
  },
};
```

---

### 10. `/blog` Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Recruitment Blog & Industry Insights | RecXchange",
  description: "RecXchange blog: Learn about split fee recruitment, collaboration strategies, industry trends, recruiter success stories, and how to maximize earnings on our platform.",
  keywords: [
    "recruitment blog",
    "split fee recruitment tips",
    "recruiter collaboration advice",
    "recruitment industry insights",
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Recruitment Blog & Insights | RecXchange",
    description: "Tips, strategies, and success stories from the world of split fee recruitment.",
    url: 'https://recxchange.io/blog',
    type: 'website',
  },
};
```

---

## Implementation Steps

### Step 1: Identify Page Type
- **Server Component** (no 'use client'): Add metadata export directly
- **Client Component** ('use client'): Create layout.tsx or use generateMetadata

### Step 2: Copy Template
Find the template above for your page and copy it.

### Step 3: Add to Page File

**For server components:**
```typescript
// At top of page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Paste template here
};

// Rest of your page code...
```

**For client components:**
Create `app/[route]/layout.tsx`:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Paste template here
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### Step 4: Customize (Optional)
- Adjust description length (aim for 150-160 characters)
- Add/remove keywords based on your research
- Update stats/numbers if they change

### Step 5: Test
```bash
npm run build
npm run start
```

Check in browser:
- View page source (Ctrl+U or Cmd+U)
- Search for `<title>` and `<meta name="description"`
- Verify unique values appear

---

## Testing Checklist

- [ ] Title appears in browser tab
- [ ] Title is unique (not default)
- [ ] Description is 150-160 characters
- [ ] Canonical URL is correct
- [ ] Open Graph tags present
- [ ] No duplicate metadata between pages
- [ ] Build succeeds without errors

---

## SEO Best Practices

### Title Tags
- **Length:** 50-60 characters (max)
- **Format:** Primary Keyword | Brand Name
- **Include:** Main benefit or action
- **Avoid:** Keyword stuffing, ALL CAPS

### Meta Descriptions
- **Length:** 150-160 characters
- **Include:** Call to action, key stats, benefits
- **Use:** Active voice, compelling copy
- **Avoid:** Duplicate descriptions

### Keywords
- **Use:** 5-8 relevant terms
- **Include:** Primary and secondary keywords
- **Avoid:** Repetition, irrelevant terms

---

## Common Mistakes to Avoid

❌ **Duplicate metadata** - Each page must be unique  
❌ **Missing canonical** - Always include alternates.canonical  
❌ **Too long title** - Keep under 60 characters  
❌ **Generic descriptions** - Be specific and compelling  
❌ **Missing Open Graph** - Required for social sharing  
❌ **Keyword stuffing** - Natural language only  

---

## Priority Order

1. 🔴 **Critical** (Do today)
   - /recruiter
   - /pricing
   - /hiring-manager-home

2. 🟡 **High** (Do this week)
   - /why-recxchange
   - /collaboration
   - /faq
   - /contact

3. 🟯 **Medium** (Do next week)
   - /roles
   - /deal-protection
   - /blog
   - Other pages

---

**Total time:** 5-10 minutes per page  
**Total pages:** ~15-20 pages  
**Total effort:** 2-3 hours

🚀 **Impact:** Significantly improved search visibility and click-through rates!
