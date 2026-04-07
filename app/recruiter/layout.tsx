import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "For Recruiters | Split Fee Platform | RecXchange",
  description: "Join 15,000+ recruiters on placements. Post roles or share candidates. Split fees 50/50 to 70/30. AI matching across 270M candidates. From $1/month.",
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
      alt: "RecXchange - For Recruiters"
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
    "description": "RecXchange connects 15,000+ specialist recruiters to collaborate on placements and split fees automatically. Recruiters post roles to find sourcing partners, or share candidates to find matching roles. Split fees 50/50, 60/40, or up to 70% on RecX Direct premium roles (Andrews Recruitment Group t/a RecX Direct). AI-powered Xchange Engine matches roles and candidates in seconds. Automated legally binding split fee agreements. Timestamped deal protection. Access 270M candidate profiles globally.",
    "provider": { "@id": "https://recxchange.io/#organization" },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does RecXchange work for recruiters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange works in two ways for recruiters. If you have a live role but need a candidate, you post the role and 15,000+ specialist recruiters compete to source and submit the best match. If you have a strong candidate but no suitable role, you upload the candidate and the Xchange Engine automatically matches them to live roles across the network. In both cases, when a placement is made, the fee is split automatically between the role-holding and candidate-holding recruiter. Splits are typically 50/50, 60/40, or up to 70/30 on RecX Direct roles (Andrews Recruitment Group t/a RecX Direct)."
        }
      },
      {
        "@type": "Question",
        "name": "How much can I earn as a recruiter on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recruiters on RecXchange earn an average of $7,000 per placement. This is their net cut after the fee split, not the total placement fee divided. On RecX Direct roles (Andrews Recruitment Group t/a RecX Direct), candidate-holding recruiters earn up to 70% of the total placement fee. With over $750,000 in active fees across 100+ live roles, the network provides consistent earning opportunities across all sectors and geographies."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between posting a role and sharing a candidate on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Posting a role means you have a client vacancy and need a specialist recruiter to source the candidate. You upload the role brief, the Xchange Engine alerts relevant recruiters, and they submit pre-screened candidates directly to you. Sharing a candidate means you have a strong candidate looking for a new role, and you want to partner with a recruiter who has the right live vacancy. Both approaches result in a split fee placement when successful."
        }
      },
      {
        "@type": "Question",
        "name": "How does RecXchange protect my candidates and roles from being stolen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange's Deal Protection system timestamps every candidate submission at the moment of upload, creating an immutable record of who submitted whom and when. Split fee agreements are auto-generated and legally binding before any candidate data is shared between recruiters. This eliminates disputes over candidate ownership and ensures every recruiter is paid correctly."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I make my first placement on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average RecXchange recruiter makes their first split fee placement within 19 days of joining. Some recruiters make placements within 48 hours of uploading their first candidate or posting their first role. The speed depends on how active you are, the quality of your roles and candidates, and how quickly you respond to matches from the Xchange Engine."
        }
      },
      {
        "@type": "Question",
        "name": "What sectors and geographies does RecXchange cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange covers specialist recruitment across Technology, Engineering, Healthcare, Finance, Sales, HR and People, Legal, and Construction and Built Environment. Geographically, the platform covers the United Kingdom (London, Manchester, Birmingham, nationwide), United States, United Arab Emirates, Australia, South Africa, and Europe including cross-border international placements."
        }
      }
    ]
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
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-13",
    "breadcrumb": { "@id": "https://recxchange.io/recruiter#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/recruiter#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Recruiters", "item": "https://recxchange.io/recruiter" }
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
