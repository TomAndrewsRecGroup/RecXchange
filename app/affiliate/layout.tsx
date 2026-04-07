import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Affiliate Programme | Earn RecX Tokens | RecXchange",
  description: "Refer recruiters to RecXchange and earn RecX Tokens for platform credits, candidate contact data and eLearning content. Clear terms, transparent rewards.",
  keywords: [
    "RecXchange affiliate program",
    "recruiter referral program",
    "earn RecX tokens",
    "recruitment referral rewards",
    "refer recruiters earn tokens",
    "RecXchange referral",
    "recruiter token rewards",
    "recruitment affiliate"
  ],
  alternates: {
    canonical: "https://recxchange.io/affiliate"
  },
  openGraph: {
    title: "Affiliate Program | Earn RecX Tokens for Referrals | RecXchange",
    description: "Refer recruiters. Earn RecX Tokens for platform credits, candidate contact data, and eLearning. Transparent terms, real rewards.",
    url: "https://recxchange.io/affiliate",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange Affiliate Program, Earn RecX Tokens"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Program | Earn RecX Tokens | RecXchange",
    description: "Refer recruiters to RecXchange. Earn tokens for platform credits, candidate data, and eLearning.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/affiliate#service",
    "name": "RecXchange Affiliate & Referral Program",
    "serviceType": "Recruiter Referral Rewards Program",
    "description": "RecXchange members earn RecX Tokens by referring other recruiters to the platform. Tokens are redeemable for uploading candidates or roles to the Xchange Engine, purchasing eLearning content, and unlocking candidate contact information (email and phone) in the sourcing tools. Program governed by clear published terms.",
    "provider": { "@id": "https://recxchange.io/#organization" },
    "audience": {
      "@type": "Audience",
      "audienceType": "Registered RecXchange Recruiters"
    },
    "offers": {
      "@type": "Offer",
      "name": "RecX Token Referral Rewards",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free to join. Earn RecX Tokens per verified referral. Tokens redeemable for platform services.",
      "availability": "https://schema.org/InStock",
      "url": "https://recxchange.io/affiliate"
    },
    "url": "https://recxchange.io/affiliate"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/affiliate#webpage",
    "url": "https://recxchange.io/affiliate",
    "name": "Affiliate Program | Earn RecX Tokens for Referrals | RecXchange",
    "description": "Refer recruiters to RecXchange and earn RecX Tokens redeemable for platform credits, candidate contact data, and eLearning content.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/affiliate#service" },
    "dateModified": "2026-03-09",
    "breadcrumb": { "@id": "https://recxchange.io/affiliate#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/affiliate#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Affiliate Program", "item": "https://recxchange.io/affiliate" }
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
