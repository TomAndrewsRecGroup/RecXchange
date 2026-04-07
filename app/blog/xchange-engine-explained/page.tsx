import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Xchange Engine Explained | RecXchange",
  description: "How the Xchange Engine works: AI-powered role-to-recruiter matching, candidate pipeline analysis and real-time activation. Faster than any manual process.",
  keywords: [
    "Xchange Engine explained",
    "how RecXchange works",
    "RecXchange AI matching",
    "recruiter matching technology",
    "AI recruitment matching",
    "how RecXchange finds recruiters",
    "split fee matching technology",
    "RecXchange platform explained"
  ],
  alternates: { canonical: "https://recxchange.io/blog/xchange-engine-explained" },
  openGraph: {
    title: "The Xchange Engine Explained: How RecXchange Matches Roles to Recruiters",
    description: "How RecXchange's AI-powered Xchange Engine matches your role to the right specialist recruiter in real time.",
    url: "https://recxchange.io/blog/xchange-engine-explained",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Xchange Engine Explained" }]
  },
  twitter: { card: "summary_large_image", title: "The Xchange Engine Explained", description: "How RecXchange's AI matching engine connects roles to the right specialist recruiters in real time.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function XchangeEngineExplainedPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/blog/xchange-engine-explained#article",
    "url": "https://recxchange.io/blog/xchange-engine-explained",
    "headline": "The Xchange Engine Explained: How RecXchange Matches Roles to Recruiters",
    "description": "How RecXchange's Xchange Engine uses AI-powered matching to connect roles with the right specialist recruiters.",
    "author": { "@type": "Person", "name": "Tom Andrews", "jobTitle": "CEO and Co-Founder", "url": "https://recxchange.io", "worksFor": { "@type": "Organization", "name": "RecXchange" } },
    "publisher": { "@type": "Organization", "name": "RecXchange", "logo": { "@type": "ImageObject", "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png" } },
    "datePublished": "2025-07-01",
    "dateModified": "2026-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://recxchange.io/blog/xchange-engine-explained" },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" },
        { "@type": "ListItem", "position": 3, "name": "The Xchange Engine Explained", "item": "https://recxchange.io/blog/xchange-engine-explained" }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the RecXchange Xchange Engine work?",
        "acceptedAnswer": { "@type": "Answer", "text": "The Xchange Engine analyses each posted role across multiple dimensions (sector, sub-sector, seniority level, location, salary range, and technical requirements) and matches it against a continuously updated profile of every recruiter on the platform. Recruiters are matched based on their sector specialism, geographic focus, and historical placement track record. Matching happens in real time when a role is posted, with alerts sent to the highest-relevance recruiters immediately." }
      },
      {
        "@type": "Question",
        "name": "Does the Xchange Engine use AI?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Xchange Engine incorporates AI-powered analysis to classify roles, score recruiter relevance, and prioritise matching based on placement history data. The system learns from placement outcomes, improving match quality over time as more placements are made on the platform." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Technology</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">The Xchange Engine Explained</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2026 &nbsp;·&nbsp; 8 min read</p>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            The Xchange Engine is the AI-powered matching system at the core of RecXchange. When a hiring manager posts a role, the Xchange Engine doesn’t simply broadcast it to all 15,000+ recruiters on the platform. It analyses the role in detail and identifies the specific subset of recruiters whose sector specialism, geographic focus, and historical placement track record make them most likely to have the right candidate. Here’s exactly how it works.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Step 1: Role Classification</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            When a role is posted, the Xchange Engine analyses the brief across multiple dimensions: primary sector (e.g. Technology), sub-sector (e.g. Cybersecurity), seniority level (e.g. Head of), location and remote flexibility, salary range, technical requirements and qualifications, and any specific language or regulatory requirements. This classification creates a multi-dimensional role fingerprint that is matched against the recruiter database in real time.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Step 2: Recruiter Profile Matching</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Every recruiter on RecXchange has a continuously updated profile built from their stated specialism, active candidate submissions, placement history, and geographic activity. The Xchange Engine scores each recruiter’s relevance to the posted role across all classification dimensions, producing a ranked relevance score that determines which recruiters receive real-time alerts and in what priority order. Recruiters with a strong placement track record in the exact role specialism rank highest.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Step 3: Real-Time Activation</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The highest-relevance recruiters receive an immediate platform notification and email alert when a matching role is posted. The alert includes the role brief, salary range, location, and proposed split fee terms, everything a recruiter needs to assess whether they have a relevant candidate. Recruiters can express interest and begin the submission process within minutes of a role going live. This is why RecXchange clients typically receive first submissions within 48 to 72 hours.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Step 4: Candidate Submission and Screening</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            When a recruiter submits a candidate through the Xchange Engine, the submission triggers a deal protection timestamp, auto-generates the split fee agreement, and routes the candidate profile to the role’s dedicated Account Manager for quality screening. The Account Manager reviews every submission against the role brief before it reaches the hiring manager, filtering to the top 1% of submissions and ensuring that only genuinely qualified, pre-vetted candidates are presented.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Step 5: Continuous Learning</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The Xchange Engine improves with every placement. When a candidate is successfully placed, the system updates the placing recruiter’s profile with the placement outcome, reinforcing their relevance score for similar future roles. When submissions don’t convert to interviews, the system analyses the mismatch signals to refine future matching accuracy. Over time, the engine becomes progressively better at identifying which specific recruiters are most likely to have the right candidate for each role type.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Why This Beats Manual Recruiter Selection</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A hiring manager selecting agencies manually relies on reputation, existing relationships, and surface-level sector descriptions. The Xchange Engine uses actual placement data (who has placed similar candidates in similar roles at similar salary levels in the past) to identify the recruiters with the highest probability of having the right candidate. This data-driven approach consistently outperforms relationship-based agency selection, especially for specialist and hard-to-fill roles where the candidate pool is narrow.
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
            <p className="text-cyan-400 font-bold mb-2">Experience the Xchange Engine.</p>
            <p className="text-gray-300 text-sm">Post a role and see the Xchange Engine activate your specialist recruiter network in real time. First submissions typically within 48 to 72 hours. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
