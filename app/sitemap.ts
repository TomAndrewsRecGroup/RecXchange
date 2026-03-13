import { MetadataRoute } from 'next';

// lastModified uses real dates, not new Date().
// Using new Date() re-stamps every build as "just modified" which pollutes
// crawl frequency signals and wastes crawl budget on unchanged pages.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://recxchange.io';
  const seoDate = new Date('2026-03-13');
  const legalDate = new Date('2026-01-01');

  return [
    // ─── Homepage ───────────────────────────────────────────────
    { url: baseUrl, lastModified: seoDate, changeFrequency: 'weekly', priority: 1.0 },

    // ─── Core recruiter journey ──────────────────────────────────
    { url: `${baseUrl}/recruiter`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/collaboration`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${baseUrl}/recruiter-roles`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/recruiters-with-candidates`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/how-recruiter-collaboration-works`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/how-to-find-recruitment-partners`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/what-is-split-fee-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/what-is-recx-direct`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/recruitment-fee-structures`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.75 },

    // ─── Hiring manager journey ──────────────────────────────────
    { url: `${baseUrl}/hiring-manager-home`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/hiring-manager-live`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/hiring-manager-strategic`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/account-management`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.70 },

    // ─── High-value product pages ────────────────────────────────
    { url: `${baseUrl}/pricing`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/why-recxchange`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${baseUrl}/split-fees`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/deal-protection`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/faq`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/roles`, lastModified: seoDate, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/affiliate`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${baseUrl}/contact`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.55 },
    { url: `${baseUrl}/research`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.60 },

    // ─── Phase B: Pillar pages ───────────────────────────────────
    { url: `${baseUrl}/split-fee-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/recruiter-collaboration-platform`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/hire-specialist-recruiters`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${baseUrl}/recruitment-marketplace`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${baseUrl}/passive-candidate-sourcing`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },

    // ─── Phase B: Sector pages ───────────────────────────────────
    { url: `${baseUrl}/sectors/technology-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/engineering-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/healthcare-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/finance-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/sales-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/sectors/hr-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/sectors/legal-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/sectors/construction-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },

    // ─── Phase C: Location pages ─────────────────────────────────
    { url: `${baseUrl}/locations/recruitment-london`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/locations/recruitment-manchester`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/locations/recruitment-birmingham`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/locations/recruitment-usa`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/locations/recruitment-uae`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/locations/recruitment-australia`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },

    // ─── Phase D: Vs comparison pages ───────────────────────────
    { url: `${baseUrl}/vs/recxchange-vs-linkedin-recruiter`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/vs/recxchange-vs-indeed`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/vs/recxchange-vs-traditional-agency`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/vs/recxchange-vs-retained-search`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/vs/recxchange-vs-rpo`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/recxchange-vs-job-boards`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/recxchange-vs-in-house-recruiter`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/recxchange-vs-headhunter`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },

    // ─── Phase E: Use case pages ─────────────────────────────────
    { url: `${baseUrl}/use-cases`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/use-cases/scale-up-hiring`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/use-cases/hard-to-fill-roles`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/use-cases/senior-executive-search`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/use-cases/contract-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/use-cases/volume-hiring`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/use-cases/international-hiring`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },

    // ─── Phase F: Blog articles ──────────────────────────────────
    { url: `${baseUrl}/blog`, lastModified: seoDate, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${baseUrl}/blog/what-is-split-fee-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog/how-to-fill-hard-to-fill-roles`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/blog/split-fee-vs-contingency-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/blog/how-split-fee-recruitment-works-for-hiring-managers`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/blog/recruiter-collaboration-guide`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/blog/reduce-cost-per-hire`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/blog/xchange-engine-explained`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/blog/recruitment-trends-2026`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog/how-to-choose-a-recruitment-partner`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.84 },

    // ─── Legal & policy pages ────────────────────────────────────
    { url: `${baseUrl}/privacy`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.30 },
    { url: `${baseUrl}/terms`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.30 },
    { url: `${baseUrl}/cookie-policy`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.25 },
    { url: `${baseUrl}/gdpr`, lastModified: legalDate, changeFrequency: 'yearly', priority: 0.25 },
  ];
}
