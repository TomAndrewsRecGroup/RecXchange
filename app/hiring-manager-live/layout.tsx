import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Fill a Role Now | Urgent Hire | RecX Direct | RecXchange",
  description: "Post your live role free. 15,000+ specialist recruiters compete to fill it. Pre-screened candidates in 48 hours. 12-20% fee, paid only when you hire.",
  keywords: [
    "fill role now",
    "urgent recruitment",
    "hire fast",
    "post live job recruiters",
    "contingency recruitment urgent",
    "candidates in 48 hours",
    "no win no fee recruitment",
    "recruitment marketplace urgent hire",
    "RecX Direct live role"
  ],
  alternates: {
    canonical: "https://recxchange.io/hiring-manager-live"
  },
  openGraph: {
    title: "Fill a Role Now | Urgent Hire | RecX Direct | RecXchange",
    description: "Post your live role free. First pre-screened candidates within 48 hours. One success fee of 12-20% paid only when you hire.",
    url: "https://recxchange.io/hiring-manager-live",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange, Fill a Role Now With RecX Direct"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fill a Role Now | Urgent Hire | RecXchange",
    description: "First pre-screened candidates within 48 hours. One fee, paid only when you hire. Post free.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function HiringManagerLiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/hiring-manager-live#service",
    "name": "RecX Direct, Fill a Role Now",
    "serviceType": "Urgent Contingency Recruitment",
    "description": "For hiring managers who need to fill a role immediately. Post your live role for free on RecX Direct. 15,000+ specialist recruiters are matched to your role by the Xchange Engine and begin sourcing immediately. First pre-screened candidates arrive within 48 hours. You review, select who to interview, hire, and pay one success fee of 12-20% only when your chosen candidate starts. No retainers, no exclusivity, no upfront costs.",
    "provider": { "@id": "https://recxchange.io/#organization" },
    "audience": {
      "@type": "Audience",
      "audienceType": "Hiring Managers with urgent vacancies"
    },
    "offers": {
      "@type": "Offer",
      "name": "RecX Direct Urgent Hire",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free to post. Success fee of 12-20% paid only on hire. No upfront cost.",
      "availability": "https://schema.org/InStock",
      "url": "https://recxchange.io/hiring-manager-live"
    },
    "url": "https://recxchange.io/hiring-manager-live"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/hiring-manager-live#webpage",
    "url": "https://recxchange.io/hiring-manager-live",
    "name": "Fill a Role Now | Urgent Hire | RecX Direct | RecXchange",
    "description": "Post your live role free. First pre-screened candidates within 48 hours. One success fee paid only on hire.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/hiring-manager-live#service" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/hiring-manager-live#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/hiring-manager-live#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Hiring Managers", "item": "https://recxchange.io/hiring-manager-home" },
      { "@type": "ListItem", "position": 3, "name": "Fill a Role Now", "item": "https://recxchange.io/hiring-manager-live" }
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
