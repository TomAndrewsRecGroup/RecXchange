// Static layout shell for individual role detail pages.
// Dynamic per-role metadata (title, description, canonical, OG)
// MUST be output by generateMetadata() in app/roles/[id]/page.tsx
// using the role's own Supabase data (title, sector, location, salary, fee).
// This layout provides the shared JobPosting schema structural wrapper.
import React from 'react';

export default function RoleDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JobPosting organization shell — shared across all role detail pages.
  // Dynamic fields (title, datePosted, baseSalary, jobLocation, etc.)
  // are added by page.tsx per-role generateMetadata or a role-specific script tag.
  const hiringOrgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://recxchange.io/#organization",
    "name": "RecXchange",
    "url": "https://recxchange.io",
    "description": "RecXchange is the global recruiter collaboration marketplace where 15,000+ specialist recruiters post live roles, share candidates, and split placement fees automatically.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
    },
    "sameAs": [
      "https://www.linkedin.com/company/recxchange",
      "https://twitter.com/RecXchange"
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hiringOrgSchema) }} />
      {children}
    </>
  );
}
