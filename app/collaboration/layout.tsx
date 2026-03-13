import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruiter Collaboration Platform | Partner & Split Fees | RecXchange",
  description: "RecXchange is the recruiter collaboration platform where 15,000+ recruiters partner on placements and split fees automatically. Post a role, find a candidate partner, agree split terms, earn more together.",
  keywords: [
    "recruiter collaboration platform",
    "split fee recruitment",
    "recruiter partnership",
    "collaborative recruitment",
    "recruiter network",
    "split placement fees",
    "partner with recruiters",
    "recruitment collaboration",
    "earn more as recruiter"
  ],
  alternates: {
    canonical: "https://recxchange.io/collaboration"
  },
  openGraph: {
    title: "Recruiter Collaboration Platform | Partner & Split Fees | RecXchange",
    description: "15,000+ recruiters partner on placements and split fees automatically. Post a role, find a candidate partner, agree terms, earn more together.",
    url: "https://recxchange.io/collaboration",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange — Recruiter Collaboration Platform"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruiter Collaboration Platform | RecXchange",
    description: "15,000+ recruiters partner on placements and split fees automatically. Earn more together.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/collaboration#service",
    "name": "RecXchange Recruiter Collaboration",
    "serviceType": "Recruiter Collaboration & Split Fee Placement",
    "description": "RecXchange connects recruiters with each other to collaborate on placements and automatically split fees. Recruiters with live roles partner with recruiters who have matching candidates. Splits of 50/50, 60/40, or 70/30 are agreed before any candidate data is shared. Auto-generated contracts protect both parties.",
    "provider": { "@id": "https://recxchange.io/#organization" },
    "audience": {
      "@type": "Audience",
      "audienceType": "Recruitment Professionals"
    },
    "areaServed": [
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Europe" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "South Africa" }
    ],
    "url": "https://recxchange.io/collaboration"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/collaboration#webpage",
    "url": "https://recxchange.io/collaboration",
    "name": "Recruiter Collaboration Platform | Partner & Split Fees | RecXchange",
    "description": "RecXchange is the recruiter collaboration platform where 15,000+ recruiters partner on placements and split fees automatically.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/collaboration#service" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/collaboration#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/collaboration#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Collaboration", "item": "https://recxchange.io/collaboration" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
