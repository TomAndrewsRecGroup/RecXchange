import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "How to Monetise Unused Candidates | RecXchange",
  description: "Turn dead leads into revenue. Learn how recruiters monetise unused candidates through split fee placements and earn from candidates sitting idle on their desk.",
  keywords: [
    "monetise unused candidates",
    "unused candidates revenue",
    "split fee placements",
    "dead leads recruitment",
    "recruiter collaboration",
    "candidate monetisation",
    "split fee recruitment UK",
    "turn candidates into revenue"
  ],
  alternates: { canonical: "https://recxchange.io/blog/how-to-monetise-unused-candidates" },
  openGraph: {
    title: "How to Monetise Unused Candidates",
    description: "Turn dead leads into revenue. Learn how recruiters monetise unused candidates through split fee placements.",
    url: "https://recxchange.io/blog/how-to-monetise-unused-candidates",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "How to Monetise Unused Candidates" }]
  },
  twitter: { card: "summary_large_image", title: "How to Monetise Unused Candidates", description: "Turn dead leads into revenue through split fee placements.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function HowToMonetiseUnusedCandidatesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/blog/how-to-monetise-unused-candidates#article",
    "url": "https://recxchange.io/blog/how-to-monetise-unused-candidates",
    "headline": "How to Monetise Unused Candidates",
    "description": "Turn dead leads into revenue. Learn how recruiters monetise unused candidates through split fee placements and earn from candidates sitting idle on their desk.",
    "author": { "@type": "Person", "name": "Tom Andrews", "jobTitle": "CEO and Co-Founder", "url": "https://recxchange.io", "worksFor": { "@type": "Organization", "name": "RecXchange" } },
    "publisher": { "@type": "Organization", "name": "RecXchange", "logo": { "@type": "ImageObject", "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png" } },
    "datePublished": "2026-04-02",
    "dateModified": "2026-04-02",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://recxchange.io/blog/how-to-monetise-unused-candidates" },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" },
        { "@type": "ListItem", "position": 3, "name": "How to Monetise Unused Candidates", "item": "https://recxchange.io/blog/how-to-monetise-unused-candidates" }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I monetise candidates I can't place?",
        "acceptedAnswer": { "@type": "Answer", "text": "You monetise unplaced candidates by sharing them through a split fee recruitment network like RecXchange. Another recruiter with a matching role places your candidate, and you split the placement fee. Typical splits range from 50/50 to 70/30 in favour of the candidate holder, meaning you earn thousands from a candidate who was otherwise generating zero revenue." }
      },
      {
        "@type": "Question",
        "name": "Is it safe to share candidates with other recruiters?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, when done through a structured platform with proper deal protection. On RecXchange, split fee agreements are auto-generated and timestamped before any candidate details are shared. Candidate data is only released after both parties agree to terms, and all activity is tracked. You remain the candidate's primary recruiter throughout the process." }
      },
      {
        "@type": "Question",
        "name": "How much can I earn from split fee placements?",
        "acceptedAnswer": { "@type": "Answer", "text": "The average split fee placement generates around $7,000 per recruiter on a standard 50/50 split. On a 70/30 arrangement where you hold the candidate, your share is higher. Since these are candidates you currently earn nothing from, even one or two split placements per quarter can add significant revenue to your billings." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Strategy</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">How to Monetise Unused Candidates</h1>
          <p className="text-gray-400 text-sm mb-10">Published: April 2026 &nbsp;&middot;&nbsp; 7 min read</p>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Every recruiter has them. Candidates sitting on your desk, fully screened, interview ready, genuinely good. But there is no matching role. Maybe the client hired internally. Maybe the brief went cold. Maybe you specialise in a sector where timing is everything, and the timing just was not there. Whatever the reason, those candidates are earning you nothing. And most recruiters leave it at that.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What does &quot;unused candidates&quot; actually mean?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            An unused candidate is anyone on your database who you have already sourced, screened, or spoken to, but who you cannot currently place. They might be second or third choice candidates from a recent shortlist. They might be strong professionals in a niche you cover who just do not have a live role to go at right now. They might be people who came to you speculatively and you had nothing suitable. The point is: you have done the hard work. You know they are good. But they are generating zero revenue because you do not have the right vacancy.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Why most recruiters leave money on the table</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The recruitment industry runs on a simple model: win the role, find the candidate, make the placement. When you have the candidate but not the role, the default behaviour is to do nothing. You might log them on your CRM and set a reminder to check back in three months. You might send them a speculative CV to a few clients and hope something sticks. But most of the time, nothing happens. The candidate moves on, takes another role, and you never bill from them.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            This is not laziness. It is a structural gap. Individual recruiters and small agencies simply do not have visibility of every live role in the market. You know your clients and your patch. But there are thousands of roles being worked right now, by other recruiters, that your candidate would be perfect for. You just cannot see them.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How split fee recruitment solves this</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Split fee recruitment is the mechanism that turns this dead inventory into revenue. Here is how it works: you share your candidate with another recruiter who has a live, matching role. They present your candidate to their client. If the candidate gets placed, you split the fee. You earn from a candidate you were otherwise earning nothing from. The other recruiter fills a role they were struggling to fill. The client gets a better candidate, faster.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            This is not a new concept, but historically it has been difficult to execute. Finding the right recruiter, negotiating terms, protecting the deal. Platforms like RecXchange remove these barriers by matching your candidates to live roles automatically, generating split agreements before any data is shared, and handling the commercial side so you can focus on what you do best.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Step by step: turning unused candidates into placements</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            The process is more straightforward than most recruiters expect:
          </p>
          <ul className="text-gray-300 mb-6 space-y-2 list-none">
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">→</span><span><strong className="text-white">Audit your database.</strong> Look at candidates you have spoken to in the last 6 months who you could not place. Focus on those who are still active and open to opportunities.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">→</span><span><strong className="text-white">Register them on a split fee platform.</strong> On RecXchange, you add candidate profiles (without sharing personal details) and the matching engine identifies relevant live roles from other recruiters.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">→</span><span><strong className="text-white">Review the matches.</strong> You see which roles your candidate could be suitable for. You decide whether to proceed. Nothing is shared without your approval.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">→</span><span><strong className="text-white">Agree terms and share.</strong> Once you accept a match, a split fee agreement is generated automatically. Only then are candidate details released to the role holder.</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">→</span><span><strong className="text-white">The placement happens.</strong> The role holder manages the client process. If your candidate is placed, you receive your share of the fee.</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">How much can you actually earn?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The numbers depend on the role, the fee percentage, and the split arrangement. But to give you a realistic picture: the average split fee placement generates around $7,000 per side on a 50/50 split. On a 70/30 arrangement where you hold the candidate, your share is higher. Even on a 50/50 basis, two split placements per quarter adds $56,000 to your annual billings. From candidates you were earning nothing from. That is not a rounding error. For independent recruiters and smaller agencies, it can be the difference between a flat year and a strong one.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What about candidate privacy?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            This is the concern that stops most recruiters from trying split placements, and it is a valid one. Your candidates trust you. They gave you their details in confidence. You do not want them being blasted across the market by someone you have never met.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The right platform handles this properly. On RecXchange, candidate details are not shared until a split agreement is in place. Before that point, the role holder sees only an anonymised profile: sector, level, location, key skills. No name, no CV, no contact information. You retain full control over your candidate throughout the process, and you can withdraw them at any point. Your relationship with the candidate stays exactly where it should: with you.
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
            <p className="text-cyan-400 font-bold mb-2">Stop leaving revenue on the table.</p>
            <p className="text-gray-300 text-sm">Join RecXchange and start earning from candidates you already have. Register as a recruiter to access live roles from global hiring managers, or post a role and tap into 15,000+ specialist recruiter networks.</p>
          </div>
        </div>
      </main>
    </>
  );
}
