import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Hire Specialist Recruiters | RecXchange",
  description: "Access 15,000+ specialist recruiters through one platform. Pay 12 to 20% on placement only. No retainers, no upfront costs. RecXchange managed service.",
  keywords: [
    "hire specialist recruiters",
    "specialist recruitment agency",
    "find specialist recruiters",
    "hire niche recruiters",
    "recruitment marketplace for employers",
    "pay on placement recruitment",
    "contingency recruitment",
    "specialist recruiter network",
    "hire through recruiter network",
    "managed recruitment service"
  ],
  alternates: { canonical: "https://recxchange.io/hire-specialist-recruiters" },
  openGraph: {
    title: "Hire Specialist Recruiters | RecXchange",
    description: "Access 15,000+ specialist recruiters through one platform. 12 to 20% fee, pay on placement only. No retainers.",
    url: "https://recxchange.io/hire-specialist-recruiters",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Hire Specialist Recruiters, RecXchange" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Specialist Recruiters | RecXchange",
    description: "Access 15,000+ specialist recruiters. 12 to 20% fee, pay on placement only.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function HireSpecialistRecruitersLayout({ children }: { children: React.ReactNode }) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/hire-specialist-recruiters#webpage",
    "url": "https://recxchange.io/hire-specialist-recruiters",
    "name": "Hire Specialist Recruiters | RecXchange",
    "description": "Access 15,000+ specialist recruiters through one platform. Pay 12 to 20% on placement only. No retainers, no upfront costs.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "dateModified": "2026-04-02",
    "breadcrumb": { "@id": "https://recxchange.io/hire-specialist-recruiters#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/hire-specialist-recruiters#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Hire Specialist Recruiters", "item": "https://recxchange.io/hire-specialist-recruiters" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How much does it cost to hire through RecXchange?", "acceptedAnswer": { "@type": "Answer", "text": "RecXchange charges between 12% and 20% of the candidate's first-year salary, depending on the role type and seniority. You only pay when a candidate is successfully placed and starts work. There are no retainers, no upfront fees, and no subscription costs for hiring managers." } },
      { "@type": "Question", "name": "How is RecXchange different from a traditional recruitment agency?", "acceptedAnswer": { "@type": "Answer", "text": "A traditional agency assigns one or two consultants to your role. RecXchange gives you access to 15,000+ specialist recruiters simultaneously. Your role is matched to the recruiters most likely to have the right candidate, giving you far greater reach and speed. You still get a single point of contact through the managed service." } },
      { "@type": "Question", "name": "What sectors do RecXchange recruiters cover?", "acceptedAnswer": { "@type": "Answer", "text": "RecXchange recruiters cover every major sector including technology, engineering, healthcare, finance, sales, legal, construction, HR, and many more. The network spans the UK, US, Europe, Australia, the UAE, and South Africa." } }
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
