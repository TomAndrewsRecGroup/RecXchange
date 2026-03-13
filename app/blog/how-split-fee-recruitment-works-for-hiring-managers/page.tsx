import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "How Split Fee Recruitment Works for Hiring Managers | RecXchange",
  description: "A plain-English guide to split fee recruitment for hiring managers. What it means, how it affects your fees, why you get better candidates, and how RecXchange manages the entire process on your behalf. No jargon. No complexity. Just better hires.",
  keywords: [
    "split fee recruitment for hiring managers",
    "how split fee recruitment works",
    "hiring manager guide to split fee",
    "split fee recruitment explained simply",
    "recruiter collaboration hiring manager",
    "split placement hiring manager guide",
    "how RecXchange works for employers",
    "split fee recruitment benefits employer"
  ],
  alternates: { canonical: "https://recxchange.io/blog/how-split-fee-recruitment-works-for-hiring-managers" },
  openGraph: {
    title: "How Split Fee Recruitment Works for Hiring Managers",
    description: "Plain-English guide: what split fee means for your hiring process, your fees, and your candidate quality. How RecXchange manages it all.",
    url: "https://recxchange.io/blog/how-split-fee-recruitment-works-for-hiring-managers",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Split Fee Recruitment for Hiring Managers" }]
  },
  twitter: { card: "summary_large_image", title: "How Split Fee Recruitment Works for Hiring Managers", description: "Plain-English guide: what split fee means for your fees, process and candidate quality.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function SplitFeeForHiringManagersPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/blog/how-split-fee-recruitment-works-for-hiring-managers#article",
    "url": "https://recxchange.io/blog/how-split-fee-recruitment-works-for-hiring-managers",
    "headline": "How Split Fee Recruitment Works for Hiring Managers",
    "description": "A plain-English guide for hiring managers on how split fee recruitment works, what it costs, and why it produces better candidates.",
    "author": { "@type": "Organization", "name": "RecXchange", "url": "https://recxchange.io" },
    "publisher": { "@type": "Organization", "name": "RecXchange", "logo": { "@type": "ImageObject", "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png" } },
    "datePublished": "2025-04-01",
    "dateModified": "2026-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://recxchange.io/blog/how-split-fee-recruitment-works-for-hiring-managers" },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" },
        { "@type": "ListItem", "position": 3, "name": "How Split Fee Works for Hiring Managers", "item": "https://recxchange.io/blog/how-split-fee-recruitment-works-for-hiring-managers" }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I pay more if two recruiters are involved in a split fee placement?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. As a hiring manager on RecXchange, you always pay a single agreed fee — typically 12–20% of the candidate's salary. How that fee is distributed between the role-holding recruiter and the candidate-holding recruiter is handled entirely by RecXchange. You are never asked to pay two separate fees or a higher rate because two recruiters were involved." }
      },
      {
        "@type": "Question",
        "name": "How do I know which recruiter found my candidate?",
        "acceptedAnswer": { "@type": "Answer", "text": "RecXchange's platform maintains a full audit trail of every candidate submission, including which recruiter submitted the candidate, when they were submitted, and what split arrangement governs the placement. Your dedicated Account Manager provides full transparency on candidate sourcing on request." }
      },
      {
        "@type": "Question",
        "name": "What happens if the candidate leaves within the guarantee period?",
        "acceptedAnswer": { "@type": "Answer", "text": "RecXchange placements come with a standard rebate guarantee period of 12 weeks. If the placed candidate leaves within this period, RecXchange will re-work the search at no additional charge or provide a pro-rated fee refund depending on the circumstances. Full terms are set out in the hiring manager agreement." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Guide</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">How Split Fee Recruitment Works for Hiring Managers</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2026 &nbsp;·&nbsp; 7 min read</p>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            If you&apos;ve heard the term &ldquo;split fee recruitment&rdquo; and wondered what it actually means for you as a hiring manager — this guide explains it plainly. The short version: it means better candidates, a more managed process, and no change to what you pay. Here&apos;s how it works.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What Split Fee Means in Practice</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            When you post a role on RecXchange, a dedicated Account Manager manages the process on your behalf. Behind the scenes, the Xchange Engine matches your vacancy to specialist recruiters across RecXchange&apos;s 15,000+ network. Some of those recruiters will have exactly the right candidate in their pipeline — even if they don&apos;t normally work with your company directly. When one of those recruiters submits a candidate who is placed, the fee you pay is shared between the recruiter who managed your role (the role-holder) and the recruiter who provided the candidate (the candidate-holder). You pay one fee. They split it between themselves. RecXchange handles the distribution automatically.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">You Always Pay One Fee</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            This is the question every hiring manager asks first: do I pay more because two recruiters are involved? The answer is no. Your fee is agreed upfront with RecXchange — a single success fee of 12–20% of the placed candidate&apos;s salary, payable only when they accept an offer. How that fee is distributed between recruiters is entirely RecXchange&apos;s internal arrangement. You are never invoiced by two separate parties or charged a premium for the collaboration.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Why This Gives You Better Candidates</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional recruitment gives you access to one recruiter&apos;s database. Split fee collaboration gives you access to the combined candidate networks of every recruiter on RecXchange who has relevant sector expertise. For specialist or hard-to-fill roles, this is transformative: instead of waiting for one recruiter to exhaust their database, RecXchange simultaneously activates hundreds of specialists who may each have the exact passive candidate your role needs. The result is faster, higher-quality shortlists.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Your Dedicated Account Manager</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            As a hiring manager on RecXchange, you never deal with the underlying recruiter network directly. Your dedicated Account Manager is your single point of contact. They manage all recruiter briefings, filter incoming candidate submissions to top 1% quality, coordinate interviews, and handle all recruiter communications. You engage only when a genuinely qualified candidate is ready to be presented. The complexity of managing multiple recruiters is invisible to you.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Deal Protection and Candidate Ownership</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Every candidate submitted through RecXchange is governed by the platform&apos;s Deal Protection system. Submissions are timestamped, candidate ownership is recorded, and split fee agreements between recruiters are binding before any candidate data is shared. This means there are no placement disputes, no competing fee claims, and no ambiguity about who owns which candidate. The entire process is governed by platform rules, not informal agreements.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Guarantee Period</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange placements include a 12-week rebate guarantee as standard. If a placed candidate leaves within this period, RecXchange will re-work the search at no additional charge or provide a pro-rated refund, depending on circumstances. This guarantee applies to all placements regardless of whether one or two recruiters were involved in the split. You are always protected.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Post your role on RecXchange.</p>
            <p className="text-gray-300 text-sm">One fee. One Account Manager. 15,000+ specialist recruiter networks working on your behalf. Pay only when your candidate accepts an offer.</p>
          </div>
        </div>
      </main>
    </>
  );
}
