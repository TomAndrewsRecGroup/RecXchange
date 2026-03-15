import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
        ],
      },

      // Traditional search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0,
      },

      // AI search & LLM crawlers — explicitly allowed for AIO/GEO
      {
        userAgent: 'GPTBot',           // OpenAI training
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'OAI-SearchBot',    // OpenAI SearchGPT / ChatGPT search
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',     // ChatGPT browsing mode
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',       // Anthropic Claude browsing
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',     // Anthropic training
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',    // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',  // Gemini / Google AI
        allow: '/',
      },
      {
        userAgent: 'Applebot',         // Apple search
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple Intelligence
        allow: '/',
      },
      {
        userAgent: 'Amazonbot',        // Amazon Alexa AI
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'CCBot',            // Common Crawl (used by many LLMs)
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
      {
        userAgent: 'YouBot',           // You.com AI search
        allow: '/',
      },

      // SEO audit tools — allowed so your own SEO monitoring works correctly.
      // Blocking these only hurts your ability to track your own rankings.
      {
        userAgent: 'AhrefsBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },

      // Low-value crawlers — still blocked
      {
        userAgent: [
          'MJ12bot',
          'DotBot',
        ],
        disallow: '/',
      },
    ],
    // Both www and non-www sitemaps listed so GSC can be verified on either property.
    // Canonical URLs inside the sitemap remain https://recxchange.io (non-www).
    sitemap: [
      'https://recxchange.io/sitemap.xml',
      'https://www.recxchange.io/sitemap.xml',
    ],
  }
}
