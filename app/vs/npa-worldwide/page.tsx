import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs NPA Worldwide | RecXchange",
  description: "RecXchange vs NPA Worldwide: compare membership costs, network size, matching technology and speed. 15,000+ recruiters, AI matching, from $1/month.",
  keywords: [
    "RecXchange vs NPA Worldwide",
    "NPA Worldwide alternative",
    "NPA recruitment network comparison",
    "split fee network vs NPA",
    "NPA membership cost",
    "recruiter network comparison",
    "NPA Worldwide review",
    "RecXchange recruiter network"
  ],
  alternates: { canonical: "https://recxchange.io/vs/npa-worldwide" },
  openGraph: {
    title: "RecXchange vs NPA Worldwide",
    description: "NPA Worldwide: 500+ firms, annual membership, manual introductions. RecXchange: 15,000+ recruiters, AI matching, from $1/month.",
    url: "https://recxchange.io/vs/npa-worldwide",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs NPA Worldwide" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs NPA Worldwide", description: "NPA: annual membership, 1,300 recruiters, manual introductions. RecXchange: 15,000+, AI matching, from $1/month.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsNpaWorldwidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/npa-worldwide#webpage",
    "url": "https://recxchange.io/vs/npa-worldwide",
    "name": "RecXchange vs NPA Worldwide",
    "description": "Detailed comparison of RecXchange and NPA Worldwide recruitment networks.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs NPA Worldwide", "item": "https://recxchange.io/vs/npa-worldwide" }
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
        "name": "How does RecXchange compare to NPA Worldwide for split fee recruitment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NPA Worldwide is a member-owned network of 500+ firms with around 1,300 recruiters, operating since 1956. It uses relationship-driven introductions and charges an annual membership fee. RecXchange has 15,000+ recruiters, uses AI-powered matching, automates fee agreements, and starts from $1/month with instant activation."
        }
      },
      {
        "@type": "Question",
        "name": "Is NPA Worldwide more expensive than RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NPA Worldwide charges an annual membership fee that varies by region and firm size. RecXchange starts from $1/month with no long-term commitment, making it significantly more accessible for independent recruiters and smaller agencies."
        }
      },
      {
        "@type": "Question",
        "name": "Does RecXchange use AI matching like NPA Worldwide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NPA Worldwide relies on relationship-driven introductions and manual networking between members. RecXchange uses the Xchange Engine, an AI-powered matching system that automatically connects jobs with the most relevant recruiters based on sector expertise, placement history and candidate quality."
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs NPA Worldwide</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            NPA Worldwide is one of the most established names in recruitment networking. Founded in 1956, it has built a strong reputation for connecting independent recruiters across borders. But the way recruiters find partners and collaborate on placements has evolved considerably since then. If you are weighing up NPA against RecXchange, here is what you need to know.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How NPA Worldwide Works</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            NPA Worldwide is a member-owned cooperative of over 500 recruitment firms, representing roughly 1,300 recruiters across more than 40 countries. Members pay an annual fee to join and gain access to the network, where they can post roles and candidates, attend conferences, and build relationships with other members. The matching process is largely relationship-driven: recruiters get to know each other through events, calls and regional meetings, then collaborate on splits as trust develops. NPA claims a 750% return on investment for its members, based on the value of placements made through the network relative to the membership cost.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Differs</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange takes a technology-first approach to the same fundamental problem. Rather than relying on conferences and personal introductions to find the right split partner, the Xchange Engine analyses every role and every recruiter's track record to surface the best matches automatically. This means a recruiter posting a role on Monday morning can be matched with a relevant specialist by Monday afternoon, without waiting for the next networking event or hoping the right person sees their listing.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The network is substantially larger at over 15,000 recruiters, which means more potential partners for every role. Fee agreements are generated and signed digitally with standardised terms, removing the back-and-forth negotiation that can slow down manual networks. Deal protection is built into the platform, tracking candidate introductions from the moment they are shared. And the barrier to entry is low: RecXchange starts from $1/month with no annual commitment, compared to NPA's annual membership fee.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">NPA Worldwide</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Membership cost", "From $1/month", "Annual fee (varies by region)"],
                  ["Network size", "15,000+ recruiters", "500+ firms, ~1,300 recruiters"],
                  ["Matching method", "AI-powered Xchange Engine", "Relationship-driven, manual"],
                  ["Fee agreements", "Automated, digital signatures", "Negotiated individually"],
                  ["Speed to first split", "Days (instant activation)", "Weeks to months (build relationships)"],
                  ["Technology platform", "Full dashboard, AI matching, analytics", "Member directory and job board"],
                  ["Deal protection", "Built-in candidate tracking", "Member code of ethics"],
                  ["Commitment", "Monthly, cancel anytime", "Annual membership"],
                ].map(([factor, rx, npa]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{npa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Which Should You Choose?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            NPA Worldwide is a respected organisation with nearly seven decades of history. Its strength lies in the quality of relationships between long-standing members and the trust that develops through face-to-face events and regional groups. If you value a close-knit community, enjoy attending conferences, and prefer building partnerships over time, NPA offers a well-structured environment for that approach.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange is the better fit if you want to start collaborating immediately, prefer technology-driven matching over manual networking, and want access to a much larger pool of potential partners without an annual commitment. The AI matching, automated agreements and built-in deal protection remove friction from the split fee process. For recruiters who want speed, scale and flexibility, RecXchange is the modern alternative to traditional recruitment networks.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">15,000+ recruiters. AI matching. No annual commitment.</p>
            <p className="text-gray-300 text-sm">Start finding split fee partners in days, not months. Join RecXchange from $1/month and let the Xchange Engine do the networking for you.</p>
          </div>
        </div>
      </main>
    </>
  );
}
