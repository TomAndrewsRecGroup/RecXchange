import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Hire Faster With RecX Direct | Post a Role Free | RecXchange",
  description: "Post your role free. 15,000+ specialist recruiters compete to fill it. First candidates in 48 hours. Pay one fee (12-20%) only when you hire. No retainers.",
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
      alt: "RecXchange - Hire Faster With RecX Direct"
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
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/hiring-manager-home#service",
    "name": "RecX Direct - Contingency Recruitment for Hiring Managers",
    "serviceType": "Contingency Recruitment",
    "description": "RecX Direct is RecXchange's hiring manager service (operated by Andrews Recruitment Group t/a RecX Direct). Post a role for free and 15,000+ specialist recruiters compete to fill it. Step 1: Post your role (free, 5 minutes, include job title, location, salary and requirements). Step 2: Recruiters are matched by the AI Xchange Engine and begin sourcing immediately. Step 3: First candidates arrive within 48 hours, pre-screened and matched to your criteria. Step 4: Review candidates in your dashboard, select who to interview. Step 5: Hire and pay one success fee of 12-20% only when your chosen candidate starts. No retainers, no upfront costs, no exclusivity required.",
    "provider": { "@id": "https://recxchange.io/#organization" },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does RecXchange work for hiring managers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange gives hiring managers access to 15,000+ specialist recruiters through a single dedicated Account Manager. You post your role once (free, takes 5 minutes). The Xchange Engine immediately matches it to the most relevant specialist recruiters in the network. Those recruiters begin sourcing and submitting pre-screened candidates, typically within 48 hours. You review candidates in a single dashboard, select who to interview, and pay one success fee of 12-20% only when your chosen candidate starts. No retainers, no upfront cost, no commitment required. RecX Direct is operated by Andrews Recruitment Group t/a RecX Direct."
        }
      },
      {
        "@type": "Question",
        "name": "How much does RecXchange cost for hiring managers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange is completely free to post a role. There is no subscription fee, no retainer, and no upfront cost for hiring managers. You pay a single success fee of 12-20% of the placed candidate's salary, payable only when your chosen candidate starts in the role. If no placement is made, you pay nothing."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly will I receive candidates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most hiring managers receive their first pre-screened candidates within 48 hours of posting a role on RecXchange. The Xchange Engine immediately alerts the most relevant specialist recruiters in the network, who begin sourcing from their existing candidate relationships. For niche or senior roles, the timeline is typically 3-5 business days for the first strong submissions."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Live Hiring and Strategic Hiring on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Live Hiring (Fill Role Now) is for urgent vacancies where you need pre-screened candidates fast. Roles are posted immediately and recruiters begin submitting within 48 hours. Strategic Hiring is for planned hiring over 3-6 months, covering market mapping, competitor talent analysis, and building pre-warmed candidate pipelines before you formally open a vacancy. Both are available through your RecXchange hiring manager account."
        }
      },
      {
        "@type": "Question",
        "name": "Is RecXchange available outside the UK?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. RecXchange supports hiring across the United Kingdom, United States, United Arab Emirates, Australia, South Africa, and Europe including cross-border international placements. The recruiter network covers specialist sectors in all these regions, and the Xchange Engine can match your role to recruiters with geographic-specific candidate relationships."
        }
      },
      {
        "@type": "Question",
        "name": "Do I have to work exclusively with RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. RecXchange operates on a fully contingency basis with no exclusivity requirement. You can post your role on RecXchange while running your own internal hiring process or working with other agencies simultaneously. You only pay if RecXchange delivers the candidate you choose to hire."
        }
      }
    ]
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
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-13",
    "breadcrumb": { "@id": "https://recxchange.io/hiring-manager-home#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/hiring-manager-home#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Hiring Managers", "item": "https://recxchange.io/hiring-manager-home" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
