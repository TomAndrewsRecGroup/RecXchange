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
          '/_next/',            // Block Next.js internal files
          '/static/',           // Block static build files (if any)
        ],
      },
      // Traditional Search Engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
        crawlDelay: 0,        // No delay for Google (fast indexing)
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
        crawlDelay: 0,
      },
      // AI Search Engines & Crawlers (CRITICAL for AIO/GEO)
      {
        userAgent: 'GPTBot',           // OpenAI ChatGPT crawler
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',     // ChatGPT browsing
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',       // Anthropic Claude
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',    // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',  // Google Bard/Gemini
        allow: '/',
      },
      {
        userAgent: 'CCBot',            // Common Crawl (used by many AI systems)
        allow: '/',
      },
      {
        userAgent: 'cohere-ai',        // Cohere AI
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',      // Meta AI
        allow: '/',
      },
      // Block bad bots and scrapers (optional)
      {
        userAgent: [
          'AhrefsBot',        // SEO tool bot
          'SemrushBot',       // SEO tool bot
          'MJ12bot',          // Majestic bot
          'DotBot',           // Moz bot
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://recxchange.io/sitemap.xml',
    host: 'https://recxchange.io',  // Canonical domain
  }
}
