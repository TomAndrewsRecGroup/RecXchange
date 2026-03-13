import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "For Recruiters | Split Fee Collaboration Platform | RecXchange",
  description: "Join 15,000+ recruiters partnering on placements. Post roles to find candidates or share candidates to find roles. Split fees 50/50 to 70/30. AI-powered matching across 270M candidates. From $1/month.",
  keywords: [
    "recruiter collaboration",
    "split fee recruitment",
    "fee share recruitment",
    "recruiter partnership platform",
    "collaborative recruitment",
    "recruitment fee split",
    "recruiter network",
    "candidate sharing",
    "role sharing recruitment",
    "RecX Direct",
    "earn 70% commission recruitment"
  ],
  alternates: {
    canonical: "https://recxchange.io/recruiter"
  },
  openGraph: {
    title: "For Recruiters | Split Fee Collaboration Platform | RecXchange",
    description: "Join 15,000+ recruiters partnering on placements. Split fees automatically. Post roles or share candidates. Earn up to 70% commission on RecX Direct roles.",
    url: "https://recxchange.io/recruiter",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange — For Recruiters"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "For Recruiters | Split Fee Collaboration Platform | RecXchange",
    description: "15,000+ recruiters split fees automatically. Post roles, share candidates, earn up to 70% commission. From $1/month.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/recruiter#service",
    "name": "RecXchange Recruiter Collaboration Network",
    "serviceType": "Recruiter Collaboration Network",
    "description": "RecXchange connects 15,000+ specialist recruiters to collaborate on placements and split fees automatically. Recruiters post roles to find sourcing partners, or share candidates to find matching roles. Split fees 50/50, 60/40, or up to 70% on RecX Direct premium roles. AI-powered Xchange Engine matches roles and candidates in seconds. Automated legally binding split fee agreements. Timestamped deal protection. Access 270M candidate profiles globally.",
    "provider": {
      "@id": "https://recxchange.io/#organization"
    },
    "audience": {
      "@type": "ProfessionalAudience",
      "audienceType": "Recruiters",
      "suggestedMinAge": 18
    },
    "areaServed": [
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Europe" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "South Africa" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Recruiter Membership Tiers",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "RecX Entry",
          "price": "1",
          "priceCurrency": "USD",
          "description": "5 tokens/month. Access to collaborative roles and candidate database.",
          "url": "https://recxchange.io/pricing"
        },
        {
          "@type": "Offer",
          "name": "RecX Lite",
          "price": "99",
          "priceCurrency": "USD",
          "description": "150 tokens/month. RecX Direct access after 7 days. 50% split fees.",
          "url": "https://recxchange.io/pricing"
        },
        {
          "@type": "Offer",
          "name": "RecX Pro",
          "price": "249",
          "priceCurrency": "USD",
          "description": "400 tokens/month. Instant RecX Direct access. Up to 70% fee split.",
          "url": "https://recxchange.io/pricing"
        }
      ]
    },
    "url": "https://recxchange.io/recruiter"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/recruiter#webpage",
    "url": "https://recxchange.io/recruiter",
    "name": "For Recruiters | Split Fee Collaboration Platform | RecXchange",
    "description": "Join 15,000+ recruiters partnering on placements. Post roles to find candidates or share candidates to find roles. Split fees 50/50 to 70/30.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/recruiter#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/recruiter#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://recxchange.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "For Recruiters",
        "item": "https://recxchange.io/recruiter"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
