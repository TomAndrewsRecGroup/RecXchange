import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "GDPR Compliance | RecXchange",
  description: "RecXchange GDPR compliance information. Your rights under the General Data Protection Regulation and how RecXchange upholds them.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function GdprLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
