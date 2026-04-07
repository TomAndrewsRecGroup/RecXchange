import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruiter Collaboration Platform | RecXchange",
  description: "RecXchange is the recruiter collaboration platform where 15,000+ specialists partner on placements, share candidates, and split fees with full protection.",
  keywords: [
    "recruiter collaboration platform",
    "recruiter collaboration",
    "recruitment collaboration tool",
    "recruiter partnership platform",
    "split fee platform",
    "recruiter network platform",
    "collaborative recruitment platform",
    "recruiter matching platform",
    "recruitment partner network",
    "recruiter split fee network"
  ],
  alternates: { canonical: "https://recxchange.io/recruiter-collaboration-platform" },
  openGraph: {
    title: "Recruiter Collaboration Platform | RecXchange",
    description: "15,000+ specialist recruiters collaborate on placements with automatic matching, contracts, and fee protection. Join RecXchange.",
    url: "https://recxchange.io/recruiter-collaboration-platform",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Recruiter Collaboration Platform, RecXchange" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruiter Collaboration Platform | RecXchange",
    description: "15,000+ specialist recruiters collaborate on placements with automatic matching, contracts, and fee protection.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function RecruiterCollaborationPlatformLayout({ children }: { children: React.ReactNode }) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/recruiter-collaboration-platform#webpage",
    "url": "https://recxchange.io/recruiter-collaboration-platform",
    "name": "Recruiter Collaboration Platform | RecXchange",
    "description": "RecXchange is the recruiter collaboration platform where 15,000+ specialists partner on placements, share candidates, and split fees with full contractual protection.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "dateModified": "2026-04-02",
    "breadcrumb": { "@id": "https://recxchange.io/recruiter-collaboration-platform#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/recruiter-collaboration-platform#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Recruiter Collaboration Platform", "item": "https://recxchange.io/recruiter-collaboration-platform" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is a recruiter collaboration platform?", "acceptedAnswer": { "@type": "Answer", "text": "A recruiter collaboration platform connects specialist recruiters so they can partner on placements. One recruiter brings a live role, the other brings a matching candidate. The platform handles matching, contracts, and fee protection so both parties can collaborate safely and earn together." } },
      { "@type": "Question", "name": "How is RecXchange different from LinkedIn or job boards?", "acceptedAnswer": { "@type": "Answer", "text": "LinkedIn and job boards connect employers with candidates. RecXchange connects recruiters with each other. It is a two-sided marketplace where recruiters post roles and candidates, get matched by AI, and split fees through legally binding agreements. No other platform provides this combination of matching, contracts, and deal protection." } },
      { "@type": "Question", "name": "How many recruiters use RecXchange?", "acceptedAnswer": { "@type": "Answer", "text": "Over 15,000 specialist recruiters across all sectors and regions use RecXchange to collaborate on placements. The platform has over $750,000 in live fees available at any time, with an average placement fee of $7,000 per recruiter." } }
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
