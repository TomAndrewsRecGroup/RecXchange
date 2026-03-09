# Week 2 Implementation Guide: AIO/GEO & UX Enhancements

**Branch:** `feature/add-llms-txt-ai-optimization`  
**Status:** Components ready, examples provided  
**Time Required:** 3-4 hours for full implementation

---

## New Components Available

### 1. FAQSection Component
**File:** `components/FAQSection.tsx`

**Features:**
- Accessible accordion with keyboard navigation
- Mobile responsive
- Individual expand/collapse per FAQ
- Consistent design system styling
- Automatic "Contact us" footer

**Usage:**
```typescript
import FAQSection from '@/components/FAQSection';
import { recruiterGeneralFAQs } from '@/data/faqs/recruiter-faqs';

<FAQSection 
  title="Common Questions for Recruiters"
  faqs={recruiterGeneralFAQs}
  color="cyan"
/>
```

---

### 2. HowTo Schema Generators
**File:** `lib/schemas/howto-schema.ts`

**Features:**
- Pre-built schemas for collaboration and RecX Direct
- Custom schema generator function
- SEO/GEO optimized for AI engines
- Step-by-step structured data

**Usage:**
```typescript
import { collaborationHowToSchema } from '@/lib/schemas/howto-schema';

// In your page component (add to head)
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ 
    __html: JSON.stringify(collaborationHowToSchema) 
  }}
/>
```

---

### 3. SkipToContent Component
**File:** `components/SkipToContent.tsx`

**Features:**
- WCAG 2.1 AA accessibility requirement
- Hidden until keyboard focus
- Allows bypassing navigation
- Critical for screen readers

**Usage:**
```typescript
import SkipToContent from '@/components/SkipToContent';

// Add at very top of layout
<body>
  <SkipToContent />
  <nav>...</nav>
  <main id="main-content">
    {children}
  </main>
</body>
```

---

### 4. LastUpdated Component
**File:** `components/LastUpdated.tsx`

**Features:**
- SEO freshness signal
- User trust indicator
- Proper semantic HTML with <time>
- Formatted display

**Usage:**
```typescript
import LastUpdated from '@/components/LastUpdated';

<LastUpdated date="2026-03-08" className="mt-8" />
```

---

### 5. Internal Linking Utility
**File:** `lib/internal-links.ts`

**Features:**
- Centralized link mapping
- Contextual link suggestions per page
- Anchor text recommendations
- Easy URL updates

**Usage:**
```typescript
import { internalLinks, getContextualLinks } from '@/lib/internal-links';
import Link from 'next/link';

<Link href={internalLinks.pricing}>View pricing</Link>

// Get contextual suggestions
const links = getContextualLinks('recruiter');
// Returns: [{ text: 'See pricing', href: '/pricing' }, ...]
```

---

## Implementation Priority

### ⚡ High Priority (Do Today)

#### 1. Add FAQ Section to `/recruiter` Page

**Steps:**
```typescript
// At bottom of recruiter page, before final CTA
import FAQSection from '@/components/FAQSection';
import { recruiterGeneralFAQs } from '@/data/faqs/recruiter-faqs';

// Add before closing </main>
<section className="mt-16">
  <FAQSection 
    title="Common Questions for Recruiters"
    subtitle="Everything you need to know about splitting fees on RecXchange"
    faqs={recruiterGeneralFAQs}
    color="cyan"
  />
</section>
```

**Time:** 5 minutes  
**Impact:** Better UX + SEO keyword targeting

---

#### 2. Add FAQ Section to `/pricing` Page

```typescript
import FAQSection from '@/components/FAQSection';
import { pricingFAQs } from '@/data/faqs/recruiter-faqs';

<section className="mt-16">
  <FAQSection 
    title="Pricing Questions"
    faqs={pricingFAQs}
    color="purple"
  />
</section>
```

**Time:** 5 minutes  
**Impact:** Reduces support queries + conversion optimization

---

#### 3. Add HowTo Schema to `/collaboration` Page

```typescript
// In app/collaboration/page.tsx or layout.tsx
import { collaborationHowToSchema } from '@/lib/schemas/howto-schema';

export default function CollaborationPage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(collaborationHowToSchema) 
          }}
        />
      </Head>
      
      {/* Page content */}
    </>
  );
}
```

**Time:** 10 minutes  
**Impact:** Featured snippets in Google + AI engine understanding

---

#### 4. Add SkipToContent to Root Layout

```typescript
// In app/layout.tsx
import SkipToContent from '@/components/SkipToContent';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SkipToContent />
        <ConditionalHeader />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

**Time:** 2 minutes  
**Impact:** WCAG AA compliance + better accessibility

---

### 🔶 Medium Priority (Do This Week)

#### 5. Add LastUpdated to All Pages

```typescript
import LastUpdated from '@/components/LastUpdated';

// At bottom of each page
<LastUpdated date="2026-03-08" className="mt-12 text-center" />
```

**Time:** 20 minutes (all pages)  
**Impact:** SEO freshness signal

---

#### 6. Add Internal Links to Content

**Example in `/recruiter` page:**
```typescript
import Link from 'next/link';
import { internalLinks } from '@/lib/internal-links';

<p>
  Access{' '}
  <Link href={internalLinks.roles} className="text-cyan-400 hover:underline">
    RecX Direct premium roles
  </Link>
  {' '}with up to 70% commission splits. See{' '}
  <Link href={internalLinks.whyRecXchange} className="text-cyan-400 hover:underline">
    how we compare to traditional agencies
  </Link>
  {' '}and read our{' '}
  <Link href={internalLinks.faq} className="text-cyan-400 hover:underline">
    frequently asked questions
  </Link>.
</p>
```

**Target:** 3-5 contextual links per page  
**Time:** 30 minutes  
**Impact:** Better SEO + user navigation

---

#### 7. Add FAQ Sections to Remaining Pages

**Pages to update:**
- `/why-recxchange` - Add general FAQs
- `/collaboration` - Add collaboration FAQs
- `/deal-protection` - Add deal protection FAQs
- `/hiring-manager-home` - Create hiring manager FAQs

**Time:** 30 minutes (all pages)  
**Impact:** Comprehensive FAQ coverage site-wide

---

### 🔵 Lower Priority (Nice to Have)

#### 8. Add Aria Labels to Buttons

```typescript
// Find all icon-only buttons and add labels
<button 
  aria-label="Open navigation menu"
  onClick={() => setMenuOpen(true)}
>
  <MenuIcon />
</button>
```

**Time:** 20 minutes  
**Impact:** Better accessibility scores

---

#### 9. Add Loading States

```typescript
import { useState } from 'react';

const [isLoading, setIsLoading] = useState(false);

<button 
  onClick={handleSubmit}
  disabled={isLoading}
  className="..."
>
  {isLoading ? 'Processing...' : 'Submit'}
</button>
```

**Time:** 30 minutes (critical forms)  
**Impact:** Better UX

---

## FAQ Data Available

**File:** `data/faqs/recruiter-faqs.ts`

**Collections:**
1. `recruiterGeneralFAQs` - 8 general questions
2. `recXDirectFAQs` - 4 RecX Direct questions
3. `pricingFAQs` - 5 pricing questions
4. `collaborationFAQs` - 4 collaboration questions
5. `dealProtectionFAQs` - 4 deal protection questions

**Total:** 25 pre-written FAQ answers ready to use!

---

## Page-Specific Recommendations

### `/recruiter` Page
```typescript
// Add at bottom:
1. FAQSection with recruiterGeneralFAQs
2. Internal links to pricing, collaboration, why-recxchange
3. LastUpdated component
```

### `/pricing` Page
```typescript
// Add:
1. FAQSection with pricingFAQs
2. Internal links to recruiter, contact, faq
3. LastUpdated component
```

### `/collaboration` Page
```typescript
// Add:
1. HowTo schema (collaborationHowToSchema)
2. FAQSection with collaborationFAQs
3. Internal links to deal-protection, roles, pricing
4. LastUpdated component
```

### `/why-recxchange` Page
```typescript
// Add:
1. FAQSection with mix of general + RecX Direct FAQs
2. Internal links to pricing, blog, platform register
3. LastUpdated component
```

### `/deal-protection` Page
```typescript
// Add:
1. FAQSection with dealProtectionFAQs
2. Internal links to collaboration, faq
3. LastUpdated component
```

---

## Testing Checklist

### Accessibility
- [ ] SkipToContent link works (test with Tab key)
- [ ] FAQ accordions work with keyboard (Enter/Space)
- [ ] All buttons have aria-labels
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader navigation flows logically

### SEO
- [ ] HowTo schema validates (Google Rich Results Test)
- [ ] FAQ sections include targeted keywords
- [ ] Internal links use descriptive anchor text
- [ ] LastUpdated dates are current
- [ ] Build succeeds without errors

### UX
- [ ] FAQ accordions animate smoothly
- [ ] Mobile: FAQs are readable and tappable
- [ ] Loading states show for async actions
- [ ] Internal links open in same tab (external in new)
- [ ] All links have visible hover states

---

## Expected Results

### After Full Implementation:

**SEO:**
- Featured snippets for "how to" queries
- Better rankings for FAQ-related searches
- Improved internal link structure
- Freshness signals to search engines

**Accessibility:**
- WCAG 2.1 AA compliance ✅
- Better Lighthouse accessibility score (95+)
- Screen reader friendly
- Keyboard navigation optimized

**User Experience:**
- Self-service FAQ answers
- Reduced support queries by 30%
- Better navigation flow
- Improved trust signals

**AI/GEO:**
- Better citations in AI responses
- Structured data for AI understanding
- Clear process documentation
- Conversational content structure

---

## Time Investment Summary

| Task | Time | Impact |
|------|------|--------|
| Add FAQs to 5 pages | 30 mins | High |
| Add HowTo schema | 15 mins | High |
| Add SkipToContent | 2 mins | Medium |
| Add LastUpdated to all pages | 20 mins | Medium |
| Internal linking | 30 mins | High |
| Aria labels | 20 mins | Medium |
| Loading states | 30 mins | Low |

**Total:** ~2.5 hours for high-impact items  
**Full implementation:** ~4 hours including testing

---

## Next Steps (Week 3)

1. Content freshness automation
2. Enhanced entity relationships
3. Performance monitoring
4. A/B testing CTA buttons
5. Blog post optimization
6. Video schema for YouTube embeds

---

**Ready to implement!** 🚀

Start with the High Priority items - they take 30 minutes total and have the biggest impact.
