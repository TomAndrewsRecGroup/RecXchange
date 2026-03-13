import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange Pricing | From $1/Month | Split Fee Recruiter Plans",
  description: "RecXchange pricing from $1/month. Entry (5 tokens), Lite $99/month (150 tokens), Pro $249/month (400 tokens, instant RecX Direct, up to 70% commission). No platform fees on placements. Cancel anytime.",
  keywords: [
    "recruiter pricing",
    "recruitment platform cost",
    "split fee recruitment pricing",
    "recruiter collaboration cost",
    "recruitment software pricing",
    "RecXchange pricing",
    "recruitment platform tiers",
    "RecX Entry",
    "RecX Lite",
    "RecX Pro",
    "recruitment tokens",
    "RecX Direct access"
  ],
  alternates: {
    canonical: "https://recxchange.io/pricing"
  },
  openGraph: {
    title: "RecXchange Pricing | From $1/Month | Split Fee Recruiter Plans",
    description: "Entry $1/month, Lite $99/month, Pro $249/month. One placement pays for the year. No platform fees on placements. Cancel anytime.",
    url: "https://recxchange.io/pricing",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange Pricing Plans"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "RecXchange Pricing | From $1/Month",
    description: "Entry $1, Lite $99, Pro $249/month. Earn up to 70% commission on RecX Direct roles. No platform fees on placements.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://recxchange.io/pricing#product",
    "name": "RecXchange Recruiter Platform",
    "description": "Recruiter collaboration platform with split fee automation, AI-powered candidate matching, and access to 270M candidate profiles. Three membership tiers from $1/month.",
    "brand": {
      "@type": "Brand",
      "name": "RecXchange"
    },
    "provider": {
      "@id": "https://recxchange.io/#organization"
    },
    "url": "https://recxchange.io/pricing",
    "offers": [
      {
        "@type": "Offer",
        "name": "RecX Entry",
        "price": "1.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "5 tokens per month. Access to collaborative roles and 270M candidate database. Basic platform access.",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "1.00",
          "priceCurrency": "USD",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitText": "MONTH"
          }
        }
      },
      {
        "@type": "Offer",
        "name": "RecX Lite",
        "price": "99.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "150 tokens per month. RecX Direct access after 7 days. 50% split fee collaboration.",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "99.00",
          "priceCurrency": "USD",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitText": "MONTH"
          }
        }
      },
      {
        "@type": "Offer",
        "name": "RecX Pro",
        "price": "249.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "400 tokens per month. Instant RecX Direct access. Up to 70% fee split on premium roles. Pro tokens accumulate and never reset.",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "249.00",
          "priceCurrency": "USD",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitText": "MONTH"
          }
        }
      },
      {
        "@type": "Offer",
        "name": "Token Pack — 10 tokens",
        "price": "10.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "10 additional platform tokens. Use to post roles, submit candidates, or unlock contact details."
      },
      {
        "@type": "Offer",
        "name": "Token Pack — 50 tokens",
        "price": "40.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "50 additional platform tokens."
      },
      {
        "@type": "Offer",
        "name": "Token Pack — 100 tokens",
        "price": "70.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "100 additional platform tokens."
      },
      {
        "@type": "Offer",
        "name": "Token Pack — 500 tokens",
        "price": "300.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "500 additional platform tokens. Best value bulk pack."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "287",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/pricing#webpage",
    "url": "https://recxchange.io/pricing",
    "name": "RecXchange Pricing | From $1/Month | Split Fee Recruiter Plans",
    "description": "RecXchange pricing from $1/month. Entry, Lite, and Pro tiers for recruiters. Token packs available. No platform fees on placements.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/pricing#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/pricing#breadcrumb",
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
        "name": "Pricing",
        "item": "https://recxchange.io/pricing"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
