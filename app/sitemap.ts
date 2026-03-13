import { MetadataRoute } from 'next';

// lastModified uses real dates, not new Date().
// Using new Date() re-stamps every build as "just modified" which pollutes
// crawl frequency signals and wastes crawl budget on unchanged pages.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://recxchange.io';

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Core recruiter journey
    {
      url: `${baseUrl}/recruiter`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/collaboration`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/recruiter-roles`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/recruiters-with-candidates`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    // Hiring manager journey
    {
      url: `${baseUrl}/hiring-manager-home`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/hiring-manager-live`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/hiring-manager-strategic`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/account-management`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'monthly',
      priority: 0.70,
    },

    // High-value content pages
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/why-recxchange`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/split-fees`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deal-protection`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'monthly',
      priority: 0.80,
    },

    // Live roles feed — daily crawl warranted
    {
      url: `${baseUrl}/roles`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'daily',
      priority: 0.85,
    },

    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'weekly',
      priority: 0.75,
    },

    // Affiliate & growth
    {
      url: `${baseUrl}/affiliate`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.60,
    },

    // Contact
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'monthly',
      priority: 0.55,
    },

    // Supporting pages
    {
      url: `${baseUrl}/research`,
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'monthly',
      priority: 0.60,
    },

    // Legal — noindex on their layouts; excluded from sitemap intentionally
    // /privacy, /terms, /cookie-policy, /gdpr are noindex and excluded
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.30,
    },
  ];
}
