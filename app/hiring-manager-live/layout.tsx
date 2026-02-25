import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Live Roles - RecXchange for Hiring Managers',
  description: 'Post your open position and instantly connect with 15,000+ recruiters competing to fill it. One point of contact, multiple sourcing channels, single placement fee.',
  keywords: 'post job opening, hiring manager platform, recruit talent, staffing solution, recruitment marketplace',
  openGraph: {
    title: 'Post Live Roles - RecXchange for Hiring Managers',
    description: 'Connect with 15,000+ recruiters to fill your open positions',
    type: 'website',
  },
};

export default function HiringManagerLiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
