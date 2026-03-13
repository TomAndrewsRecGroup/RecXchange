import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs Traditional Recruitment Agency | Which Is Better?",
  description: "RecXchange vs traditional recruitment agencies: no retainers, no exclusivity, no inflated fees. Pay a single success fee only when a candidate is placed. 15,000+ specialist recruiters. Average 3x faster time-to-hire. See the full comparison.",
  keywords: [
    "RecXchange vs recruitment agency",
    "recruitment agency alternative",
    "split fee vs recruitment agency",
    "no retainer recruitment",
    "contingency recruitment alternative",
    "better than recruitment agency",
    "recruiter marketplace vs agency",
    "RecXchange comparison"
  ],
  alternates: { canonical: "https://recxchange.io/vs/recruitment-agency" },
  openGraph: {
    title: "RecXchange vs Traditional Recruitment Agency",
    description: "No retainers. No exclusivity. No inflated fees. Just one success fee when a candidate is placed. See how RecXchange compares.",
    url: "https://recxchange.io/vs/recruitment-agency",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs Recruitment Agency" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs Traditional Recruitment Agency", description: "No retainers. No exclusivity. One success fee on placement. How RecXchange beats the traditional agency model.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsRecruitmentAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/recruitment-agency#webpage",
    "url": "https://recxchange.io/vs/recruitment-agency",
    "name": "RecXchange vs Traditional Recruitment Agency",
    "description": "Detailed comparison of RecXchange versus traditional recruitment agencies for hiring managers and recruiters.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs Recruitment Agency", "item": "https://recxchange.io/vs/recruitment-agency" }
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
        "name": "Is RecXchange cheaper than a recruitment agency?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Traditional recruitment agencies typically charge 15–25% of first-year salary, often with retainer fees upfront. RecXchange charges a single success fee of 12–20% payable only when a candidate accepts an offer. There are no retainers, no exclusivity fees, and no upfront costs." }
      },
      {
        "@type": "Question",
        "name": "How is RecXchange different from a traditional recruiter?",
        "acceptedAnswer": { "@type": "Answer", "text": "Traditional recruiters work alone — one recruiter, one candidate pool. RecXchange is a marketplace of 15,000+ specialist recruiters whose combined candidate networks are matched to your role by the Xchange Engine. You get access to far more relevant candidates faster, with a dedicated Account Manager managing the process end-to-end." }
      },
      {
        "@type": "Question",
        "name": "Do I need to sign an exclusivity agreement with RecXchange?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. RecXchange operates on a non-exclusive basis. You can use RecXchange alongside your existing recruitment suppliers. There are no lock-in periods or exclusivity requirements." }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs Traditional Recruitment Agency</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Traditional recruitment agencies have dominated hiring for decades — but the model hasn’t changed. One recruiter, one database, one opinion on who’s a good fit. RecXchange replaces that with a live marketplace of 15,000+ specialist recruiters whose collective networks are matched to your role automatically.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cost: Retainers vs Success Fees</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional agencies charge 15–25% of first-year salary — often demanding a retainer of 30–50% upfront before any work begins. RecXchange charges a single success fee of 12–20%, payable only when a candidate accepts an offer. No retainers. No upfront costs. No payment until you hire.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Candidate Access: One Database vs 15,000+ Networks</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A single recruitment agency gives you access to one recruiter’s database — typically 5,000–20,000 candidates, built over years in a single specialism. RecXchange’s Xchange Engine simultaneously matches your role to thousands of specialist recruiters, each with their own deep candidate networks. The result: more relevant candidates, faster, from more diverse sourcing channels.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Speed: Traditional Process vs Xchange Engine</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional agencies average 4–6 weeks from brief to shortlist. RecXchange clients typically receive first candidate submissions within 48–72 hours of posting a role, as the Xchange Engine matches and alerts relevant recruiters in real time. A dedicated Account Manager manages all recruiter interactions so you receive only pre-vetted, top 1% quality candidates.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Transparency: Black Box vs Full Visibility</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional agencies rarely reveal which recruiters are working on your role, what sourcing methods they use, or how many candidates they’ve approached. RecXchange gives hiring managers full visibility: see which recruiters are matched to your role, track candidate submissions in real time, and communicate with your Account Manager through a single dashboard.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Exclusivity: Lock-In vs Flexibility</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Many traditional agencies insist on exclusivity — meaning you can’t use other suppliers while they work your role. RecXchange is entirely non-exclusive. Use it alongside your PSL, your internal team, or any other supplier. You pay only when RecXchange places a candidate.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">Traditional Agency</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Fee structure", "12–20% success only", "15–25% + retainer"],
                  ["Upfront cost", "None", "30–50% retainer common"],
                  ["Candidate reach", "15,000+ recruiter networks", "One recruiter's database"],
                  ["Time to first CV", "48–72 hours", "1–3 weeks"],
                  ["Exclusivity required", "No", "Often yes"],
                  ["Account Manager", "Dedicated, included", "Varies"],
                  ["Candidate quality filter", "Top 1% only", "Varies by recruiter"],
                  ["Contract auto-generation", "Yes", "No"],
                ].map(([factor, rx, agency]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Ready to replace your agency spend?</p>
            <p className="text-gray-300 text-sm">Post your first role on RecXchange. No retainer. No exclusivity. Pay only when you hire.</p>
          </div>
        </div>
      </main>
    </>
  );
}
