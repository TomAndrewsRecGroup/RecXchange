import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Scale-Up Hiring | No Retainer | RecXchange",
  description: "Scale-up hiring without retainers or agency lock-in. 15,000+ specialist recruiters. Top 1% candidates within 48 hours. Pay only on placement.",
  keywords: [
    "scale-up recruitment",
    "hiring for scale-ups",
    "fast recruitment for startups",
    "scale-up hiring solution",
    "no retainer scale-up recruiter",
    "startup recruitment platform",
    "grow team fast recruitment",
    "scale-up talent acquisition"
  ],
  alternates: { canonical: "https://recxchange.io/use-cases/scale-up-hiring" },
  openGraph: {
    title: "Scale-Up Hiring | RecXchange",
    description: "Hire fast without retainers. 15,000+ specialist recruiters. Top 1% candidates in 48 hours. Pay only on placement.",
    url: "https://recxchange.io/use-cases/scale-up-hiring",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Scale-Up Hiring" }]
  },
  twitter: { card: "summary_large_image", title: "Scale-Up Hiring | RecXchange", description: "Hire fast. No retainers. 15,000+ specialists. Top 1% in 48 hours. Pay only on placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function ScaleUpHiringPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/use-cases/scale-up-hiring#webpage",
    "url": "https://recxchange.io/use-cases/scale-up-hiring",
    "name": "Scale-Up Hiring | RecXchange",
    "description": "How RecXchange helps scale-ups hire specialist talent fast without retainers or agency lock-in.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://recxchange.io/use-cases" },
        { "@type": "ListItem", "position": 3, "name": "Scale-Up Hiring", "item": "https://recxchange.io/use-cases/scale-up-hiring" }
      ]
    },
    "inLanguage": "en-GB"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does RecXchange help scale-ups hire quickly?",
        "acceptedAnswer": { "@type": "Answer", "text": "RecXchange's Xchange Engine matches your role to specialist recruiters with directly relevant candidate pipelines in real time. Most scale-up clients receive their first qualified candidate submissions within 48 to 72 hours of posting a role, compared to 2 to 4 weeks with a traditional agency. A dedicated Account Manager manages all recruiter communications so your founders or HR team stay focused on the business." }
      },
      {
        "@type": "Question",
        "name": "Is RecXchange suitable for Series A and Series B companies?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. RecXchange is particularly well-suited to Series A and Series B companies that are growing fast across multiple functions simultaneously. The platform scales instantly, post one critical engineering role or ten commercial roles at once. There are no volume minimums, no contract commitments, and no fixed monthly costs. You pay only for successful placements." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Use Case</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Scale-Up Hiring</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Scale-ups face a unique hiring challenge: the need to hire fast, across multiple functions, without the budget for a full in-house talent team or the appetite for retainer-heavy agency commitments. RecXchange is purpose-built for this. Post a role, activate 15,000+ specialist recruiter networks instantly, and receive top 1% pre-screened candidates within 48 hours, paying only when you hire.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Scale-Up Recruitment Problem</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            At Series A and beyond, hiring velocity becomes a competitive advantage. The companies that build their engineering, commercial, and leadership teams fastest win market share. But traditional recruitment options weren't built for scale-up speed: retainer-based agencies require weeks of briefing and onboarding, job boards generate hundreds of unqualified applications, and building an internal talent team takes months and adds significant fixed cost.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Works for Scale-Ups</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Post your role on RecXchange with a brief, salary range, and location. The Xchange Engine immediately matches it to specialist recruiters across the relevant sector and geography. Within 48 to 72 hours, pre-screened candidate submissions begin arriving, each reviewed by your dedicated Account Manager who filters to top 1% quality before anything reaches your inbox. No CV sifting. No agency management. Just hires.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Hiring Across Multiple Functions Simultaneously</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Most scale-ups are hiring across Engineering, Product, Sales, Marketing, Finance, and Operations at the same time. Traditional agencies are sector-specific, you need a different agency for each function, each with their own Terms of Business, relationship management, and fee negotiations. RecXchange's single platform covers all sectors simultaneously, with specialist recruiters matched to each role by the Xchange Engine.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cost Control: Pay Only When You Hire</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Scale-up cash management is critical. RecXchange charges nothing until a candidate accepts an offer, a 12 to 20% success fee on the agreed salary. No retainers eating into runway. No monthly platform fees. No wasted spend on searches that don't convert. For funded scale-ups managing burn rate, the pure success-fee model is a material commercial advantage over every retainer or subscription-based alternative.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Employer Brand at Scale</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Scale-ups are building their employer brand in real time. Every candidate interaction matters. RecXchange's managed process means candidates receive a consistent, professional experience, screened by specialist recruiters, managed by your Account Manager, with clear communication throughout. No cold InMails from five different agencies. No duplicate approaches. One clean process that reflects well on your brand.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Built for scale-up speed.</p>
            <p className="text-gray-300 text-sm">Post your first role in minutes. First candidate submissions within 48 hours. Pay only when you hire. No retainers, no lock-in, no fixed cost.</p>
          </div>
        </div>
      </main>
    </>
  );
}
