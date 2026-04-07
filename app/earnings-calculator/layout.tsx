import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruiter Earnings Calculator | RecXchange",
  description: "Calculate your potential split fee earnings on RecXchange. See your ROI across Entry, Lite, and Pro tiers with our free calculator.",
  keywords: [
    "recruiter earnings calculator",
    "split fee calculator",
    "recruitment ROI calculator",
    "recruiter income calculator",
    "split fee recruitment earnings",
    "recruitment placement fee calculator",
    "recruiter collaboration earnings",
    "RecXchange earnings"
  ],
  alternates: {
    canonical: "https://recxchange.io/earnings-calculator"
  },
  openGraph: {
    title: "Recruiter Earnings Calculator | See Your Split Fee ROI | RecXchange",
    description: "Calculate your potential split fee earnings on RecXchange. See your ROI across Entry, Lite, and Pro tiers with our free calculator.",
    url: "https://recxchange.io/earnings-calculator",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange, Recruiter Earnings Calculator"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruiter Earnings Calculator | RecXchange",
    description: "Calculate your potential split fee earnings. See your ROI across Entry, Lite, and Pro membership tiers.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function EarningsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/earnings-calculator#webpage",
    "url": "https://recxchange.io/earnings-calculator",
    "name": "Recruiter Earnings Calculator | See Your Split Fee ROI | RecXchange",
    "description": "Calculate your potential split fee earnings on RecXchange. Input your average placement fee, split percentage, and placement volume to see projected annual earnings and ROI.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "datePublished": "2026-04-02",
    "dateModified": "2026-04-02",
    "breadcrumb": { "@id": "https://recxchange.io/earnings-calculator#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/earnings-calculator#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://recxchange.io/pricing" },
      { "@type": "ListItem", "position": 3, "name": "Earnings Calculator", "item": "https://recxchange.io/earnings-calculator" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much can a recruiter earn on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Earnings depend on the placement fee, your agreed split percentage, and how many placements you make. The average placement earning on RecXchange is $7,000. With a 50/50 split on a $15,000 fee, you would earn $7,500 per placement. Most active members complete 2 to 5 placements per quarter."
        }
      },
      {
        "@type": "Question",
        "name": "What is the ROI of a RecXchange membership?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A single placement typically covers your annual membership cost many times over. For example, on the Entry tier at $1 per month, one placement earning $7,500 gives you an ROI of over 62,000%. Even on the Pro tier at $249 per month, two placements per quarter would return over 1,900% annually."
        }
      },
      {
        "@type": "Question",
        "name": "How are split fees calculated on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Split fees are calculated as a percentage of the total placement fee. The recruiter holding the role and the recruiter supplying the candidate agree on a split before any work begins. Typical splits range from 50/50 to 70/30 on RecX Direct roles. RecXchange does not take a commission from your placement fee."
        }
      }
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
