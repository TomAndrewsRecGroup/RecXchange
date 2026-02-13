// Trust & protection information section for the RecXchange site

import { ShieldCheck, UserCheck, FileCheck, AlertTriangle } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Transparent contracts',
    description:
      'Every collaboration is governed by a standard contract outlining the split, payment terms and dispute resolution.',
  },
  {
    icon: FileCheck,
    title: 'Escrow protection',
    description:
      'Split fees are held in escrow until both parties confirm successful placement, protecting everyone involved.',
  },
  {
    icon: UserCheck,
    title: 'Verified recruiters',
    description:
      'All recruiters on the network are vetted for compliance, experience and ethical practice.',
  },
  {
    icon: AlertTriangle,
    title: 'AI‑driven monitoring',
    description:
      'Our platform continuously monitors engagements to detect anomalies and enforce fair play.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Trust & Protection
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center p-4">
              <Icon className="w-10 h-10 text-blue-600 mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}