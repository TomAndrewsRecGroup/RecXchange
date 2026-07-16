import { MetadataRoute } from 'next';
import { getRoles } from '@/lib/roles/fetch';

// lastModified uses real dates, not new Date().
// Using new Date() re-stamps every build as "just modified" which pollutes
// crawl frequency signals and wastes crawl budget on unchanged pages.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://recxchange.io';
  const redesignDate = new Date('2026-07-15');
  const legalDate = new Date('2026-01-01');

  // Live role postings: Google discovers JobPosting pages primarily through
  // the sitemap, so every open role gets its own entry.
  let roleEntries: MetadataRoute.Sitemap = [];
  try {
    const { roles } = await getRoles();
    roleEntries = roles.map((role) => ({
      url: `${baseUrl}/roles/${role.id}`,
      lastModified: new Date(role.postedAt),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('[sitemap] Failed to load roles:', error);
  }

  return [
    // ─── Core (recruiter-led) ────────────────────────────────────
    { url: baseUrl, lastModified: redesignDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/how-it-works`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/roles`, lastModified: redesignDate, changeFrequency: 'daily', priority: 0.95 },
    ...roleEntries,
    { url: `${baseUrl}/earn-more-as-a-recruiter`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/pricing`, lastModified: redesignDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/why-recxchange`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.80 },

    // ─── Employer pillar ─────────────────────────────────────────
    { url: `${baseUrl}/for-employers`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/contact`, lastModified: redesignDate, changeFrequency: 'yearly', priority: 0.60 },

    // ─── Comparisons ─────────────────────────────────────────────
    { url: `${baseUrl}/compare`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/compare/vs-job-boards`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/compare/vs-recruitment-agencies`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/compare/vs-split-fee-networks`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.78 },

    // ─── Blog (the long-tail SEO engine) ─────────────────────────
    { url: `${baseUrl}/blog`, lastModified: redesignDate, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${baseUrl}/blog/what-is-split-fee-recruitment`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog/how-to-fill-hard-to-fill-roles`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/blog/split-fee-vs-contingency-recruitment`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/blog/how-split-fee-recruitment-works-for-hiring-managers`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/blog/recruiter-collaboration-guide`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/blog/reduce-cost-per-hire`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/blog/xchange-engine-explained`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/blog/recruitment-trends-2026`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog/how-to-choose-a-recruitment-partner`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${baseUrl}/blog/how-to-monetise-unused-candidates`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/blog/split-fee-agreement-guide`, lastModified: redesignDate, changeFrequency: 'monthly', priority: 0.82 },

    // ─── Legal ───────────────────────────────────────────────────
    { url: `${baseUrl}/privacy`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.30 },
    { url: `${baseUrl}/terms`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.30 },
    { url: `${baseUrl}/cookie-policy`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.25 },
    { url: `${baseUrl}/gdpr`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.25 },
  ];
}
