import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Terms of Service | RecXchange",
  description: "RecXchange Terms of Service. The rules, rights, and responsibilities governing use of the RecXchange platform by recruiters and hiring managers.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
