import Image from 'next/image';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/redesign/site';

const columns = [
  {
    heading: 'Platform',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/roles', label: 'Live roles' },
      { href: '/earn-more-as-a-recruiter', label: 'Earn more' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/why-recxchange', label: 'Why RecXchange' },
    ],
  },
  {
    heading: 'Employers',
    links: [
      { href: '/for-employers', label: 'Hire with RecXchange' },
      { href: '/compare', label: 'Compare options' },
      { href: '/contact', label: 'Contact us' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
      { href: '/glossary', label: 'Glossary' },
      { href: '/split-fee-agreement-template', label: 'Agreement template' },
      { href: `mailto:${SUPPORT_EMAIL}`, label: SUPPORT_EMAIL },
    ],
  },
];

const legal = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookies' },
  { href: '/gdpr', label: 'GDPR' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--rx-line)] bg-[rgba(6,3,18,0.85)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="inline-block" aria-label="RecXchange home">
              <Image
                src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png"
                alt="RecXchange"
                width={150}
                height={40}
                className="w-[140px] h-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--rx-muted)]">
              The split-fee recruitment marketplace where 15,000+ recruiters
              partner on placements and get paid automatically.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--rx-faint)]">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) =>
                  link.href.startsWith('mailto:') ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--rx-muted)] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--rx-muted)] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--rx-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--rx-faint)]">
            © {new Date().getFullYear()} RecXchange Portal LLC t/a RecXchange.
            All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            {legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-[var(--rx-faint)] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
