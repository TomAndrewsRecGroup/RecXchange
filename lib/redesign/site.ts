/**
 * Single source of truth for the redesigned marketing site:
 * external app links, contact details, and headline platform stats.
 */

export const APP_REGISTER_URL =
  'https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC';
export const APP_LOGIN_URL =
  'https://app.recxchange.io?trigger_link=Hc9mpfL0JxjX06kwNpd1';

export const SUPPORT_EMAIL = 'support@recxchange.io';

export const SITE_URL = 'https://recxchange.io';

/** Headline platform stats used across pages — update in one place. */
export const STATS = {
  recruiters: '15,000+',
  candidates: '270M',
  liveFees: '$750K+',
  liveRoles: '100+',
  avgPlacement: '$7,000',
  maxSplit: '70%',
} as const;

export const NAV_LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/roles', label: 'Live roles' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/for-employers', label: 'For employers' },
  { href: '/blog', label: 'Blog' },
] as const;
