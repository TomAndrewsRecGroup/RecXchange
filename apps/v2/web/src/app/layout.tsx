import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter, Lexend } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { Shell } from '@/components/Shell';
import type { User } from '@/lib/types';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RecXchange v2',
    template: '%s · RecXchange v2',
  },
  description:
    'Open split-fee marketplace. Direct, Xchange and Referral roles. Work and apply after you log in.',
};

async function fetchMe(): Promise<User | null> {
  const base =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  try {
    const jar = await cookies();
    const token = jar.get('recx_session')?.value;
    const headers: HeadersInit = { Accept: 'application/json' };
    if (token) headers.Cookie = `recx_session=${token}`;
    const res = await fetch(`${base}/v1/auth/me`, {
      headers,
      cache: 'no-store',
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    const raw = ((data.user as Record<string, unknown>) ?? data) as Record<string, unknown>;
    if (!raw.email) return null;
    return {
      id: String(raw.id ?? ''),
      email: String(raw.email),
      name: String(raw.name ?? raw.email),
      plan: (String(raw.plan ?? 'entry') as User['plan']) || 'entry',
      is_admin: Boolean(raw.is_admin),
    };
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchMe();
  return (
    <html lang="en-GB" className={`${lexend.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider initialUser={user}>
          <Shell>{children}</Shell>
        </AuthProvider>
      </body>
    </html>
  );
}
