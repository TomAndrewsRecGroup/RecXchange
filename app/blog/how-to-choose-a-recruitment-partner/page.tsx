import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "How to Choose a Recruitment Partner | RecXchange",
  description: "Choosing a recruitment partner: 8 questions to ask, fee structures explained, and how to evaluate candidate quality. A practical guide for hiring managers.",
  keywords: [
    "how to choose a recruitment partner",
    "choosing a recruitment agency UK",
    "recruitment partner evaluation guide",
    "how to evaluate recruitment agencies",
    "choosing recruitment supplier",
    "recruitment agency buyer guide",
    "HR guide choosing recruiter",
    "best recruitment partner UK 2026"
  ],
  alternates: { canonical: "https://recxchange.io/blog/how-to-choose-a-recruitment-partner" },
  openGraph: {
    title: "How to Choose a Recruitment Partner: The Complete Buyer's Guide",
    description: "8 questions every hiring manager must ask before choosing a recruitment partner. Fee structures, quality evaluation, red flags.",
    url: "https://recxchange.io/blog/how-to-choose-a-recruitment-partner",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "How to Choose a Recruitment Partner" }]
  },
  twitter: { card: "summary_large_image", title: "How to Choose a Recruitment Partner", description: "8 questions every hiring manager must ask. Fee structures, quality evaluation, red flags explained.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function HowToChooseRecruitmentPartnerPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/blog/how-to-choose-a-recruitment-partner#article",
    "url": "https://recxchange.io/blog/how-to-choose-a-recruitment-partner",
    "headline": "How to Choose a Recruitment Partner: The Complete Buyer's Guide",
    "description": "A practical buyer's guide for HR Directors and hiring managers evaluating recruitment partners.",
    "author": { "@type": "Person", "name": "Tom Andrews", "jobTitle": "CEO and Co-Founder", "url": "https://recxchange.io", "worksFor": { "@type": "Organization", "name": "RecXchange" } },
    "publisher": { "@type": "Organization", "name": "RecXchange", "logo": { "@type": "ImageObject", "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png" } },
    "datePublished": "2026-01-01",
    "dateModified": "2026-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://recxchange.io/blog/how-to-choose-a-recruitment-partner" },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" },
        { "@type": "ListItem", "position": 3, "name": "How to Choose a Recruitment Partner", "item": "https://recxchange.io/blog/how-to-choose-a-recruitment-partner" }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What questions should I ask a recruitment agency before signing Terms of Business?",
        "acceptedAnswer": { "@type": "Answer", "text": "You should ask about their fee structure and rebate terms, sector-specific placement history over the last 12 months, sourcing strategy for passive candidates, and whether they provide a named Account Manager. A credible recruitment partner will also offer deal protection to prevent duplicate candidate submissions and should be willing to provide references from similar placements without requiring you to sign Terms first." }
      },
      {
        "@type": "Question",
        "name": "Should I give a recruitment agency exclusivity on a role?",
        "acceptedAnswer": { "@type": "Answer", "text": "For most roles below C-suite level, exclusivity rarely benefits the hiring manager. It limits your search to a single recruiter's database and network, which reduces your chances of finding the best candidate. The strongest recruitment partners work confidently on a non-exclusive basis because their candidate quality speaks for itself. Platforms like RecXchange give you access to 15,000+ specialist recruiters without any exclusivity requirement." }
      },
      {
        "@type": "Question",
        "name": "What is a good rebate period for a recruitment agency?",
        "acceptedAnswer": { "@type": "Answer", "text": "A minimum 12-week rebate guarantee is the industry standard for a credible recruitment partner. Any agency offering a rebate period shorter than 8 weeks should be treated as a red flag. RecXchange includes a 12-week rebate guarantee as standard on all placements, with a success-only fee of 12 to 20% and zero upfront cost." }
      }
    ]
  };

  const questions = [
    {
      q: "1. What is your fee structure, and what am I paying for?",
      a: "Understand exactly what you pay, when you pay it, and what happens if the placement fails. Avoid partners who are vague about retainer structures or whose Terms of Business bury the rebate conditions. The best partners have transparent, published fee structures with a minimum 12-week rebate guarantee as standard."
    },
    {
      q: "2. How deep is your candidate network in my specific sector?",
      a: "Ask for evidence: how many placements have they made in your exact sector and seniority level in the last 12 months? A generalist agency claiming to cover Technology, Healthcare, and Finance equally well is almost certainly mediocre in all three. Sector-specific depth, backed by placement data, is the only reliable indicator of candidate network quality."
    },
    {
      q: "3. How will you source candidates for this role?",
      a: "If the answer is \"we\u2019ll post it on job boards and search our database,\" that\u2019s not a specialist recruiter, that\u2019s a generalist with a subscription. For specialist roles, you need a partner who can articulate specific passive candidate sourcing strategies: direct approach, relationship networks, cross-border sourcing, or split fee collaboration to access other recruiters\u2019 pipelines."
    },
    {
      q: "4. Who will be my single point of contact, and how available are they?",
      a: "Recruitment quality degrades when your account is handed between junior consultants. Establish upfront who your named Account Manager is, what their experience level is, and how they handle your account when they\u2019re unavailable. Platforms like RecXchange include a dedicated Account Manager as standard, with full briefing, submission quality control, and ongoing communication accountability."
    },
    {
      q: "5. How do you prevent duplicate candidate submissions?",
      a: "If you\u2019re using multiple agencies, the risk of the same candidate being submitted by two agencies simultaneously, creating a fee dispute, is real. Ask your recruitment partner how they prevent this. The best platforms have deal protection built in, with timestamped submissions and binding ownership records that eliminate disputes before they start."
    },
    {
      q: "6. What is your average time to first shortlist for this type of role?",
      a: "Get a commitment in writing. \"As fast as possible\" is not an answer. A specialist recruiter with deep passive candidate networks should be able to commit to first shortlist delivery within a defined timeframe, typically 5 to 10 business days for permanent roles, 24 to 48 hours for contract. If they can\u2019t give you a number, their pipeline isn\u2019t as strong as they claim."
    },
    {
      q: "7. Do you require exclusivity?",
      a: "Exclusivity requirements should be treated with caution. A recruiter who insists on exclusivity is asking you to bet your hire on their single database and network. Unless they\u2019re a genuinely elite retained search firm for a true C-suite appointment, exclusivity rarely benefits the hiring manager. The best recruitment partners work confidently on a non-exclusive basis because their candidate quality speaks for itself."
    },
    {
      q: "8. Can you provide references from similar placements?",
      a: "A recruitment partner with genuine sector depth should be able to provide references from hiring managers at comparable organisations for similar roles. If they struggle to provide relevant references, or only offer to provide them \"after we\u2019ve signed Terms,\" treat it as a red flag. Confidence in past performance is a basic expectation from any credible recruitment partner."
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Buyer&apos;s Guide</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">How to Choose a Recruitment Partner: The Complete Buyer&apos;s Guide</h1>
          <p className="text-gray-400 text-sm mb-10">Published: January 2026 &nbsp;·&nbsp; 10 min read</p>

          <p className="text-gray-300 text-lg mb-12 leading-relaxed">
            Choosing the wrong recruitment partner costs more than their fee, it costs you time, candidate quality, and in the worst cases, the hire itself. This guide gives you the eight questions you must ask any recruitment partner before signing Terms of Business, and explains what good answers look like.
          </p>

          <div className="space-y-10">
            {questions.map((item) => (
              <div key={item.q} className="border-l-2 border-cyan-400/30 pl-6">
                <h2 className="text-lg font-bold text-white mb-3">{item.q}</h2>
                <p className="text-gray-300 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mt-14 mb-4">Red Flags to Watch For</h2>
          <ul className="text-gray-300 mb-8 space-y-2 list-none">
            {[
              "Vague or unpublished fee structures",
              "Mandatory exclusivity for non-executive roles",
              "No named Account Manager or high consultant turnover",
              "Inability to provide sector-specific placement references",
              "Retainer required with no placement guarantee",
              "No rebate period, or rebate period shorter than 8 weeks",
              "Sourcing strategy limited to job boards and database search",
              "No deal protection or candidate ownership process"
            ].map((flag) => (
              <li key={flag} className="flex items-start gap-3">
                <span className="text-red-400 mt-1 shrink-0">⚠</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Answers Every Question</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange is built to pass every test in this guide. Published fee structure (12 to 20% success fee only). Dedicated Account Manager included as standard. 15,000+ specialist recruiter networks with sector-specific depth. Deal protection built into every submission. Non-exclusive. 12-week rebate guarantee. Zero upfront cost. First shortlist within 48 to 72 hours for most specialist roles. No retainers. No lock-in.
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
            <p className="text-cyan-400 font-bold mb-2">Ready to work with a recruitment partner that passes every test?</p>
            <p className="text-gray-300 text-sm">Post your first role on RecXchange. Zero upfront cost. Dedicated Account Manager. Top 1% candidates. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
