import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruitment Marketplace | RecXchange",
  description: "RecXchange is the recruitment marketplace where recruiters post roles and candidates, get matched by AI, and split fees with full contractual protection.",
  keywords: [
    "recruitment marketplace",
    "recruiter marketplace",
    "recruitment platform",
    "split fee marketplace",
    "recruitment exchange",
    "recruiter matching marketplace",
    "online recruitment marketplace",
    "recruitment talent marketplace",
    "recruitment network marketplace",
    "recruiter job marketplace"
  ],
  alternates: { canonical: "https://recxchange.io/recruitment-marketplace" },
  openGraph: {
    title: "Recruitment Marketplace | RecXchange",
    description: "The two-sided recruitment marketplace. Recruiters post roles and candidates, AI matches them, and fees are split with full protection.",
    url: "https://recxchange.io/recruitment-marketplace",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Recruitment Marketplace, RecXchange" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment Marketplace | RecXchange",
    description: "The two-sided recruitment marketplace. AI matching, automatic contracts, zero platform fee.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function RecruitmentMarketplaceLayout({ children }: { children: React.ReactNode }) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/recruitment-marketplace#webpage",
    "url": "https://recxchange.io/recruitment-marketplace",
    "name": "Recruitment Marketplace | RecXchange",
    "description": "RecXchange is the two-sided recruitment marketplace where recruiters post roles and candidates, get matched by AI, and split fees with full contractual protection.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "dateModified": "2026-04-02",
    "breadcrumb": { "@id": "https://recxchange.io/recruitment-marketplace#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/recruitment-marketplace#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Recruitment Marketplace", "item": "https://recxchange.io/recruitment-marketplace" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is a recruitment marketplace?", "acceptedAnswer": { "@type": "Answer", "text": "A recruitment marketplace is a platform where recruiters, employers, and candidates interact in a structured environment. Unlike job boards that simply list vacancies, a recruitment marketplace connects the parties who can fill those vacancies. RecXchange is a two-sided marketplace where recruiters post both roles and candidates, and the platform matches them automatically using AI." } },
      { "@type": "Question", "name": "How does RecXchange's marketplace differ from job boards?", "acceptedAnswer": { "@type": "Answer", "text": "Job boards are one-sided: employers post roles and hope candidates apply. RecXchange is two-sided: recruiters post roles and candidates. The Xchange Engine uses AI to match them, and legally binding split fee agreements are generated automatically. This means roles get filled faster, with better candidates, and both recruiters earn." } },
      { "@type": "Question", "name": "Does RecXchange take a cut of the placement fee?", "acceptedAnswer": { "@type": "Answer", "text": "No. RecXchange takes zero platform commission on placement fees. Recruiters keep 100% of their agreed split. The platform is funded by membership subscriptions, not by taking a percentage of every deal." } }
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
