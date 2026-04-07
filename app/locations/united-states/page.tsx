import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee Recruitment USA | RecXchange",
  description: "USA split fee recruitment marketplace. 15,000+ specialists across Technology, Healthcare, Finance, Engineering and Sales. Avg $7,000 per placement.",
  keywords: [
    "split fee recruitment USA",
    "US recruiter marketplace",
    "split placement United States",
    "US recruitment collaboration",
    "find recruitment partner USA",
    "contingency recruitment US",
    "recruiter network USA",
    "RecX Direct USA"
  ],
  alternates: { canonical: "https://recxchange.io/locations/united-states" },
  openGraph: {
    title: "Split Fee Recruitment USA | RecXchange",
    description: "USA's fastest-growing split fee recruitment marketplace. 15,000+ recruiters. Average $7,000 per split placement.",
    url: "https://recxchange.io/locations/united-states",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange USA" }]
  },
  twitter: { card: "summary_large_image", title: "Split Fee Recruitment USA | RecXchange", description: "USA's fastest-growing split fee recruiter marketplace. 15,000+ recruiters. Average $7k per placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function USALocationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/locations/united-states#webpage",
    "url": "https://recxchange.io/locations/united-states",
    "name": "Split Fee Recruitment USA | RecXchange",
    "description": "The USA's fastest-growing split fee recruitment marketplace connecting 15,000+ specialist recruiters.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "areaServed": { "@type": "Country", "name": "United States" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://recxchange.io/locations" },
        { "@type": "ListItem", "position": 3, "name": "United States", "item": "https://recxchange.io/locations/united-states" }
      ]
    },
    "inLanguage": "en-US"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">United States</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Split Fee Recruitment USA</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            RecXchange is the fastest-growing split fee recruitment marketplace in the USA, connecting specialist recruiters who want to collaborate on placements, share candidates, and earn more together. With 15,000+ registered recruiters and live roles across every major US market, RecXchange is where American recruiters come to scale their billings without scaling their headcount.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Split Fee Recruitment in the US Market</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Split fee placements have long been common in the US staffing industry, but the process has historically relied on informal relationships and handshake deals. RecXchange formalises this through its Xchange Engine: an AI-powered matching system that connects role-holders and candidate-holders automatically, generates binding split fee agreements instantly, and processes payouts via escrow. No disputes. No chasing. Just placements.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">US Sectors &amp; Markets</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange US covers Technology (SaaS, fintech, cybersecurity), Healthcare (nurses, allied health, physicians), Financial Services, Engineering (mechanical, electrical, civil), Sales &amp; Revenue, Legal, and Executive Search. Active roles span New York, San Francisco, Chicago, Austin, Boston, Los Angeles, Seattle, and remote-first positions nationwide.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What US Recruiters Earn</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            US recruiters on RecXchange earn an average of $7,000 per split placement. On RecX Direct roles, where hiring managers post directly and bypass the traditional agency model, the candidate-side recruiter takes 70% of a 12 to 20% success fee. With $750,000+ in live US fees available at any time, the earnings opportunity on RecXchange is substantial for active recruiters.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Differs From US Staffing Networks</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional US split fee networks like Top Echelon or NPAworldwide require membership fees, manual job posting, and rely on email-based matching. RecXchange is fully automated: the Xchange Engine matches roles to recruiters in real time, split terms are set before any data is shared, and all agreements and payments are handled in-platform. No membership fees. No cold outreach. No paper contracts.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Join the US RecXchange network</p>
            <p className="text-gray-300 text-sm">Thousands of US recruiters are already collaborating, placing, and earning on RecXchange. Browse live US roles, submit candidates, or post your open positions today.</p>
          </div>
        </div>
      </main>
    </>
  );
}
