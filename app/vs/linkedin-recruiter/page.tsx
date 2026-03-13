import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs LinkedIn Recruiter | Which Is Better for Hiring?",
  description: "RecXchange vs LinkedIn Recruiter: LinkedIn costs £7,000+/year per seat and requires your team to do all the sourcing. RecXchange gives you 15,000+ specialist recruiters doing the sourcing for you. Pay only on placement. No annual subscription.",
  keywords: [
    "RecXchange vs LinkedIn Recruiter",
    "LinkedIn Recruiter alternative",
    "better than LinkedIn Recruiter",
    "LinkedIn Recruiter cost comparison",
    "recruiter marketplace vs LinkedIn",
    "no LinkedIn subscription recruitment",
    "LinkedIn Recruiter vs split fee",
    "RecXchange LinkedIn comparison"
  ],
  alternates: { canonical: "https://recxchange.io/vs/linkedin-recruiter" },
  openGraph: {
    title: "RecXchange vs LinkedIn Recruiter",
    description: "LinkedIn Recruiter costs £7,000+/year and you still do all the work. RecXchange: 15,000+ specialists do it for you. Pay on hire only.",
    url: "https://recxchange.io/vs/linkedin-recruiter",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs LinkedIn Recruiter" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs LinkedIn Recruiter", description: "LinkedIn Recruiter costs £7k+/year — and you still do all the work. RecXchange: 15,000+ specialists source for you. Pay on hire only.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsLinkedInRecruiterPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/linkedin-recruiter#webpage",
    "url": "https://recxchange.io/vs/linkedin-recruiter",
    "name": "RecXchange vs LinkedIn Recruiter",
    "description": "Comparison of RecXchange versus LinkedIn Recruiter for hiring managers and talent acquisition teams.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs LinkedIn Recruiter", "item": "https://recxchange.io/vs/linkedin-recruiter" }
      ]
    },
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs LinkedIn Recruiter</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            LinkedIn Recruiter is the world’s most widely used sourcing tool — but it’s a tool, not a service. You pay £7,000–10,000+ per year per seat, and then your team still has to do all the searching, outreach, screening and coordination. RecXchange puts 15,000+ specialist recruiters to work on your role — and you pay nothing until a candidate is placed.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cost: Annual Subscription vs Pay-on-Hire</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            LinkedIn Recruiter costs approximately £7,000–10,000 per year per seat in the UK, with LinkedIn Recruiter Corporate licences running significantly higher for larger teams. This cost is fixed — payable whether you hire anyone or not. RecXchange charges zero subscription fees. A single success fee of 12–20% is payable only when a candidate accepts an offer. If RecXchange doesn’t place someone, you pay nothing.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Effort: You Do the Work vs We Do the Work</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            LinkedIn Recruiter gives your team a search interface. You still have to write the search strings, filter 1,000+ profiles, send InMails (and hope they’re read), screen responses, manage conversations, and coordinate interviews. On RecXchange, specialist recruiters do all of this — they source, screen, and submit pre-qualified candidates to your Account Manager, who filters to top 1% quality before anything reaches you.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">InMail Response Rates vs Warm Candidate Pipelines</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            LinkedIn InMail average response rates are 10–25% for well-crafted messages — meaning 75–90% of outreach goes unanswered. RecXchange recruiters approach candidates through established relationships built over years of sector-specific work. A specialist recruiter’s direct call or message to a known candidate gets answered. These warm pipelines consistently outperform cold InMail campaigns for passive, senior, and specialist roles.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">When LinkedIn Recruiter Makes Sense</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            LinkedIn Recruiter makes sense for large in-house talent acquisition teams with dedicated resourcers who hire at high volume across many roles simultaneously. For specialist hiring — one or two critical roles at a time, where candidate quality and speed matter — RecXchange consistently delivers better outcomes at lower total cost, with less internal time investment.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">LinkedIn Recruiter</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Annual cost", "£0 subscription", "£7,000–10,000+/seat/year"],
                  ["Pay if no hire", "No", "Yes — always"],
                  ["Who does the work", "15,000+ specialist recruiters", "Your internal team"],
                  ["Candidate sourcing", "Warm relationship pipelines", "Cold InMail outreach"],
                  ["InMail/response rate", "N/A — warm approach", "10–25% cold response"],
                  ["Account Manager", "Dedicated, included", "None"],
                  ["Best for", "Specialist / senior hires", "High-volume sourcing teams"],
                  ["Setup time", "Hours", "Days (training + onboarding)"],
                ].map(([factor, rx, li]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{li}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Cancel the subscription. Keep the hires.</p>
            <p className="text-gray-300 text-sm">Let 15,000+ specialist recruiters source your next hire. Zero subscription. Zero InMail fatigue. Pay only when you hire.</p>
          </div>
        </div>
      </main>
    </>
  );
}
