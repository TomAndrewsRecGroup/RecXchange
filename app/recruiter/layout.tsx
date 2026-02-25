import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Recruiter Collaboration Platform | RecXchange - Split Fees, Share Roles",
  description: "Join 15,000+ recruiters partnering on placements. Post roles to find candidates or share candidates to find roles. Split fees 50/50, 60/40, or 70/30. AI-powered matching with 270M candidates.",
  keywords: [
    "recruiter collaboration",
    "split fee recruitment",
    "fee share recruitment",
    "recruiter partnership platform",
    "collaborative recruitment",
    "recruitment fee split",
    "recruiter network",
    "candidate sharing",
    "role sharing recruitment"
  ],
  openGraph: {
    title: "Recruiter Collaboration Platform | RecXchange",
    description: "Join 15,000+ recruiters partnering on placements. Split fees automatically. Post roles or share candidates.",
    url: "https://recxchange.io/recruiter",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange Recruiter Platform"
    }]
  },
  alternates: {
    canonical: "https://recxchange.io/recruiter"
  }
};

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
