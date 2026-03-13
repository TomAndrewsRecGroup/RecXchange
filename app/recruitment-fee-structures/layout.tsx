import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruitment Fee Structures Explained | RecXchange Guide",
  description: "A complete guide to recruitment fee structures: contingency, retained, split fee, RPO, and RecX Direct. Understand what each model costs, who pays, and which is right for your hiring situation in 2026.",
  keywords: [
    "recruitment fee structures",
    "how are recruitment fees calculated",
    "contingency recruitment fee",
    "retained recruitment fee",
    "split fee recruitment",
    "recruitment agency fee percentage",
    "RPO pricing",
    "recruitment fee comparison",
    "how much do recruiters charge",
    "recruitment fee models UK"
  ],
  alternates: { canonical: "https://recxchange.io/recruitment-fee-structures" },
  openGraph: {
    title: "Recruitment Fee Structures Explained | RecXchange",
    description: "Contingency, retained, split fee, RPO — all recruitment fee models compared. What each costs, who pays, and when to use them.",
    url: "https://recxchange.io/recruitment-fee-structures",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Recruitment Fee Structures — RecXchange" }]
  },
  twitter: { card: "summary_large_image", title: "Recruitment Fee Structures Explained | RecXchange", description: "All recruitment fee models compared: contingency, retained, split fee, RPO.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the standard recruitment agency fee percentage?", "acceptedAnswer": { "@type": "Answer", "text": "Most contingency recruitment agencies charge between 15% and 25% of the candidate's first-year salary. Retained search firms often charge 30-33%. Split fee arrangements share the fee between two recruiters. RecX Direct on RecXchange gives the candidate-side recruiter 70% of the placement fee." } },
      { "@type": "Question", "name": "What is the difference between contingency and retained recruitment?", "acceptedAnswer": { "@type": "Answer", "text": "Contingency recruitment means you only pay the recruiter when a candidate is successfully placed. Retained recruitment means you pay an upfront fee (typically 1/3 of the total) to engage a recruiter exclusively. Retained is common for senior, executive, and highly specialist roles. Contingency is used for mid-level and volume hiring." } },
      { "@type": "Question", "name": "What is a split fee in recruitment?", "acceptedAnswer": { "@type": "Answer", "text": "A split fee is when two recruiters collaborate on a placement and divide the total placement fee between them. The standard model involves one recruiter who holds the role (role-side) and one who has the candidate (candidate-side). Common splits are 50/50, 60/40, and 70/30." } }
    ]
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Recruitment Fee Structures", "item": "https://recxchange.io/recruitment-fee-structures" }
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}
