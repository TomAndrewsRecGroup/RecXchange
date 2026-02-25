import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Role Details | RecXchange',
  description: 'View detailed information about this recruitment opportunity. Submit candidates, review requirements, and connect with the posting recruiter.',
  keywords: 'role details, job opportunity, recruitment position, candidate submission',
  openGraph: {
    title: 'Role Details | RecXchange',
    description: 'View and apply to this recruitment opportunity',
    type: 'website',
  },
};

export default function RoleDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
