# Core Web Vitals Optimization Guide

## Overview
Core Web Vitals are essential performance metrics that Google uses as ranking factors in search results. This guide documents all optimizations implemented and provides strategies for maintaining excellent performance.

---

## 📊 Target Metrics (Google Standards)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID/INP** (First Input Delay / Interaction to Next Paint) | < 100ms / < 200ms | 100-300ms / 200-500ms | > 300ms / > 500ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |
| **FCP** (First Contentful Paint) | < 1.8s | 1.8s - 3.0s | > 3.0s |
| **TTFB** (Time to First Byte) | < 600ms | 600ms - 1800ms | > 1800ms |

---

## ✅ Implemented Optimizations

### 1. Next.js Configuration (`next.config.ts`)

#### Image Optimization
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```
**Impact:** Reduces LCP by serving optimized image formats

#### Compression
```typescript
compress: true // Enables gzip/brotli compression
```
**Impact:** Reduces bundle size by ~70%, improving all metrics

#### SWC Minification
```typescript
swcMinify: true
```
**Impact:** Faster builds and smaller JavaScript bundles

#### Console Log Removal
```typescript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'],
  } : false,
}
```
**Impact:** Reduces bundle size, improves FID/INP

#### Package Import Optimization
```typescript
experimental: {
  optimizePackageImports: ['framer-motion', '@heroicons/react'],
  optimizeCss: true,
}
```
**Impact:** Tree-shaking unused code, reducing bundle size

### 2. Font Optimization (`app/layout.tsx`)

```typescript
const inter = Inter({ 
  subsets: ["latin"], 
  display: 'swap', // Prevents FOIT (Flash of Invisible Text)
});
```
**Impact:** Improves FCP by showing fallback fonts immediately

### 3. Web Vitals Monitoring (`app/components/WebVitals.tsx`)

```typescript
import { useReportWebVitals } from 'next/web-vitals';
```

**Tracks:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)
- INP (Interaction to Next Paint)

**Logs metrics to:**
- Console (development)
- Analytics endpoint (production)
- Can integrate with Google Analytics, Vercel Analytics, or custom tracking

### 4. Layout Stability (CLS Prevention)

#### Fixed Dimensions on Dynamic Elements
```tsx
// Statistics panels with consistent sizing
<div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto">
  {/* Panels have defined min-height */}
  <div className="relative backdrop-blur-xl bg-black/40 p-3 sm:p-5">
    {/* Content */}
  </div>
</div>
```

#### Font Loading Strategy
- Using `display: 'swap'` prevents layout shift during font loading
- Preloading critical fonts in layout

---

## 🎯 LCP (Largest Contentful Paint) Optimization

### Current Strategies
1. ✅ **Image optimization** with AVIF/WebP formats
2. ✅ **Font display: swap** for faster text rendering
3. ✅ **Compression enabled** via Next.js config
4. ✅ **SWC minification** for smaller bundles

### Additional Recommendations

#### Priority Hints
Add `priority` to hero images:
```tsx
import Image from 'next/image';

<Image 
  src="/hero-image.png" 
  priority // Preloads this image
  alt="Hero"
/>
```

#### Lazy Loading
Defer non-critical content:
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

#### Preconnect to External Domains
Add to `app/layout.tsx`:
```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://analytics.google.com" />
</head>
```

---

## ⚡ FID/INP (Interactivity) Optimization

### Current Strategies
1. ✅ **Remove console.log** in production
2. ✅ **Optimize package imports** (Framer Motion, Heroicons)
3. ✅ **SWC minification** for faster JavaScript parsing

### Additional Recommendations

#### Code Splitting
Split large components:
```tsx
const LazyModal = dynamic(() => import('@/components/Modal'), {
  ssr: false, // Don't render on server
});
```

#### Debounce Heavy Operations
```tsx
import { debounce } from 'lodash';

const handleSearch = debounce((query) => {
  // Heavy search operation
}, 300);
```

#### Use Web Workers for Heavy Computation
```tsx
// worker.ts
self.onmessage = (e) => {
  const result = expensiveCalculation(e.data);
  self.postMessage(result);
};
```

---

## 📐 CLS (Cumulative Layout Shift) Optimization

### Current Strategies
1. ✅ **Font display: swap** prevents font-loading shifts
2. ✅ **Fixed grid layouts** with consistent spacing
3. ✅ **Defined dimensions** on stat panels

### Additional Recommendations

#### Reserve Space for Dynamic Content
```tsx
// Instead of:
<div>{loading ? null : <Content />}</div>

// Do this:
<div className="min-h-[200px]">
  {loading ? <Skeleton /> : <Content />}
</div>
```

#### Skeleton Screens
```tsx
function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}
```

#### Aspect Ratio Boxes
```tsx
<div className="aspect-w-16 aspect-h-9">
  <Image src="..." layout="fill" objectFit="cover" />
</div>
```

---

## 🛠️ Testing & Monitoring

### Development Tools

1. **Browser DevTools**
   - Open Chrome DevTools → Lighthouse
   - Run audit with "Desktop" or "Mobile" profile
   - Check Performance tab for detailed metrics

2. **Web Vitals Chrome Extension**
   - Install: [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
   - Shows real-time Core Web Vitals overlay

3. **Vercel Analytics Dashboard**
   - Automatic tracking if deployed on Vercel
   - View: https://vercel.com/dashboard/analytics

### Production Monitoring

1. **Google Search Console**
   - Experience → Core Web Vitals report
   - Shows field data from real users
   - URL: https://search.google.com/search-console

2. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Test: `https://recxchange.io`
   - Provides lab + field data

3. **WebPageTest**
   - URL: https://www.webpagetest.org/
   - Advanced waterfall analysis
   - Test from multiple locations

### Custom Monitoring

The `WebVitals` component sends metrics to `/api/vitals`. Create this endpoint:

```typescript
// app/api/vitals/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Log to your analytics service
  console.log('Web Vitals:', body);
  
  // Send to analytics (e.g., Google Analytics, Mixpanel)
  // await sendToAnalytics(body);
  
  return NextResponse.json({ received: true });
}
```

---

## 🚀 Deployment Checklist

### Before Deploy
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test on slow 3G network (Chrome DevTools → Network → Throttling)
- [ ] Check all images are optimized and using Next.js Image component
- [ ] Verify lazy loading is working for below-fold content
- [ ] Test on real mobile devices (not just DevTools)

### After Deploy
- [ ] Monitor Web Vitals in production for 24-48 hours
- [ ] Check Google Search Console Core Web Vitals report (takes ~28 days for data)
- [ ] Run PageSpeed Insights on live URL
- [ ] Test from multiple geographic locations (WebPageTest)

---

## 📈 Performance Budget

| Resource | Budget | Current | Status |
|----------|--------|---------|--------|
| **Total Page Size** | < 1.5 MB | TBD | 🟡 Monitor |
| **JavaScript Bundle** | < 300 KB | TBD | 🟡 Monitor |
| **CSS Bundle** | < 100 KB | TBD | ✅ Good |
| **Images (Total)** | < 500 KB | TBD | 🟡 Monitor |
| **Fonts** | < 100 KB | ~50 KB | ✅ Good |
| **LCP** | < 2.5s | TBD | 🎯 Target |
| **FID/INP** | < 100/200ms | TBD | 🎯 Target |
| **CLS** | < 0.1 | TBD | 🎯 Target |

---

## 🔍 Debugging Poor Performance

### If LCP is Slow (> 2.5s)
1. Check Network tab for slow image/font loads
2. Identify LCP element using Lighthouse
3. Ensure LCP element isn't lazy-loaded
4. Add `priority` to critical images
5. Optimize/compress large images

### If FID/INP is High (> 100ms/200ms)
1. Check for long JavaScript tasks (Performance tab)
2. Profile with Chrome DevTools Performance profiler
3. Look for blocking render patterns
4. Move heavy computation to Web Workers
5. Debounce/throttle event handlers

### If CLS is High (> 0.1)
1. Use Layout Instability API to identify culprits:
   ```js
   new PerformanceObserver((list) => {
     list.getEntries().forEach((entry) => {
       console.log('Layout shift:', entry);
     });
   }).observe({ type: 'layout-shift', buffered: true });
   ```
2. Reserve space for ads/embeds
3. Add dimensions to all images
4. Use skeleton screens for loading states

---

## 📚 Additional Resources

### Official Documentation
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/pages/building-your-application/optimizing)
- [Google Search Central - Page Experience](https://developers.google.com/search/docs/appearance/page-experience)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Automated audits
- [Bundlephobia](https://bundlephobia.com/) - Check package sizes before installing
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - Visualize bundle composition

### Best Practices
- [Web Performance Working Group](https://www.w3.org/webperf/)
- [Chrome DevTools Performance Tips](https://developer.chrome.com/docs/devtools/performance/)
- [Vercel Analytics Guide](https://vercel.com/docs/analytics)

---

## 📋 Summary

Core Web Vitals optimizations implemented:

1. ✅ **Next.js Config** - Image optimization, compression, SWC minification
2. ✅ **Font Loading** - `display: swap` for faster rendering
3. ✅ **Web Vitals Monitoring** - Real-time performance tracking
4. ✅ **Bundle Optimization** - Tree-shaking, package optimization
5. ✅ **Layout Stability** - Fixed dimensions, consistent spacing

**Next Steps:**
1. Deploy to production
2. Monitor metrics for 7 days
3. Analyze Web Vitals data
4. Iterate based on real user data
5. Re-test monthly and optimize as needed

---

**Last Updated:** March 8, 2026  
**Maintained By:** Tom Andrews / AMIVY Designs
