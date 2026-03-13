import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Hire Faster With RecX Direct | Post a Role Free | RecXchange",
  description: "Post your role free. 15,000+ specialist recruiters compete to fill it. First candidates within 48 hours. Pay one fee (12-20%) only when you hire. No retainers, no upfront costs. UK, USA, Europe, Middle East, Africa, Australia.",
  keywords: [
    "hire talent fast",
    "recruitment platform for hiring managers",
    "contingency recruitment",
    "post jobs for recruiters",
    "hiring platform UK",
    "recruitment marketplace for employers",
    "RecX Direct",
    "no win no fee recruitment",
    "candidates in 48 hours",
    "free job posting recruiters"
  ],
  alternates: {
    canonical: "https://recxchange.io/hiring-manager-home"
  },
  openGraph: {
    title: "Hire Faster With RecX Direct | Post a Role Free | RecXchange",
    description: "Post your role free. 15,000+ recruiters compete to fill it. First candidates in 48 hours. Pay one fee only when you hire.",
    url: "https://recxchange.io/hiring-manager-home",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange — Hire Faster With RecX Direct"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Faster With RecX Direct | Post a Role Free",
    description: "15,000+ recruiters compete to fill your role. First candidates in 48 hours. Pay one fee only when you hire.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function HiringManagerHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Service schema description includes the full how-it-works explainer so
  // crawlers can read content that is only accessible via modal in the UI.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/hiring-manager-home#service",
    "name": "RecX Direct — Contingency Recruitment for Hiring Managers",
    "serviceType": "Contingency Recruitment",
    "description": "RecX Direct is RecXchange's hiring manager service. Post a role for free and 15,000+ specialist recruiters compete to fill it. How it works: Step 1 — Post your role (free, takes 5 minutes, include job title, location, salary, and requirements). Step 2 — Recruiters are matched to your role by the AI Xchange Engine and begin sourcing immediately. Step 3 — First candidates arrive within 48 hours, pre-screened and matched to your criteria. Step 4 — Review candidates in your dashboard, select who to interview. Step 5 — Hire and pay one success fee of 12-20% only when your chosen candidate starts. No retainers, no upfront costs, no exclusivity required.",
    "provider": {
      "@id": "https://recxchange.io/#organization"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Hiring Managers and Employers"
    },
    "areaServed": [
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Europe" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "South Africa" }
    ],
    "offers": {
      "@type": "Offer",
      "name": "RecX Direct Contingency Recruitment",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free to post. Success fee of 12-20% payable only when a candidate is hired and starts. No upfront cost, no retainer, no exclusivity required.",
      "availability": "https://schema.org/InStock",
      "url": "https://recxchange.io/hiring-manager-home"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hiring Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Fill Role Now",
          "description": "Urgent hire needed. Post your role and receive pre-screened candidates within 48 hours from 15,000+ specialist recruiters.",
          "url": "https://recxchange.io/hiring-manager-live"
        },
        {
          "@type": "Offer",
          "name": "Build a Talent Pipeline",
          "description": "Strategic hiring over 3-6 months. Market mapping, competitor talent analysis, and pre-warmed candidate pipelines.",
          "url": "https://recxchange.io/hiring-manager-strategic"
        }
      ]
    },
    "url": "https://recxchange.io/hiring-manager-home"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/hiring-manager-home#webpage",
    "url": "https://recxchange.io/hiring-manager-home",
    "name": "Hire Faster With RecX Direct | Post a Role Free | RecXchange",
    "description": "Post your role free. 15,000+ specialist recruiters compete to fill it. First candidates within 48 hours. Pay one fee only when you hire.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/hiring-manager-home#service" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/hiring-manager-home#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/hiring-manager-home#breadcrumb",
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
        "name": "For Hiring Managers",
        "item": "https://recxchange.io/hiring-manager-home"
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
