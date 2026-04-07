import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Senior & Executive Search | No Retainer | RecXchange",
  description: "Senior and executive hiring without retainers. Specialist recruiters across C-Suite, VP, Director and Head-of roles. 12-20% fee, paid only on placement.",
  keywords: [
    "senior recruitment no retainer",
    "executive search platform",
    "VP director recruitment UK",
    "C-suite hiring without retainer",
    "senior hire recruitment marketplace",
    "executive search alternative",
    "leadership recruitment platform",
    "head of recruitment UK"
  ],
  alternates: { canonical: "https://recxchange.io/use-cases/senior-executive-search" },
  openGraph: {
    title: "Senior & Executive Search | No Retainer | RecXchange",
    description: "Executive recruiter networks. No retainer. No exclusivity. 12 to 20% success fee. Pay only when your senior hire accepts.",
    url: "https://recxchange.io/use-cases/senior-executive-search",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Senior Executive Search" }]
  },
  twitter: { card: "summary_large_image", title: "Senior & Executive Search | RecXchange", description: "Executive recruiter networks. No retainer. No exclusivity. Pay only when your senior hire accepts.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function SeniorExecutiveSearchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/use-cases/senior-executive-search#webpage",
    "url": "https://recxchange.io/use-cases/senior-executive-search",
    "name": "Senior & Executive Search | RecXchange",
    "description": "How RecXchange delivers senior and executive hiring outcomes without retainers or exclusivity.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://recxchange.io/use-cases" },
        { "@type": "ListItem", "position": 3, "name": "Senior & Executive Search", "item": "https://recxchange.io/use-cases/senior-executive-search" }
      ]
    },
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Use Case</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Senior &amp; Executive Search</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Senior and executive hires carry the highest stakes and the highest fees. Traditional retained search firms charge 30 to 35% with a significant upfront retainer, payable whether or not a placement is made. RecXchange gives you access to boutique executive and senior specialist recruiters across every function and sector, with a pure success fee model and no retainer required.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Senior Hiring Challenge</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Senior hires, VP, Director, Head-of, C-Suite, are almost universally passive candidates. They're not on job boards. They respond selectively to direct approaches from recruiters they trust. Finding the right recruiter with the right senior candidate relationship is the entire challenge of executive search. RecXchange's Xchange Engine solves this by matching your senior role to specialist executive recruiters whose placed history demonstrates exactly the seniority and sector depth you need.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Boutique Executive Recruiters at Scale</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The best executive search work is done by boutique firms and independent headhunters, specialists with 10 to 20 years in a single sector who have personal relationships with the senior talent that matters. RecXchange's 15,000+ recruiter network includes hundreds of these boutique specialists. Rather than choosing one retained search firm and hoping they have the right network, RecXchange activates multiple senior specialists simultaneously.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Senior Roles RecXchange Regularly Fills</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange has active specialist recruiters for: Chief Financial Officer, VP Engineering, Chief Technology Officer, Chief Operating Officer, General Counsel, HR Director, Chief People Officer, VP Sales, Managing Director, Chief Marketing Officer, Head of Data &amp; Analytics, and VP Product. Sector coverage spans Technology, Financial Services, Healthcare, Engineering, Professional Services, and Retail.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Discretion &amp; Confidentiality</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Senior searches often require discretion, a confidential replacement search, a strategic hire before a public announcement, or a board-level appointment that can't be widely advertised. RecXchange's platform allows hiring managers to post roles with controlled visibility, candidate data is governed by end-to-end encryption and GDPR-compliant processing, and all recruiter NDAs are auto-generated and binding before any role details are shared.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Your most important hire. Without the retainer.</p>
            <p className="text-gray-300 text-sm">Access boutique executive recruiters across every sector. No upfront cost. No exclusivity. 12 to 20% success fee payable only when your senior hire accepts an offer.</p>
          </div>
        </div>
      </main>
    </>
  );
}
