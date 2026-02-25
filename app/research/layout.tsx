import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidate Research & Database - 270M Profiles | RecXchange',
  description: 'Search and research from 270M candidate profiles. Find talent, build pipelines, and access comprehensive professional data for your recruitment needs.',
  keywords: 'candidate database, talent search, recruiter research, 270 million candidates, professional profiles',
  openGraph: {
    title: 'Candidate Research - 270M Profiles | RecXchange',
    description: 'Search 270M candidate profiles for your recruitment needs',
    type: 'website',
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
