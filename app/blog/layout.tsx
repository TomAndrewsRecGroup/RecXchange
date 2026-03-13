// metadata.ts removed — consolidated here.
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruitment Blog | Insights, Tips & News | RecXchange",
  description: "Split fee recruitment tips, industry insights, RecXchange platform updates, and success stories from 15,000+ recruiters. Written for recruiters and hiring managers.",
  keywords: [
    "recruitment blog",
    "split fee recruitment tips",
    "recruiter insights",
    "RecXchange blog",
    "recruitment industry news",
    "hiring tips",
    "recruiter collaboration tips",
    "recruitment trends"
  ],
  alternates: {
    canonical: "https://recxchange.io/blog"
  },
  openGraph: {
    title: "Recruitment Blog | Insights, Tips & News | RecXchange",
    description: "Split fee tips, industry insights, and platform news from the RecXchange team. Written for recruiters and hiring managers.",
    url: "https://recxchange.io/blog",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange Blog — Recruitment Insights & News"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment Blog | RecXchange",
    description: "Split fee tips, industry insights, and platform news from the RecXchange team.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://recxchange.io/blog#blog",
    "name": "RecXchange Blog",
    "description": "Split fee recruitment tips, industry insights, RecXchange platform updates, and success stories. Written for recruiters and hiring managers.",
    "url": "https://recxchange.io/blog",
    "publisher": { "@id": "https://recxchange.io/#organization" },
    "inLanguage": "en-GB"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/blog#webpage",
    "url": "https://recxchange.io/blog",
    "name": "Recruitment Blog | Insights, Tips & News | RecXchange",
    "description": "Split fee recruitment tips, industry insights, and platform updates from RecXchange.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#organization" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/blog#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/blog#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
