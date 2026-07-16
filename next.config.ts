import type { NextConfig } from "next";

// Security headers applied to every response (pages + API routes).
// CSP notes:
// - 'unsafe-eval' removed: nothing on the site evaluates code at runtime.
// - script-src keeps 'unsafe-inline' deliberately: Next.js injects inline
//   hydration scripts, and a nonce-based CSP would force every page dynamic,
//   defeating static/ISR rendering. Standard trade-off for static marketing
//   sites; JSON-LD scripts are additionally XSS-hardened via safeJsonLd().
// - img-src scoped to our actual image hosts instead of all of https/http.
// - Allowlists for removed integrations (Calendly, jsDelivr, YouTube/Vimeo
//   frames, Telegram) dropped with the features that used them.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://haaqtnq6favvrbuh.public.blob.vercel-storage.com https://res.cloudinary.com https://www.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' https://*.google-analytics.com https://*.vercel-insights.com",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'haaqtnq6favvrbuh.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Optimize image loading for better LCP
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Performance optimizations
  reactStrictMode: true,
  compress: true, // Enable gzip/brotli compression
  poweredByHeader: false, // Remove X-Powered-By header (security + performance)
  
  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production
  
  // Compiler optimizations for better performance
  compiler: {
    // Remove console.log in production for smaller bundle
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // 301 map for the 2026 IA consolidation (83 → ~20 routes).
  // Every retired URL forwards its link equity to its successor.
  async redirects() {
    const to = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true,
    });

    return [
      // Recruiter pages → recruiter-led home
      to('/recruiter', '/'),
      to('/freelance-recruiters', '/'),
      to('/recruiters-with-candidates', '/'),
      to('/recruiter-roles', '/roles'),

      // Hiring-manager / employer pages → employer pillar
      to('/hiring-manager-home', '/for-employers'),
      to('/hiring-manager-live', '/for-employers'),
      to('/hiring-manager-strategic', '/for-employers'),
      to('/hire-specialist-recruiters', '/for-employers'),
      to('/what-is-recx-direct', '/for-employers'),
      to('/passive-candidate-sourcing', '/for-employers'),
      to('/how-to-find-recruitment-partners', '/for-employers'),
      to('/use-cases/:path*', '/for-employers'),
      to('/use-cases', '/for-employers'),

      // Split-fee / marketplace explainers → canonical explainer
      to('/collaboration', '/how-it-works'),
      to('/how-recruiter-collaboration-works', '/how-it-works'),
      to('/recruiter-collaboration-platform', '/how-it-works'),
      to('/recruitment-marketplace', '/how-it-works'),
      to('/split-fees', '/how-it-works'),
      to('/split-fee-recruitment', '/how-it-works'),
      to('/what-is-split-fee-recruitment', '/how-it-works'),

      // Pricing-adjacent
      to('/recruitment-fee-structures', '/pricing'),
      to('/earnings-calculator', '/pricing'),

      // Trust pages → why-recxchange
      to('/deal-protection', '/why-recxchange'),
      to('/research', '/why-recxchange'),

      // Comparisons → /compare cluster
      to('/vs/npa-worldwide', '/compare/vs-split-fee-networks'),
      to('/vs/top-echelon', '/compare/vs-split-fee-networks'),
      to('/vs/recruit-alliance', '/compare/vs-split-fee-networks'),
      to('/vs/job-boards', '/compare/vs-job-boards'),
      to('/vs/linkedin-recruiter', '/compare/vs-job-boards'),
      to('/vs/recruitment-agency', '/compare/vs-recruitment-agencies'),
      to('/vs/staffing-agencies', '/compare/vs-recruitment-agencies'),
      to('/vs/contingency-recruitment', '/compare/vs-recruitment-agencies'),
      to('/vs/retained-search', '/compare/vs-recruitment-agencies'),
      to('/vs/rpo', '/compare/vs-recruitment-agencies'),
      to('/vs/internal-recruiter', '/compare/vs-recruitment-agencies'),
      to('/vs/:path*', '/compare'),
      to('/vs', '/compare'),

      // Thin geo/sector doorways → live inventory
      to('/locations/:path*', '/roles'),
      to('/locations', '/roles'),
      to('/sectors/:path*', '/roles'),
      to('/sectors', '/roles'),

      // Non-marketing pages
      to('/account-management', 'https://app.recxchange.io'),
      to('/affiliate', '/contact'),
      to('/investor', '/contact'),
    ];
  },

  // Experimental features for performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['framer-motion', '@heroicons/react'],

    // Enable modern bundling for better performance
    optimizeCss: true,
  },
};

export default nextConfig;
