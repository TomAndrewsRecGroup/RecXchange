import type { Metadata } from 'next';
import { Marketplace } from '@/components/Marketplace';

export const metadata: Metadata = {
  title: 'Marketplace',
};

export default function HomePage() {
  return <Marketplace />;
}
