import { safeJsonLd } from '@/lib/seo/jsonld';
// Metadata is exported from blog/layout.tsx - do not duplicate here.
import React from 'react';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import { SectionHeading } from '@/components/redesign/ui';

const articles = [
  {
    href: "/blog/how-to-monetise-unused-candidates",
    tag: "Strategy",
    title: "How to Monetise Unused Candidates",
    desc: "Turn dead leads into revenue. How recruiters earn from candidates sitting idle on their desk through split fee placements.",
    read: "7 min"
  },
  {
    href: "/blog/split-fee-agreement-guide",
    tag: "Guide",
    title: "Split Fee Agreements Explained",
    desc: "What to include in a split fee agreement, why they matter, and how to protect yourself before sharing candidates.",
    read: "8 min"
  },
  {
    href: "/blog/what-is-split-fee-recruitment",
    tag: "Guide",
    title: "What Is Split Fee Recruitment?",
    desc: "The definitive guide to split fee recruitment: how it works, fee split percentages, deal protection, and how RecXchange makes collaboration seamless.",
    read: "8 min"
  },
  {
    href: "/blog/split-fee-vs-contingency-recruitment",
    tag: "Guide",
    title: "Split Fee vs Contingency Recruitment",
    desc: "How the two models differ, why split fee aligns incentives correctly, and when each approach is right for your role.",
    read: "9 min"
  },
  {
    href: "/blog/how-split-fee-recruitment-works-for-hiring-managers",
    tag: "Guide",
    title: "How Split Fee Works for Hiring Managers",
    desc: "Plain-English explainer for hiring managers: what it means for your fees, your process, and why you get better candidates.",
    read: "7 min"
  },
  {
    href: "/blog/how-to-fill-hard-to-fill-roles",
    tag: "Strategy",
    title: "How to Fill Hard-to-Fill Roles: 7 Proven Strategies",
    desc: "Seven strategies that work for specialist, niche, and senior roles that job boards and generalist agencies can't crack.",
    read: "10 min"
  },
  {
    href: "/blog/reduce-cost-per-hire",
    tag: "For HR Leaders",
    title: "How to Reduce Cost Per Hire",
    desc: "The true cost of agencies, job boards, and LinkedIn Recruiter, and how RecXchange delivers better hires at materially lower total cost.",
    read: "10 min"
  },
  {
    href: "/blog/recruiter-collaboration-guide",
    tag: "For Recruiters",
    title: "The Recruiter's Guide to Collaboration",
    desc: "How specialist recruiters can double their billings through structured split fee collaboration on RecXchange.",
    read: "11 min"
  },
  {
    href: "/blog/xchange-engine-explained",
    tag: "Technology",
    title: "The Xchange Engine Explained",
    desc: "How RecXchange's AI matching engine actually works: classifying roles, scoring recruiters, and activating the right network in real time.",
    read: "8 min"
  },
  {
    href: "/blog/recruitment-trends-2026",
    tag: "2026 Trends",
    title: "Recruitment Trends 2026",
    desc: "Six trends shaping hiring in 2026: AI matching, recruiter collaboration networks, cost pressure, skills shortages, candidate experience, and international sourcing.",
    read: "9 min"
  },
  {
    href: "/blog/how-to-choose-a-recruitment-partner",
    tag: "Buyer's Guide",
    title: "How to Choose a Recruitment Partner",
    desc: "The 8 questions every hiring manager must ask before signing Terms of Business, and the red flags to watch for.",
    read: "10 min"
  },
];

export default function BlogHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/blog#collectionpage",
    "url": "https://recxchange.io/blog",
    "name": "Recruitment Blog & Guides | RecXchange",
    "description": "Guides, strategies and insights for hiring managers and specialist recruiters.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" }
      ]
    },
    "hasPart": articles.map((a, i) => ({
      "@type": "Article",
      "position": i + 1,
      "name": a.title,
      "url": `https://recxchange.io${a.href}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Blog &amp; guides"
            title={
              <>
                Recruitment <span className="grad-text">insights</span>
              </>
            }
            sub="Guides, strategies, and industry analysis for specialist recruiters and the people who hire through them."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.href} delay={(i % 3) * 90}>
              <Link
                href={article.href}
                className="group flex h-full flex-col rounded-2xl glass p-6 transition-all duration-300 hover:border-[var(--rx-violet)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="mb-3 self-start rounded-full bg-white/[0.07] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] grad-text">
                  {article.tag}
                </span>
                <h2 className="text-base font-bold text-white leading-snug mb-2 group-hover:grad-text">
                  {article.title}
                </h2>
                <p className="flex-grow text-sm leading-relaxed text-[var(--rx-muted)]">
                  {article.desc}
                </p>
                <span className="mt-4 text-xs text-[var(--rx-faint)]">
                  {article.read} read
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
