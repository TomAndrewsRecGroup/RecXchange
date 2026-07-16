// Static metadata intentionally minimal here.
// Dynamic per-post metadata (title, description, OG, canonical) is generated
// by generateMetadata() in app/blog/[slug]/page.tsx using the post's own data.
// This layout provides the structural Article JSON-LD wrapper only.
import React from 'react';

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Article schema shell - dynamic fields (headline, datePublished, author, url)
  // should be output by page.tsx generateMetadata or a per-post script tag.
  // This provides the publisher + organization link that every post shares.
  const articlePublisherSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://recxchange.io/#organization",
    "name": "RecXchange",
    "url": "https://recxchange.io",
    "logo": {
      "@type": "ImageObject",
      "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articlePublisherSchema) }} />
      {children}
    </>
  );
}
