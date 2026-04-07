import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Freelance Recruiter Platform | RecXchange",
  description: "Join 15,000+ independent recruiters splitting fees with no desk fees or overheads. Keep your clients, earn up to 70% on RecX Direct. From $1/month.",
  keywords: [
    "freelance recruiter platform",
    "independent recruiter split fees",
    "freelance recruitment network",
    "freelance recruiter collaboration",
    "independent recruiter marketplace",
    "freelance split fee recruitment",
    "freelance recruiter tools",
    "independent recruitment platform"
  ],
  alternates: {
    canonical: "https://recxchange.io/freelance-recruiters"
  },
  openGraph: {
    title: "Freelance Recruiter Platform | Split Fees, No Desk Fees | RecXchange",
    description: "Independent recruiters earn more with RecXchange. No desk fees, no overheads. Split fees up to 70% on direct roles. 15,000+ recruiters already in.",
    url: "https://recxchange.io/freelance-recruiters",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange, Freelance Recruiter Platform"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Recruiter Platform | RecXchange",
    description: "No desk fees. No overheads. Split fees up to 70%. 15,000+ independent recruiters already collaborating.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function FreelanceRecruitersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/freelance-recruiters#webpage",
    "url": "https://recxchange.io/freelance-recruiters",
    "name": "Freelance Recruiter Platform | Split Fees, No Desk Fees | RecXchange",
    "description": "RecXchange is a freelance recruiter platform where independent recruiters collaborate on placements and split fees with no desk fees or overheads.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "datePublished": "2026-04-02",
    "dateModified": "2026-04-02",
    "breadcrumb": { "@id": "https://recxchange.io/freelance-recruiters#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/freelance-recruiters#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Recruiters", "item": "https://recxchange.io/recruiter" },
      { "@type": "ListItem", "position": 3, "name": "Freelance Recruiters", "item": "https://recxchange.io/freelance-recruiters" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I use RecXchange as a freelance recruiter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. RecXchange is built for independent and freelance recruiters. You keep your own clients and candidates, set your own schedule, and use the platform to access thousands of live roles and sourcing partners. There are no desk fees, no agency overheads, and no lock-in contracts. You pay from $1/month and earn split fees on every placement you collaborate on."
        }
      },
      {
        "@type": "Question",
        "name": "How do split fees work for freelance recruiters on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When you collaborate on a placement through RecXchange, the fee is split between the recruiter who holds the role and the recruiter who supplies the candidate. Splits are typically 50/50 or 60/40, and on RecX Direct roles (Andrews Recruitment Group t/a RecX Direct) the candidate-holding recruiter can earn up to 70% of the total fee. Every split is covered by an automatically generated, legally binding agreement before any candidate data is shared."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need an agency or company to join RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Solo freelance recruiters, independent consultants, and one-person recruitment businesses all use RecXchange. You do not need a company registration, a team, or an office. You just need recruitment experience, a willingness to collaborate, and a membership starting from $1/month."
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
