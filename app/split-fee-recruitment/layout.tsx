import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee Recruitment | RecXchange",
  description: "Split fee recruitment lets two recruiters collaborate on one placement and share the fee. Learn how it works and start earning on RecXchange.",
  keywords: [
    "split fee recruitment",
    "split fee recruiting",
    "split placement",
    "recruiter fee sharing",
    "split fee network",
    "collaborative recruitment",
    "recruiter split fees",
    "split fee platform",
    "split placement network",
    "recruitment fee split"
  ],
  alternates: { canonical: "https://recxchange.io/split-fee-recruitment" },
  openGraph: {
    title: "Split Fee Recruitment | Collaborate & Earn | RecXchange",
    description: "Two recruiters. One placement. Shared fee. Join 15,000+ recruiters splitting fees safely on RecXchange.",
    url: "https://recxchange.io/split-fee-recruitment",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Split Fee Recruitment, RecXchange" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Split Fee Recruitment | RecXchange",
    description: "Two recruiters. One placement. Shared fee. Join 15,000+ recruiters splitting fees safely.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function SplitFeeRecruitmentLayout({ children }: { children: React.ReactNode }) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/split-fee-recruitment#webpage",
    "url": "https://recxchange.io/split-fee-recruitment",
    "name": "Split Fee Recruitment | RecXchange",
    "description": "Split fee recruitment lets two specialist recruiters collaborate on one placement and share the resulting fee. RecXchange makes it simple, safe, and scalable.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "dateModified": "2026-04-02",
    "breadcrumb": { "@id": "https://recxchange.io/split-fee-recruitment#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/split-fee-recruitment#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Split Fee Recruitment", "item": "https://recxchange.io/split-fee-recruitment" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is split fee recruitment?", "acceptedAnswer": { "@type": "Answer", "text": "Split fee recruitment is a model where two specialist recruiters collaborate on a single placement. One recruiter has the client and the role, the other has the candidate. They agree a fee split before sharing any details, and both earn when the candidate is placed." } },
      { "@type": "Question", "name": "How much do recruiters earn from split fees?", "acceptedAnswer": { "@type": "Answer", "text": "On RecXchange, the average split fee placement is worth $7,000 per recruiter. Splits are typically 50/50, 60/40, or 70/30 depending on the contribution. RecXchange takes zero platform cut, so recruiters keep 100% of their agreed share." } },
      { "@type": "Question", "name": "Is split fee recruitment safe?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, when done through a proper platform. RecXchange auto-generates a legally binding split fee agreement before any candidate or client data is shared. Every agreement is timestamped and stored permanently, so both recruiters are fully protected." } }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
