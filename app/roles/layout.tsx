import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Live Recruitment Roles | RecXchange - Browse 1000s of Split Fee Opportunities",
  description: "Browse live recruitment roles from 15,000+ recruiters. Submit candidates and split fees 50/50, 60/40, or take 70% on RecX Direct placements. Recruiters earn an average of $7,000 per placement — that's your cut after the split. $750,000 in fees available. Roles across UK, USA, Europe, Africa, Middle East, Australia in Engineering, Healthcare, Tech, HR, Sales, Finance.",
  keywords: [
    "recruitment roles",
    "live recruitment jobs",
    "split fee roles",
    "recruiter marketplace",
    "collaborative recruitment roles",
    "RecX Direct roles",
    "recruitment job board",
    "fee share opportunities"
  ],
  openGraph: {
    title: "Live Recruitment Roles | RecXchange",
    description: "Browse 1000s of live roles. Submit candidates. Split fees automatically. Recruiters earn an average of $7,000 per placement.",
    url: "https://recxchange.io/roles",
    type: "website"
  },
  alternates: {
    canonical: "https://recxchange.io/roles"
  }
};

export default function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
