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
    { url: `${baseUrl}/freelance-recruiters`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/what-is-split-fee-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/what-is-recx-direct`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/recruitment-fee-structures`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/earnings-calculator`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },

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
    // /research is noindex — intentionally excluded from sitemap

    // ─── Pillar pages ──────────────────────────────────────────
    { url: `${baseUrl}/split-fee-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/recruiter-collaboration-platform`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${baseUrl}/hire-specialist-recruiters`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${baseUrl}/recruitment-marketplace`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${baseUrl}/passive-candidate-sourcing`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },

    // ─── Phase B: Sector pages (slugs match /app/sectors/* dirs) ──────────
    { url: `${baseUrl}/sectors`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/sectors/technology`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/engineering`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/healthcare`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/finance`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/sectors/sales`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/sectors/hr-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/sectors/legal`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/sectors/construction`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },

    // ─── Phase C: Location pages (slugs match /app/locations/* dirs) ───────
    { url: `${baseUrl}/locations`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/locations/united-kingdom`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/locations/united-states`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/locations/united-arab-emirates`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/locations/australia`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/locations/europe`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/locations/south-africa`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.76 },

    // ─── Phase D: Vs comparison pages (slugs match /app/vs/* dirs) ──────────
    { url: `${baseUrl}/vs`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/vs/linkedin-recruiter`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${baseUrl}/vs/recruitment-agency`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/vs/retained-search`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.83 },
    { url: `${baseUrl}/vs/rpo`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/job-boards`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/internal-recruiter`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/staffing-agencies`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/contingency-recruitment`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/top-echelon`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/npa-worldwide`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/vs/recruit-alliance`, lastModified: seoDate, changeFrequency: 'monthly', priority: 0.80 },

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
