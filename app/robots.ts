import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule for all search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',              // Block API routes from indexing
          '/admin/',            // Block admin pages
          '/account-management/', // Block user account pages (private)
          '/_next/',            // Block Next.js internal files
          '/static/',           // Block static build files (if any)
        ],
      },
      // Specific rule for Google (most permissive)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/account-management/',
        ],
        crawlDelay: 0,        // No delay for Google (fast indexing)
      },
      // Specific rule for Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/account-management/',
        ],
        crawlDelay: 0,
      },
      // Block bad bots and scrapers
      {
        userAgent: [
          'AhrefsBot',        // SEO tool bot (optional - blocks competitor analysis)
          'SemrushBot',       // SEO tool bot
          'MJ12bot',          // Majestic bot
          'DotBot',           // Moz bot
        ],
        disallow: '/',        // Block these entirely (optional - you can allow if you want SEO tool data)
      },
    ],
    sitemap: 'https://recxchange.io/sitemap.xml',
    host: 'https://recxchange.io',  // Canonical domain
  }
}
