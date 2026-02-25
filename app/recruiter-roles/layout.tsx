import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Live Recruiting Roles - RecXchange Marketplace',
  description: 'Explore active recruiting opportunities across industries. Connect with hiring managers, submit candidates, and earn split fees on successful placements. Join 15,000+ recruiters.',
  keywords: 'recruiting roles, recruitment opportunities, split fee jobs, collaborative recruiting, recruiter marketplace',
  openGraph: {
    title: 'Browse Live Recruiting Roles - RecXchange',
    description: 'Explore active recruiting opportunities and earn split fees',
    type: 'website',
  },
};

export default function RecruiterRolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
