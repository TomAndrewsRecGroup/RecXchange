import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hire Talent Faster | RecXchange - Digital RPO with Agency Terms",
  description: "Post your role for free. 15,000+ recruiters compete to fill it across UK, USA, Europe, Africa, Middle East, Australia. Pay one fee (12-20%) only when you hire. Get candidates in 48 hours. Average placement fee $7,000. Digital RPO process with flexible agency-style terms.",
  keywords: [
    "hire talent fast",
    "recruitment platform for hiring managers",
    "RPO recruitment",
    "digital RPO",
    "hiring platform",
    "recruitment marketplace for employers",
    "contingent recruitment",
    "post jobs for recruiters"
  ],
  openGraph: {
    title: "Hire Talent Faster | RecXchange",
    description: "15,000+ recruiters compete to fill your role. Pay one fee only when you hire. Candidates in 48 hours.",
    url: "https://recxchange.io/hiring-manager-home",
    type: "website"
  },
  alternates: {
    canonical: "https://recxchange.io/hiring-manager-home"
  }
};

export default function HiringManagerHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
