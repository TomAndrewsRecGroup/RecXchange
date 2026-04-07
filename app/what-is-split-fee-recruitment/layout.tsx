import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "What Is Split Fee Recruitment? | RecXchange",
  description: "Split fee recruitment: two recruiters collaborate on a placement and share the fee. How it works, what splits look like, and why recruiters use RecXchange.",
  keywords: [
    "what is split fee recruitment",
    "split fee recruitment explained",
    "split fee placement",
    "recruiter fee sharing",
    "how does split fee recruitment work",
    "split fee agreement",
    "recruitment fee split 50 50",
    "collaborative recruitment",
    "split placement recruiter",
    "fee sharing between recruiters"
  ],
  alternates: { canonical: "https://recxchange.io/what-is-split-fee-recruitment" },
  openGraph: {
    title: "What Is Split Fee Recruitment? The Complete Guide | RecXchange",
    description: "Two recruiters. One placement. Shared fee. Learn exactly how split fee recruitment works, what splits are standard, and how to do it safely.",
    url: "https://recxchange.io/what-is-split-fee-recruitment",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "What Is Split Fee Recruitment, RecXchange" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Split Fee Recruitment? | RecXchange",
    description: "Two recruiters. One placement. Shared fee. The complete guide.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"]
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/what-is-split-fee-recruitment#article",
    "headline": "What Is Split Fee Recruitment? The Complete Guide",
    "description": "Split fee recruitment explained: how two recruiters collaborate on a placement, agree on a fee split (50/50, 60/40, or 70/30), and share the placement fee. Covers how it works, what contracts are needed, and how RecXchange automates the process.",
    "author": { "@type": "Organization", "name": "RecXchange", "url": "https://recxchange.io" },
    "publisher": { "@id": "https://recxchange.io/#organization" },
    "url": "https://recxchange.io/what-is-split-fee-recruitment",
    "datePublished": "2026-03-13",
    "dateModified": "2026-03-13",
    "mainEntityOfPage": "https://recxchange.io/what-is-split-fee-recruitment",
    "about": { "@type": "Thing", "name": "Split Fee Recruitment" },
    "inLanguage": "en-GB"
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "What Is Split Fee Recruitment?", "item": "https://recxchange.io/what-is-split-fee-recruitment" }
    ]
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is split fee recruitment?", "acceptedAnswer": { "@type": "Answer", "text": "Split fee recruitment is a model where two recruiters collaborate on a single placement and share the resulting fee. One recruiter typically holds the client relationship and the role (the role-side recruiter), while the other has a matching candidate (the candidate-side recruiter). Both agree on a split percentage, commonly 50/50, 60/40, or 70/30, before any candidate information is shared. When the candidate is placed, each recruiter invoices for their agreed share." } },
      { "@type": "Question", "name": "What is a typical split fee percentage in recruitment?", "acceptedAnswer": { "@type": "Answer", "text": "The most common split fee structures are 50/50 (equal partnership), 60/40 (where one recruiter has a stronger client relationship or harder-to-fill role), and 70/30 (common on RecX Direct roles where the candidate-side recruiter takes 70%). The agreed split is locked in a contract before any private details are shared." } },
      { "@type": "Question", "name": "Is split fee recruitment legal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Split fee recruitment is a legal and widely practised model used by thousands of independent recruiters globally. It requires a formal written agreement between the two recruiters detailing the candidate, role, client, agreed split percentage, and payment terms. RecXchange auto-generates this contract digitally so both parties are protected." } },
      { "@type": "Question", "name": "How do I find recruiters to split fees with?", "acceptedAnswer": { "@type": "Answer", "text": "The easiest way is to join RecXchange, a marketplace of 15,000+ specialist recruiters across all sectors and regions. You can post a role or a candidate, and the Xchange Engine will automatically match you with partner recruiters. Alternatively, recruiter networks, LinkedIn groups, and industry associations can facilitate introductions." } }
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      {children}
    </>
  );
}
