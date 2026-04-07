import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee Recruitment UK | RecXchange",
  description: "The UK's leading split fee recruitment marketplace. 15,000+ recruiters across Engineering, Healthcare, Tech, Finance and Sales. Avg £5,500 per placement.",
  keywords: [
    "split fee recruitment UK",
    "UK recruiter marketplace",
    "UK recruitment collaboration",
    "split placement UK",
    "UK recruiter network",
    "contingency recruitment UK",
    "find recruitment partner UK",
    "UK recruiter job board"
  ],
  alternates: { canonical: "https://recxchange.io/locations/united-kingdom" },
  openGraph: {
    title: "Split Fee Recruitment UK | RecXchange",
    description: "The UK's leading split fee recruitment marketplace. 15,000+ recruiters. Average £5,500 per placement.",
    url: "https://recxchange.io/locations/united-kingdom",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange UK" }]
  },
  twitter: { card: "summary_large_image", title: "Split Fee Recruitment UK | RecXchange", description: "UK's leading split fee recruiter marketplace. 15,000+ recruiters. Average £5,500 per split placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function UKLocationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/locations/united-kingdom#webpage",
    "url": "https://recxchange.io/locations/united-kingdom",
    "name": "Split Fee Recruitment UK | RecXchange",
    "description": "The UK's leading split fee recruitment marketplace connecting 15,000+ specialist recruiters.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "areaServed": { "@type": "Country", "name": "United Kingdom" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://recxchange.io/locations" },
        { "@type": "ListItem", "position": 3, "name": "United Kingdom", "item": "https://recxchange.io/locations/united-kingdom" }
      ]
    },
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">United Kingdom</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Split Fee Recruitment UK</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            RecXchange is the UK&apos;s leading split fee recruitment marketplace, a live platform where specialist recruiters partner on placements, share candidates, and split fees automatically. With 15,000+ registered recruiters spanning every major UK sector, it&apos;s the fastest way to fill a hard-to-place role or monetise a candidate you can&apos;t place alone.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How Split Fee Recruitment Works in the UK</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            UK split fee recruitment involves two recruiters collaborating on a single placement. The recruiter with the live role (the &ldquo;role-holder&rdquo;) partners with a recruiter who has a matching candidate (the &ldquo;candidate-holder&rdquo;). They agree a fee split, typically 50/50, 60/40 or 70/30, before any candidate data is shared. If the candidate is placed, the hiring company pays one fee which RecXchange splits automatically between both recruiters via its escrow and payout system.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">UK Sectors on RecXchange</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            RecXchange UK covers all major employment sectors including Engineering, Healthcare &amp; Life Sciences, Technology, Financial Services, Sales &amp; Commercial, Construction &amp; Infrastructure, Legal, HR &amp; People, and Supply Chain &amp; Logistics. New roles are posted daily across London, Manchester, Birmingham, Leeds, Edinburgh, Bristol, and beyond.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What UK Recruiters Earn on RecXchange</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            UK recruiters on RecXchange earn an average of £5,500 per split placement. On RecX Direct roles, the candidate-side recruiter takes 70% of the placement fee. With over £500,000 in live UK fees available across the platform at any time, RecXchange represents one of the most lucrative collaboration networks for UK-based recruiters.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">UK Compliance & Deal Protection</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            All UK placements on RecXchange are governed by auto-generated split fee agreements that comply with UK contract law. RecXchange&apos;s Deal Protection system monitors every active collaboration and flags any deviation from agreed terms, protecting both recruiters throughout the placement process. GDPR compliance is built into every candidate submission workflow.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">RecXchange vs UK Recruitment Agencies</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Unlike traditional UK recruitment agencies, RecXchange doesn&apos;t charge retainers, exclusivity fees, or upfront costs. Hiring managers pay a single success fee of 12 to 20% only when a candidate accepts an offer. Recruiters access a live marketplace of roles without cold outreach, the Xchange Engine matches them to relevant opportunities automatically.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Ready to get started in the UK?</p>
            <p className="text-gray-300 text-sm">Join 15,000+ UK recruiters already on RecXchange. Post a role, submit a candidate, or browse live split fee opportunities across every UK sector.</p>
          </div>
        </div>
      </main>
    </>
  );
}
