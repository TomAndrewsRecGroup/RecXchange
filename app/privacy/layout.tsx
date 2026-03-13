import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Privacy Policy | RecXchange",
  description: "RecXchange Privacy Policy. How we collect, use, and protect your personal data in compliance with GDPR, UK GDPR, and applicable data protection law.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
