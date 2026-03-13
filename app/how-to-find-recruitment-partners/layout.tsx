import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "How to Find Recruitment Partners | Recruiter Collaboration Guide | RecXchange",
  description: "Looking for recruiter collaboration partners? Learn the 6 best ways to find recruitment partners in 2026 — including recruiter marketplaces, LinkedIn networks, sector groups, and the RecXchange Xchange Engine that matches you automatically.",
  keywords: [
    "how to find recruitment partners",
    "recruiter collaboration partners",
    "find recruiters to collaborate with",
    "recruiter partner network",
    "split fee recruitment partners",
    "recruitment partnership",
    "recruiter marketplace",
    "find a recruitment partner UK"
  ],
  alternates: { canonical: "https://recxchange.io/how-to-find-recruitment-partners" },
  openGraph: {
    title: "How to Find Recruitment Partners | RecXchange",
    description: "6 proven ways to find recruitment partners for split fee placements in 2026. From LinkedIn to automated AI matching.",
    url: "https://recxchange.io/how-to-find-recruitment-partners",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "How to Find Recruitment Partners — RecXchange" }]
  },
  twitter: { card: "summary_large_image", title: "How to Find Recruitment Partners | RecXchange", description: "6 proven ways to find recruitment collaboration partners in 2026.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "How to Find Recruitment Partners", "item": "https://recxchange.io/how-to-find-recruitment-partners" }
    ]
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How do I find a recruiter to split fees with?", "acceptedAnswer": { "@type": "Answer", "text": "The fastest way is to join RecXchange, where the Xchange Engine automatically matches you with partner recruiters based on your live roles and candidate profiles. You can also use LinkedIn recruiter groups, sector-specific associations, or local recruiter networks." } },
      { "@type": "Question", "name": "What makes a good recruitment partner?", "acceptedAnswer": { "@type": "Answer", "text": "A good recruitment partner should be a specialist in their sector or geography, have a track record of placements, communicate quickly, and be willing to sign a formal split fee agreement before sharing any candidate or client data. RecXchange profiles include ratings, placement history, and sector specialisms." } }
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      {children}
    </>
  );
}
