import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs RecruitAlliance | RecXchange",
  description: "RecXchange vs RecruitAlliance: compare pricing, network size, matching technology and candidate access. 15,000+ recruiters, AI matching, from $1/month.",
  keywords: [
    "RecXchange vs RecruitAlliance",
    "RecruitAlliance alternative",
    "SplitAlliance comparison",
    "split fee platform comparison",
    "RecruitAlliance review",
    "recruiter collaboration platform",
    "split fee recruitment network",
    "RecXchange vs SplitAlliance"
  ],
  alternates: { canonical: "https://recxchange.io/vs/recruit-alliance" },
  openGraph: {
    title: "RecXchange vs RecruitAlliance",
    description: "RecruitAlliance: $75/month, smaller network, manual matching. RecXchange: from $1/month, 15,000+ recruiters, AI matching, 270M candidate database.",
    url: "https://recxchange.io/vs/recruit-alliance",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs RecruitAlliance" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs RecruitAlliance", description: "RecruitAlliance: $75/month, manual matching. RecXchange: from $1/month, 15,000+ recruiters, AI-powered, 270M candidates.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsRecruitAlliancePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/recruit-alliance#webpage",
    "url": "https://recxchange.io/vs/recruit-alliance",
    "name": "RecXchange vs RecruitAlliance",
    "description": "Detailed comparison of RecXchange and RecruitAlliance split fee recruitment platforms.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs RecruitAlliance", "item": "https://recxchange.io/vs/recruit-alliance" }
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
        "name": "How does RecXchange compare to RecruitAlliance for split fee recruitment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecruitAlliance charges $75/month and offers a smaller network with manual matching through their SplitAlliance product. RecXchange starts from $1/month, has 15,000+ recruiters, uses AI-powered matching via the Xchange Engine, and provides access to a 270M candidate database."
        }
      },
      {
        "@type": "Question",
        "name": "Does RecruitAlliance charge commission on placements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, RecruitAlliance does not charge commission on completed placements, which is a fair approach. RecXchange also charges no brokerage fee on split placements. The key differences are network size, matching technology and the additional tools RecXchange provides."
        }
      },
      {
        "@type": "Question",
        "name": "Is RecXchange cheaper than RecruitAlliance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. RecXchange starts from $1/month compared to RecruitAlliance at $75/month. RecXchange also offers a larger network of 15,000+ recruiters, AI-powered matching, automated fee agreements and access to a 270M candidate database."
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs RecruitAlliance</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            RecruitAlliance is one of the platforms recruiters encounter when searching for split fee partners. It offers a straightforward proposition: pay a monthly fee, access their network, and collaborate on placements without paying commission on completions. That no-commission model is appealing on the surface, but the full picture involves network size, matching quality and the tools available to actually get deals done. Here is how the two platforms compare.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecruitAlliance Works</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecruitAlliance charges $75 per month and offers a 60-day free trial for new members. Their primary product for split fee recruitment is SplitAlliance, which allows recruiters to post roles and candidates, then browse listings from other members to find potential matches. The platform does not charge commission on completed placements, meaning the monthly subscription is the only cost. Matching is manual: recruiters search through available listings and reach out to potential partners directly.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Differs</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange starts from $1/month, making it more accessible from day one. But the real differences go beyond pricing. The network is substantially larger at over 15,000 recruiters compared to RecruitAlliance's smaller community. The Xchange Engine uses AI to automatically match roles with the most relevant recruiters based on their sector specialisation, placement track record and candidate quality. This removes the need to manually browse listings and hope the right partner sees your role.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange also provides access to a database of over 270 million candidate profiles, giving recruiters a research and sourcing layer that goes well beyond what a basic split fee directory offers. Fee agreements are automated with digital signatures, and deal protection is built into the platform to track candidate ownership from the moment of introduction. For recruiters who want higher splits on exclusive roles, RecX Direct offers up to 70% of the fee.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">RecruitAlliance</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Monthly price", "From $1/month", "$75/month"],
                  ["Free trial", "Low-cost entry, instant access", "60-day free trial"],
                  ["Network size", "15,000+ recruiters", "Smaller network"],
                  ["Matching method", "AI-powered Xchange Engine", "Manual search and browse"],
                  ["Candidate database", "270M+ profiles", "Not included"],
                  ["Fee agreements", "Automated, digital signatures", "Manual arrangement"],
                  ["Deal protection", "Built-in candidate tracking", "Standard terms"],
                  ["Commission on placement", "None", "None"],
                ].map(([factor, rx, ra]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{ra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Which Should You Choose?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecruitAlliance deserves credit for its transparent, no-commission pricing model. If you are a recruiter who prefers a simple directory-style platform and are happy to do the legwork of finding partners manually, the 60-day free trial makes it low-risk to try. It is a functional tool for recruiters who already know what they are looking for.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange is the stronger choice if you want a larger network, smarter matching, and more tools to support the entire split fee process. The AI matching alone saves significant time compared to manual browsing, and the 270M candidate database adds a sourcing dimension that RecruitAlliance does not offer. At a lower monthly price with automated agreements and built-in deal protection, RecXchange provides more value for recruiters who want to make split placements consistently rather than occasionally.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">More recruiters. Smarter matching. Lower price.</p>
            <p className="text-gray-300 text-sm">Join 15,000+ recruiters on RecXchange from $1/month. AI-powered matching, 270M candidate database, automated agreements and built-in deal protection.</p>
          </div>
        </div>
      </main>
    </>
  );
}
