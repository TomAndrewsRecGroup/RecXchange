import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Build a Talent Pipeline | Strategic Hiring | RecXchange",
  description: "Build a strategic talent pipeline with RecXchange. Market mapping, salary benchmarking, competitor analysis, and pre-warmed candidates over 3-6 months.",
  keywords: [
    "strategic hiring",
    "talent pipeline",
    "market mapping recruitment",
    "salary benchmarking",
    "talent intelligence",
    "pre-hire research",
    "recruitment pipeline building",
    "proactive hiring strategy",
    "RecXchange strategic hire"
  ],
  alternates: {
    canonical: "https://recxchange.io/hiring-manager-strategic"
  },
  openGraph: {
    title: "Build a Talent Pipeline | Strategic Hiring | RecXchange",
    description: "Market mapping, salary benchmarking, competitor talent analysis, pre-warmed candidates. Be ready to hire before you need to.",
    url: "https://recxchange.io/hiring-manager-strategic",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange, Strategic Hiring & Talent Pipeline"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Build a Talent Pipeline | Strategic Hiring | RecXchange",
    description: "Market mapping, salary benchmarks, pre-warmed candidates. Be ready to hire before you need to.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function HiringManagerStrategicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/hiring-manager-strategic#service",
    "name": "RecXchange Strategic Talent Pipeline",
    "serviceType": "Strategic Recruitment & Talent Pipeline Building",
    "description": "For hiring managers who want to build a talent pipeline before officially opening a role. RecXchange delivers market mapping (who is in the market and at what salary), competitor talent analysis (who your competitors are hiring from), salary benchmarking for the role, and pre-warmed candidate pipelines over a 3-6 month period. When you are ready to hire, your shortlist is already built.",
    "provider": { "@id": "https://recxchange.io/#organization" },
    "audience": {
      "@type": "Audience",
      "audienceType": "Hiring Managers planning future headcount"
    },
    "url": "https://recxchange.io/hiring-manager-strategic"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/hiring-manager-strategic#webpage",
    "url": "https://recxchange.io/hiring-manager-strategic",
    "name": "Build a Talent Pipeline | Strategic Hiring | RecXchange",
    "description": "Market mapping, salary benchmarking, competitor talent analysis, pre-warmed candidates over 3-6 months.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/hiring-manager-strategic#service" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/hiring-manager-strategic#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/hiring-manager-strategic#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Hiring Managers", "item": "https://recxchange.io/hiring-manager-home" },
      { "@type": "ListItem", "position": 3, "name": "Build a Talent Pipeline", "item": "https://recxchange.io/hiring-manager-strategic" }
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
