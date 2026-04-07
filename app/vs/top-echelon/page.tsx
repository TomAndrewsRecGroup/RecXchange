import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs Top Echelon | RecXchange",
  description: "RecXchange vs Top Echelon: compare fees, network size, technology and global reach. See why 15,000+ recruiters choose RecXchange over legacy networks.",
  keywords: [
    "RecXchange vs Top Echelon",
    "Top Echelon alternative",
    "split fee network comparison",
    "Top Echelon brokerage fee",
    "recruiter network vs Top Echelon",
    "split fee recruitment platform",
    "Top Echelon review",
    "RecXchange split fees"
  ],
  alternates: { canonical: "https://recxchange.io/vs/top-echelon" },
  openGraph: {
    title: "RecXchange vs Top Echelon",
    description: "Top Echelon: 500 agencies, 6% brokerage fee. RecXchange: 15,000+ recruiters, no brokerage fee, AI matching, global reach.",
    url: "https://recxchange.io/vs/top-echelon",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs Top Echelon" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs Top Echelon", description: "Top Echelon charges 6% brokerage on every split. RecXchange: zero brokerage, 15,000+ recruiters, AI matching.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsTopEchelonPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/top-echelon#webpage",
    "url": "https://recxchange.io/vs/top-echelon",
    "name": "RecXchange vs Top Echelon",
    "description": "Detailed comparison of RecXchange and Top Echelon split fee recruitment networks.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs Top Echelon", "item": "https://recxchange.io/vs/top-echelon" }
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
        "name": "What is the difference between RecXchange and Top Echelon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top Echelon is a US-focused split fee network of roughly 500 agencies, founded in 1988, that charges a 6% brokerage fee on every placement. RecXchange is a global platform with 15,000+ recruiters, zero brokerage fees, AI-powered matching, and automated fee agreements."
        }
      },
      {
        "@type": "Question",
        "name": "Does Top Echelon charge a brokerage fee on split placements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Top Echelon charges a 6% brokerage fee on every completed split placement. Each recruiter receives 47% of the total fee. RecXchange charges no brokerage fee, so recruiters keep 100% of their agreed split."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use RecXchange outside the United States?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. RecXchange operates globally with recruiters across the UK, US, Europe, Middle East, Asia Pacific and beyond. Top Echelon is primarily focused on the US market."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs Top Echelon</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Top Echelon has been a fixture in split fee recruitment since 1988 and deserves credit for proving that recruiter collaboration works. But the recruitment landscape has changed dramatically since then. If you are comparing split fee networks, the differences in fees, technology, network size and geographic reach matter. Here is an honest breakdown.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How Top Echelon Works</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Top Echelon connects roughly 500 recruitment agencies across a traditional split fee network, primarily in the United States. Recruiters post jobs or candidates, browse listings from other members, and arrange splits manually through the platform. The standard arrangement is a 50/50 fee split between the job recruiter and the candidate recruiter. Top Echelon takes a 6% brokerage fee from the total placement fee, leaving each recruiter with 47% of the fee rather than the full 50%. The network operates on a membership model with additional costs for their ATS product, Big Biller.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Differs</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange is built for a different scale and a different era. The network includes over 15,000 recruiters globally, not limited to the US market. There is no brokerage fee on placements. When two recruiters agree a 50/50 split, each keeps their full 50%. Splits are also flexible, ranging from 50/50 to 70/30 depending on the value each party brings to the deal. The Xchange Engine uses AI to match jobs with the most relevant recruiters based on sector specialisation, placement history and candidate quality, rather than relying on manual browsing and keyword searches. Fee agreements are generated and signed digitally, with built-in deal protection that tracks candidate ownership from first introduction.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange also offers RecX Direct, which allows recruiters to take on roles at 70% of the fee by working them exclusively. This gives recruiters a route to higher earnings on roles they are confident they can fill without a split partner.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">Top Echelon</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Brokerage fee", "None, 0%", "6% per placement"],
                  ["Recruiter split", "50/50 to 70/30, keep 100%", "50/50, keep 47% each"],
                  ["Network size", "15,000+ recruiters", "~500 agencies"],
                  ["Geographic reach", "Global (UK, US, EU, APAC, MEA)", "Primarily US"],
                  ["Matching method", "AI-powered Xchange Engine", "Manual search and browse"],
                  ["Fee agreements", "Automated, digital signatures", "Manual arrangement"],
                  ["Deal protection", "Built-in candidate tracking", "Honour-based system"],
                  ["Getting started", "From $1/month, instant activation", "Membership application"],
                ].map(([factor, rx, te]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{te}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Which Should You Choose?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Top Echelon is a well-established network with a loyal membership base, and it works well for US-based recruiters who value long-term, relationship-driven partnerships within a smaller community. If you prefer a tight-knit group and are comfortable with the 6% brokerage fee, Top Echelon has a proven track record.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange is the stronger choice if you want global reach, zero brokerage fees, AI-driven matching and the flexibility to work splits from 50/50 to 70/30. The larger network means more potential partners, more roles, and more candidates to match against. For recruiters who want to keep every penny of their agreed split and access technology that automates the admin, RecXchange is the modern alternative.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Zero brokerage. 15,000+ recruiters. AI-powered matching.</p>
            <p className="text-gray-300 text-sm">Keep 100% of your split. Join RecXchange from $1/month and start collaborating with recruiters worldwide.</p>
          </div>
        </div>
      </main>
    </>
  );
}
