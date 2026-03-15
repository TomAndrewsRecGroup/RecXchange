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

// Rolling priceValidUntil — 1 year from the last schema update date.
// Update this date whenever pricing changes.
const PRICE_VALID_UNTIL = "2027-03-15";

// Shared merchant policy objects (non-critical but resolves GSC warnings).
// RecXchange is a SaaS subscription — no physical shipping; returns are
// handled via account cancellation within the billing period.
const digitalShippingDetails = {
  "@type": "OfferShippingDetails",
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": "0",
    "currency": "USD"
  },
  "shippingDestination": {
    "@type": "DefinedRegion",
    "name": "Worldwide"
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": 0,
      "maxValue": 0,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": 0,
      "maxValue": 0,
      "unitCode": "DAY"
    }
  }
};

const merchantReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
  "merchantReturnLink": "https://recxchange.io/terms",
  "returnPolicySeasonalOverride": null,
  "description": "Digital SaaS subscription. Cancel anytime to stop future billing. No refunds on consumed tokens or past billing periods. See Terms of Service for full details."
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
    // image is required for Merchant Listings rich results (critical field)
    "image": {
      "@type": "ImageObject",
      "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      "width": 512,
      "height": 512
    },
    "brand": {
      "@type": "Brand",
      "name": "RecXchange"
    },
    "provider": {
      "@id": "https://recxchange.io/#organization"
    },
    "url": "https://recxchange.io/pricing",
    // aggregateRating deliberately omitted here — single source of truth is
    // on #softwareapplication in the root layout. Having it in both causes the
    // "Review has multiple aggregate ratings" GSC error on /pricing.
    "offers": [
      {
        "@type": "Offer",
        "name": "RecX Entry",
        "price": "1.00",
        "priceCurrency": "USD",
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "5 tokens per month. Access to collaborative roles and 270M candidate database. Basic platform access.",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": merchantReturnPolicy,
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
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "150 tokens per month. RecX Direct access after 7 days. 50% split fee collaboration.",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": merchantReturnPolicy,
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
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "400 tokens per month. Instant RecX Direct access. Up to 70% fee split on premium roles. Pro tokens accumulate and never reset.",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": merchantReturnPolicy,
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
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "10 additional platform tokens. Use to post roles, submit candidates, or unlock contact details.",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": merchantReturnPolicy
      },
      {
        "@type": "Offer",
        "name": "Token Pack — 50 tokens",
        "price": "40.00",
        "priceCurrency": "USD",
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "50 additional platform tokens.",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": merchantReturnPolicy
      },
      {
        "@type": "Offer",
        "name": "Token Pack — 100 tokens",
        "price": "70.00",
        "priceCurrency": "USD",
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "100 additional platform tokens.",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": merchantReturnPolicy
      },
      {
        "@type": "Offer",
        "name": "Token Pack — 500 tokens",
        "price": "300.00",
        "priceCurrency": "USD",
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": "https://recxchange.io/pricing",
        "description": "500 additional platform tokens. Best value bulk pack.",
        "shippingDetails": digitalShippingDetails,
        "hasMerchantReturnPolicy": merchantReturnPolicy
      }
    ]
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
    "dateModified": "2026-03-15",
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
