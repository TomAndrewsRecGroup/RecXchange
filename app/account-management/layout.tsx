// account-management/metadata.ts removed — consolidated here.
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Dedicated Recruitment Account Manager | RecXchange",
  description: "Your dedicated Account Manager owns the hiring process end-to-end. 15,000+ recruiters managed for you. Top 1% candidate quality. RPO without the price tag.",
  keywords: [
    "dedicated recruitment account manager",
    "managed recruitment service",
    "white glove recruitment",
    "recruitment concierge service",
    "managed RPO alternative",
    "recruitment account management",
    "enterprise recruitment support",
    "hiring manager dedicated support",
    "single point of contact recruitment",
    "RecXchange account manager"
  ],
  alternates: {
    canonical: "https://recxchange.io/account-management"
  },
  openGraph: {
    title: "Dedicated Recruitment Account Manager | RecXchange",
    description: "One point of contact. 15,000+ recruiters managed for you. Top 1% candidates. 100% role ownership. Managed RPO without the price tag.",
    url: "https://recxchange.io/account-management",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange, Dedicated Recruitment Account Manager"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedicated Recruitment Account Manager | RecXchange",
    description: "One contact. 15,000+ recruiters managed for you. Top 1% candidates. 100% role ownership.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function AccountManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/account-management#service",
    "name": "RecXchange Dedicated Account Management",
    "serviceType": "Managed Recruitment & Account Management",
    "description": "Every RecXchange client is assigned a dedicated Account Manager who takes full end-to-end ownership of the hiring process. The Account Manager manages all recruiter communications, ensures only top 1% quality candidates are presented, monitors the Xchange Engine 24/7, and acts as the single point of contact for the hiring manager throughout. Managed RPO-quality service without the RPO cost structure.",
    "provider": { "@id": "https://recxchange.io/#organization" },
    "audience": {
      "@type": "Audience",
      "audienceType": "Hiring Managers and HR Leaders"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Account Management Service Features",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Single Point of Contact" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "100% Role Ownership" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Top 1% Candidate Quality Filter" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Xchange Engine Monitoring" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Recruiter Spam Prevention" } }
      ]
    },
    "url": "https://recxchange.io/account-management"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/account-management#webpage",
    "url": "https://recxchange.io/account-management",
    "name": "Dedicated Recruitment Account Manager | White Glove Service | RecXchange",
    "description": "Dedicated Account Manager with 100% role ownership, top 1% candidates, 24/7 monitoring.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/account-management#service" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/account-management#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/account-management#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Hiring Managers", "item": "https://recxchange.io/hiring-manager-home" },
      { "@type": "ListItem", "position": 3, "name": "Account Management", "item": "https://recxchange.io/account-management" }
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
