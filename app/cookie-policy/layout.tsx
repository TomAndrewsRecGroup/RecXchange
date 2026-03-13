import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Cookie Policy | RecXchange",
  description: "RecXchange Cookie Policy. What cookies we use, why, and how to manage your cookie preferences.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
