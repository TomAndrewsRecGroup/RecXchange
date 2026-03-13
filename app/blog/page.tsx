import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Recruitment Blog & Guides | Split Fee, Hiring Strategy & Industry Insights | RecXchange",
  description: "Guides, strategies and industry insights for hiring managers and specialist recruiters. Split fee recruitment explained, how to fill hard-to-fill roles, cost per hire reduction, recruiter collaboration, and recruitment trends 2026.",
  alternates: { canonical: "https://recxchange.io/blog" },
  openGraph: {
    title: "Recruitment Blog & Guides | RecXchange",
    description: "Guides and insights for hiring managers and recruiters. Split fee, hard-to-fill roles, cost per hire, recruiter collaboration.",
    url: "https://recxchange.io/blog",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Blog" }]
  },
};

const articles = [
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
    desc: "The true cost of agencies, job boards, and LinkedIn Recruiter — and how RecXchange delivers better hires at materially lower total cost.",
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
    desc: "A deep dive into RecXchange's AI-powered matching engine: how it classifies roles, scores recruiters, and activates the right network in real time.",
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
    desc: "The 8 questions every hiring manager must ask before signing Terms of Business — and the red flags to watch for.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Blog &amp; Guides</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Recruitment Insights</h1>
          <p className="text-gray-300 text-lg mb-16 max-w-2xl">Guides, strategies, and industry analysis for hiring managers and specialist recruiters.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.href} href={article.href} className="group block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3 block">{article.tag}</span>
                <h2 className="text-white font-bold text-lg mb-3 group-hover:text-cyan-400 transition-colors leading-snug">{article.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{article.desc}</p>
                <span className="text-gray-500 text-xs">{article.read} read</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
