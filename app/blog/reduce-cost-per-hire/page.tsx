import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "How to Reduce Cost Per Hire | RecXchange",
  description: "Reduce cost per hire without sacrificing quality. The true cost of agency fees, job boards, LinkedIn Recruiter, in-house teams, and a smarter alternative.",
  keywords: [
    "reduce cost per hire",
    "lower recruitment costs",
    "cost per hire guide HR",
    "reduce agency recruitment fees",
    "cheaper recruitment solution",
    "recruitment cost reduction",
    "HR cost per hire benchmark",
    "how to hire cheaper UK"
  ],
  alternates: { canonical: "https://recxchange.io/blog/reduce-cost-per-hire" },
  openGraph: {
    title: "How to Reduce Cost Per Hire: A Practical Guide for HR Leaders",
    description: "The true cost of agency fees, job boards and LinkedIn Recruiter, and how RecXchange delivers better candidates at lower total cost.",
    url: "https://recxchange.io/blog/reduce-cost-per-hire",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "How to Reduce Cost Per Hire" }]
  },
  twitter: { card: "summary_large_image", title: "How to Reduce Cost Per Hire", description: "The true cost of agency fees, job boards and LinkedIn Recruiter, and how to reduce it.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function ReduceCostPerHirePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/blog/reduce-cost-per-hire#article",
    "url": "https://recxchange.io/blog/reduce-cost-per-hire",
    "headline": "How to Reduce Cost Per Hire: A Practical Guide for HR Leaders",
    "description": "Practical guidance for HR Directors and hiring managers on reducing cost per hire without sacrificing candidate quality.",
    "author": { "@type": "Person", "name": "Tom Andrews", "jobTitle": "CEO and Co-Founder", "url": "https://recxchange.io", "worksFor": { "@type": "Organization", "name": "RecXchange" } },
    "publisher": { "@type": "Organization", "name": "RecXchange", "logo": { "@type": "ImageObject", "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png" } },
    "datePublished": "2025-06-01",
    "dateModified": "2026-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://recxchange.io/blog/reduce-cost-per-hire" },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" },
        { "@type": "ListItem", "position": 3, "name": "How to Reduce Cost Per Hire", "item": "https://recxchange.io/blog/reduce-cost-per-hire" }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average cost per hire in the UK?",
        "acceptedAnswer": { "@type": "Answer", "text": "According to SHRM benchmarks, the average cost per hire in the UK is approximately £3,000 to £5,000 for generalist roles and significantly higher for specialist or senior positions, typically £15,000 to £30,000+ where agency fees dominate. Cost per hire includes agency fees, job board subscriptions, LinkedIn Recruiter licences, internal recruiter salaries, ATS costs, and background check fees." }
      },
      {
        "@type": "Question",
        "name": "How can I reduce recruitment agency fees without losing candidate quality?",
        "acceptedAnswer": { "@type": "Answer", "text": "The most effective approach is switching from traditional contingency agencies charging 20 to 25% to a success-fee platform with competitive rates. RecXchange charges 12 to 20% with zero upfront cost, zero retainers, and a dedicated Account Manager included as standard. On a 10-hire programme across £70,000 roles, the cost difference between RecXchange at 15% and a retained search firm at 30% is £105,000, with no compromise on specialist candidate quality." }
      },
      {
        "@type": "Question",
        "name": "Where is most recruitment spend wasted?",
        "acceptedAnswer": { "@type": "Answer", "text": "The three biggest sources of recruitment waste are upfront costs with no placement guarantee (job board subscriptions, LinkedIn Recruiter licences at £7,000 to £10,000 per seat per year, and retainer fees), overpriced agency fees where 20 to 25% delivers no better quality than 12 to 18%, and internal time cost from HR teams spending hours per week sifting CVs and managing multiple agencies for roles that never convert." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">For HR Leaders</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">How to Reduce Cost Per Hire: A Practical Guide for HR Leaders</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2026 &nbsp;·&nbsp; 10 min read</p>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Cost per hire is one of the most scrutinised metrics on any HR Director&apos;s scorecard, and one of the hardest to reduce without introducing trade-offs in candidate quality or time-to-hire. This guide cuts through the noise and provides a practical framework for understanding where your recruitment costs actually come from, where the waste is, and how RecXchange delivers materially lower cost per hire without compromising on outcomes.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What Is Cost Per Hire?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Cost per hire is the total recruitment spend divided by the number of hires made in a period. It includes agency fees, job board subscriptions, LinkedIn Recruiter licences, internal recruiter salaries (pro-rated), ATS costs, background check fees, and any other direct recruitment expenditure. The Society for Human Resource Management (SHRM) benchmarks average cost per hire in the UK at approximately £3,000-£5,000 for generalist roles and significantly higher, £15,000 to 30,000+, for specialist or senior positions where agency fees dominate.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Where Most Recruitment Spend Is Wasted</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Analysis of typical recruitment budgets reveals three major sources of waste: (1) <strong className="text-white">Upfront costs with no placement guarantee</strong>, job board subscriptions, LinkedIn Recruiter licences, and retainer fees that are paid regardless of whether a hire is made. (2) <strong className="text-white">Over-priced agency fees</strong>, agencies charging 20 to 25% when 12 to 18% delivers equivalent or better quality. (3) <strong className="text-white">Internal time cost</strong>, HR teams spending hours per week sifting CVs, managing agencies, and coordinating interviews for roles that never convert.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The True Cost of Traditional Channels</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">Here’s what your current recruitment channels actually cost, fully loaded:</p>
          <ul className="text-gray-300 mb-8 space-y-3 list-none">
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1 shrink-0">→</span><span><strong className="text-white">Job boards (Indeed, Reed, Totaljobs):</strong> £500-£3,000 per posting, paid upfront. No hire guarantee. 80 to 300 unfiltered applications requiring 8 to 20 hours of internal screening time.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1 shrink-0">→</span><span><strong className="text-white">LinkedIn Recruiter:</strong> £7,000 to 10,000/seat/year, paid regardless of hires. 10 to 25% InMail response rate. Significant internal time investment for sourcing and outreach.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1 shrink-0">→</span><span><strong className="text-white">Contingency agencies (15 to 25%):</strong> No upfront cost, but fee on placement is high. Multiple agencies create duplicate submissions and management overhead.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1 shrink-0">→</span><span><strong className="text-white">Retained search (30 to 35%):</strong> High total fee with retainer paid upfront. No placement guarantee. 8 to 16 week process with exclusivity requirement.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1 shrink-0">→</span><span><strong className="text-white">In-house recruiter:</strong> £80,000-£100,000+ fully loaded annual cost. Adds headcount. Generalist reach, not specialist depth.</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Reduces Cost Per Hire</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange addresses all three sources of recruitment waste simultaneously. There are no upfront costs, zero subscription fees, zero retainers, zero job board spend. The success fee of 12 to 20% is at or below the market rate for contingency agencies, and it replaces all other channel spend for the roles you hire through RecXchange. Internal time cost is reduced to near-zero: your dedicated Account Manager handles all recruiter management, CV screening, and submission quality control. You engage only at shortlist stage.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">A Cost Per Hire Comparison</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            For a £70,000 specialist role: a traditional agency at 20% costs £14,000 plus 6 to 10 hours of internal management time. A retained search firm at 30% costs £21,000 with £6,300+ paid upfront. RecXchange at 15% costs £10,500 with zero upfront spend and near-zero internal time cost. On a 10-hire programme across £70,000 roles, the cost difference between RecXchange and retained search is £105,000, enough to justify the ROI conversation with any finance director.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Quality-Adjusted Cost Per Hire</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Raw cost per hire is only half the picture. A cheaper hire who leaves within 6 months has an actual cost that includes re-recruitment fees, lost productivity, and management time, typically 50 to 200% of annual salary. RecXchange&apos;s specialist recruiter model, which accesses passive candidates through relationship-based networks rather than database keyword searches, consistently delivers higher candidate quality and better retention outcomes, reducing the real cost per hire even further on a quality-adjusted basis.
          </p>

          <div className="mt-10 mb-8 p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold text-lg flex-shrink-0">TA</div>
            <div>
              <p className="text-white font-bold text-sm mb-1">Tom Andrews</p>
              <p className="text-gray-400 text-xs mb-2">CEO and Co-Founder, RecXchange</p>
              <p className="text-gray-500 text-xs leading-relaxed">Tom has spent over 14 years in specialist recruitment across building materials, industrial engineering, M&amp;E, and mental health sectors. He co-founded RecXchange to give independent and specialist recruiters a better way to collaborate, split fees, and make more placements without the politics of traditional agency networks.</p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Ready to reduce your cost per hire?</p>
            <p className="text-gray-300 text-sm">Post your next role on RecXchange. 12 to 20% success fee. Zero upfront cost. Near-zero internal time investment. Dedicated Account Manager included. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
