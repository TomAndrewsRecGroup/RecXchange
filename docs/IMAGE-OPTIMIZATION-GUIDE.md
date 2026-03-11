# Image Optimization Implementation Guide

**Priority:** HIGH - Critical for Core Web Vitals (LCP)  
**Estimated Time:** 2-3 hours for full site  
**Impact:** Improves page load speed by 40-60%

---

## Why Optimize Images?

### Current Issues
1. **Large file sizes** - PNG/JPG images served at full resolution
2. **No lazy loading** - All images load immediately
3. **No responsive sizing** - Same image for mobile and desktop
4. **Missing WebP** - Not using modern image formats
5. **Poor LCP scores** - Largest Contentful Paint taking too long

### Benefits of OptimizedImage Component
- ⚡ **40-60% faster page loads**
- 📱 **Responsive sizing** - Serves appropriate size per device
- 🖼️ **Automatic WebP** - Modern format with 30% smaller files
- 👁️ **Blur placeholder** - Better perceived performance
- 🚀 **Priority loading** - Optimizes above-fold images
- 🎯 **Better SEO** - Google rewards fast sites

---

## Quick Start

### 1. Import the Component
```typescript
import OptimizedImage from '@/components/OptimizedImage';
```

### 2. Basic Usage
**Before (Bad):**
```tsx
<img 
  src="https://example.com/image.png" 
  alt="Description"
  className="w-full h-auto"
/>
```

**After (Good):**
```tsx
<OptimizedImage
  src="https://example.com/image.png"
  alt="Description"
  width={1200}
  height={630}
  className="w-full h-auto"
/>
```

### 3. Above-Fold Images (Priority)
**For hero images, logos, and first visible content:**
```tsx
<OptimizedImage
  src="/hero-image.png"
  alt="Hero"
  width={1920}
  height={1080}
  priority={true}  // 👈 Disable lazy loading for LCP
  className="w-full h-auto"
/>
```

### 4. Fill Container (Background-style images)
```tsx
<div className="relative w-full h-[400px]">
  <OptimizedImage
    src="/background.jpg"
    alt="Background"
    fill={true}
    sizes="100vw"
    className="object-cover"
  />
</div>
```

---

## Priority Pages to Update

### 🔴 Critical (Do First)

#### 1. Homepage (`app/page.tsx`)
**Images to replace:**
- Hero image/logo
- Feature section images
- Stats/testimonial avatars
- All visible on load

**Priority setting:** Use `priority={true}` for:
- RecXchange logo in hero
- First visible card images
- Above-fold background images

#### 2. `/recruiter` Page
**Images to replace:**
- Header images
- Card icons/graphics
- CTA section images

**Example:**
```tsx
// Before
<img src={logoUrl} alt="RecXchange" className="w-12 h-12" />

// After
<OptimizedImage
  src={logoUrl}
  alt="RecXchange"
  width={48}
  height={48}
  priority={true}
  className="w-12 h-12"
/>
```

#### 3. `/pricing` Page
**Images to replace:**
- Tier icons
- Feature graphics
- Comparison images

### 🟡 Important (Do Second)

4. `/why-recxchange`
5. `/split-fees`
6. `/hiring-manager-home`
7. `/contact`
8. `/faq`

### 🟯 Medium Priority

9. `/blog` and blog posts
10. `/roles`
11. Legal pages

---

## Common Patterns

### Logo in Header
```tsx
<OptimizedImage
  src="/logo.png"
  alt="RecXchange Logo"
  width={150}
  height={40}
  priority={true}  // Logo always visible
  quality={95}     // Higher quality for logos
/>
```

### Profile/Avatar Images
```tsx
<OptimizedImage
  src={user.avatar}
  alt={user.name}
  width={100}
  height={100}
  className="rounded-full"
  quality={85}
/>
```

### Card Thumbnails (Grid)
```tsx
<OptimizedImage
  src={card.image}
  alt={card.title}
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

### Full-Width Hero
```tsx
<div className="relative w-full h-screen">
  <OptimizedImage
    src="/hero-bg.jpg"
    alt="Hero Background"
    fill={true}
    sizes="100vw"
    priority={true}
    quality={90}
    className="object-cover"
  />
</div>
```

### Icon Images
```tsx
<OptimizedImage
  src="/icons/feature.svg"
  alt="Feature icon"
  width={24}
  height={24}
  className="text-cyan-400"
/>
```

---

## Image Sizes Guide

### Recommended Sizes

| Use Case | Width | Height | Priority |
|----------|-------|--------|----------|
| Hero background | 1920 | 1080 | Yes |
| Logo (header) | 150-200 | 40-60 | Yes |
| Feature cards | 400-600 | 300-400 | No |
| Profile avatars | 100-150 | 100-150 | No |
| Icons | 24-48 | 24-48 | No |
| OG images | 1200 | 630 | N/A |
| Blog thumbnails | 800 | 450 | No |
| Testimonial photos | 80-120 | 80-120 | No |

### Sizes Prop (Responsive)

Tells Next.js what size to serve for different viewports:

```tsx
sizes="(
max-width: 640px) 100vw,
  (max-width: 1024px) 50vw,
  33vw
)"
```

**Translation:**
- Mobile (< 640px): Full width
- Tablet (640-1024px): Half width
- Desktop (> 1024px): One-third width

---

## Quality Settings

| Image Type | Quality | Reason |
|------------|---------|--------|
| Photos | 80-85 | Good balance |
| Logos | 90-95 | Crisp edges |
| Icons | 90 | Small file anyway |
| Backgrounds | 75-80 | Less critical |
| Product images | 85-90 | Important detail |
| Thumbnails | 75-80 | Viewed small |

---

## External Images Setup

If using images from external domains (Vercel Blob, Cloudinary, etc.):

### Update `next.config.ts`
```typescript
const nextConfig = {
  images: {
    domains: [
      'haaqtnq6favvrbuh.public.blob.vercel-storage.com',
      'res.cloudinary.com',
      // Add any other image domains
    ],
  },
};
```

---

## Testing

### 1. Visual Check
- Images load correctly
- No layout shift
- Blur placeholder appears
- Images are crisp

### 2. Performance Check
```bash
# Build and test locally
npm run build
npm run start

# Open in browser
open http://localhost:3000
```

### 3. Lighthouse Audit
1. Open Chrome DevTools
2. Go to "Lighthouse" tab
3. Run audit
4. Check:
   - Performance score
   - LCP time
   - Image optimization warnings

### 4. Network Tab Check
- Images should be WebP format
- Sizes should vary by viewport
- Lazy loaded images load on scroll

---

## Common Issues & Fixes

### Issue: Image not loading
**Solution:** Check domain is in `next.config.ts` images.domains

### Issue: Blurry images
**Solution:** Increase `quality` prop (85-95)

### Issue: Layout shift (CLS)
**Solution:** Always provide `width` and `height` props

### Issue: Slow LCP
**Solution:** Add `priority={true}` to above-fold images

### Issue: Image too large on mobile
**Solution:** Use `sizes` prop to serve smaller versions

---

## Performance Benchmarks

### Before Optimization (typical)
- LCP: 4-6 seconds
- Image sizes: 500KB - 2MB each
- Total page weight: 5-10MB
- Performance score: 60-70

### After Optimization (expected)
- LCP: 1.5-2.5 seconds ✅
- Image sizes: 50-200KB each ✅
- Total page weight: 1-2MB ✅
- Performance score: 85-95 ✅

**Improvement:** 40-60% faster page loads! 🚀

---

## Implementation Checklist

### Phase 1: Critical Pages (Day 1)
- [ ] Homepage - Replace all images
- [ ] /recruiter - Replace all images
- [ ] /pricing - Replace all images
- [ ] Test on mobile and desktop
- [ ] Run Lighthouse audit

### Phase 2: Important Pages (Day 2)
- [ ] /why-recxchange
- [ ] /split-fees
- [ ] /hiring-manager-home
- [ ] /contact
- [ ] /faq
- [ ] Test on mobile and desktop

### Phase 3: Remaining Pages (Day 3)
- [ ] Blog pages
- [ ] Legal pages
- [ ] Other pages
- [ ] Final audit
- [ ] Deploy to production

### Phase 4: Verification (Day 4)
- [ ] Check Google Search Console
- [ ] Monitor Core Web Vitals
- [ ] Review PageSpeed Insights
- [ ] Check Vercel Analytics

---

## Additional Resources

- [Next.js Image Component Docs](https://nextjs.org/docs/app/api-reference/components/image)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Core Web Vitals Guide](https://web.dev/vitals/)

---

**Questions?** Check the `OptimizedImage.tsx` component source code for implementation details.
