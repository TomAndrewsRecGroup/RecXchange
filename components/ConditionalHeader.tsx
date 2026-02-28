"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on root page only
  if (pathname === '/') {
    return null;
  }
  
  return <Header />;
}
