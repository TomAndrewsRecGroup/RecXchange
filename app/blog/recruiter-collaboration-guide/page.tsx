import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruiter Collaboration Guide | RecXchange",
  description: "How recruiters can double their billings through structured collaboration. Split fee networks, candidate sharing, deal protection and AI matching.",
  keywords: [
    "recruiter collaboration guide",
    "how to increase recruiter billings",
    "split fee recruiter guide",
    "recruiter collaboration network",
    "double recruiter billings",
    "split placement recruiter tips",
    "recruiter partnership guide",
    "how to do split fee recruitment"
  ],
  alternates: { canonical: "https://recxchange.io/blog/recruiter-collaboration-guide" },
  openGraph: {
    title: "The Recruiter's Guide to Collaboration: How to Double Your Billings",
    description: "How to use split fee collaboration to double your billings. Deal protection, candidate sharing, and the RecXchange network.",
    url: "https://recxchange.io/blog/recruiter-collaboration-guide",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Recruiter Collaboration Guide" }]
  },
  twitter: { card: "summary_large_image", title: "The Recruiter's Guide to Collaboration", description: "How to use split fee collaboration to double your billings. Deal protection, candidate sharing, RecXchange.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function RecruiterCollaborationGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/blog/recruiter-collaboration-guide#article",
    "url": "https://recxchange.io/blog/recruiter-collaboration-guide",
    "headline": "The Recruiter's Guide to Collaboration: How to Double Your Billings",
    "description": "A complete guide for specialist recruiters on using split fee collaboration to increase billings via RecXchange.",
    "author": { "@type": "Person", "name": "Tom Andrews", "jobTitle": "CEO and Co-Founder", "url": "https://recxchange.io", "worksFor": { "@type": "Organization", "name": "RecXchange" } },
    "publisher": { "@type": "Organization", "name": "RecXchange", "logo": { "@type": "ImageObject", "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png" } },
    "datePublished": "2025-05-01",
    "dateModified": "2026-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://recxchange.io/blog/recruiter-collaboration-guide" },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" },
        { "@type": "ListItem", "position": 3, "name": "Recruiter Collaboration Guide", "item": "https://recxchange.io/blog/recruiter-collaboration-guide" }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does recruiter collaboration increase billings?",
        "acceptedAnswer": { "@type": "Answer", "text": "Recruiter collaboration lets you monetise candidates who would otherwise earn nothing. If you hold a strong candidate but have no matching live role, a split fee arrangement on RecXchange connects that candidate to confirmed vacancies from other recruiters. A typical example: a 50/50 split on an 18% fee for a £95,000 role earns both recruiters £8,550 each, revenue the candidate-holder would never have seen working alone." }
      },
      {
        "@type": "Question",
        "name": "What is RecX Direct and how does it benefit candidate-holding recruiters?",
        "acceptedAnswer": { "@type": "Answer", "text": "RecX Direct is RecXchange's product where roles are posted directly by hiring managers rather than through intermediary recruiters. It offers candidate-holding recruiters a 70% share of the total placement fee, the highest split available on any recruitment collaboration platform. On a £95,000 role at 18%, the candidate-holder earns £11,970 at the 70% RecX Direct rate." }
      },
      {
        "@type": "Question",
        "name": "How does deal protection work on RecXchange?",
        "acceptedAnswer": { "@type": "Answer", "text": "Before any candidate data changes hands on RecXchange, a split fee agreement is auto-generated and accepted by both parties. Every submission is timestamped and recorded, establishing legally binding candidate ownership from the moment you submit. There is no scenario in which your placement can be taken without your agreed fee share being paid. This eliminates the trust barrier that has historically prevented recruiters from collaborating." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">For Recruiters</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">The Recruiter&apos;s Guide to Collaboration: How to Double Your Billings</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2026 &nbsp;·&nbsp; 11 min read</p>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            The best recruiters in the world don&apos;t work alone. They collaborate. They share candidates with trusted partners, take splits on roles outside their core patch, and build networks that multiply their earning potential without multiplying their workload. This guide explains how structured recruiter collaboration works, why it consistently outperforms solo recruitment, and how RecXchange makes it accessible to every specialist recruiter.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Case for Collaboration</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Consider the economics. A specialist recruiter has a candidate, a strong Principal Engineer who is passively open to the right opportunity. They spend weeks sending speculative emails and cold-calling hiring managers with no live role. That candidate earns nothing. Meanwhile, a recruiter on RecXchange has a confirmed role from a tech scale-up paying £95,000. The split fee is 18%, £17,100. At a 50/50 split, both recruiters earn £8,550. The candidate-holder earned £8,550 they would never have seen working alone. This is the basic commercial logic of split fee collaboration, replicated across thousands of placements every year on RecXchange.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How to Get Started with Split Fee on RecXchange</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Getting started on RecXchange takes minutes. Create your recruiter profile, specify your sector specialism and geographic focus, and the Xchange Engine begins matching you to live roles from hiring managers whose requirements align with your candidate pipeline. You can act as a role-holder (posting roles and receiving candidate submissions from other recruiters), a candidate-holder (submitting your candidates to live roles), or both simultaneously.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Acting as a Role-Holder</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            As a role-holder on RecXchange, you post roles from hiring managers in your network. The Xchange Engine matches your role to candidate-holding recruiters with relevant sector expertise. You receive pre-screened candidate submissions, manage the hiring manager relationship, and coordinate the placement process. When a placement is made, you earn your agreed share of the fee automatically, without having to source a single additional candidate yourself.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Acting as a Candidate-Holder</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            As a candidate-holder, you bring your best candidates to live roles that you wouldn&apos;t have access to through your own business development. The Xchange Engine surfaces roles from hiring managers globally that match your candidates&apos; profiles. You submit your candidate with one click, RecXchange auto-generates the split fee agreement, and your candidate&apos;s ownership is protected from the moment of submission. If they&apos;re placed, your fee share is paid automatically.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Deal Protection: Your Safety Net</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The historical barrier to recruiter collaboration has been trust, specifically, the fear of sharing a candidate without a binding agreement in place. RecXchange eliminates this risk entirely. Before any candidate data changes hands, a split fee agreement is auto-generated and accepted by both parties. The submission is timestamped and recorded. Your candidate ownership is legally protected from the moment you submit. There is no scenario in which your placement can be taken without your agreed fee share being paid.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">RecX Direct: The 70% Model</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange&apos;s RecX Direct product offers candidate-holding recruiters a 70% share of the total placement fee, the highest split available on any recruitment collaboration platform. RecX Direct roles are posted directly by hiring managers (rather than through intermediary recruiters), meaning the full hiring manager fee flows through the platform. A £95,000 role at 18% generates £17,100, of which the candidate-holder earns £11,970 at the 70% RecX Direct rate.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Building a Collaboration Strategy</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The most successful RecXchange recruiters treat collaboration as a strategic income stream, not an occasional windfall. They maintain an active candidate pipeline, submit to new roles promptly (the best candidates are placed quickly), build a reputation for quality submissions that makes role-holders prioritise their candidates, and use RecXchange&apos;s dashboard to track their active submissions, pending placements, and earnings in real time. Treating RecXchange as a structured business channel, not a passive one, is what separates high billers from average ones.
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
            <p className="text-cyan-400 font-bold mb-2">Ready to start collaborating?</p>
            <p className="text-gray-300 text-sm">Join RecXchange as a specialist recruiter. Access live roles from global hiring managers. Submit your candidates. Earn on every placement. Deal protection built in.</p>
          </div>
        </div>
      </main>
    </>
  );
}
