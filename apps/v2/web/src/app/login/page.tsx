'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const user = await api.login(email.trim(), password);
      setUser(user);
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Log in failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md pt-8">
      <h1 className="font-display text-3xl font-bold text-white">Log in</h1>
      <p className="mt-2 text-sm text-[var(--rx-muted)]">
        Returns you to the marketplace. Plans gate Direct, Xchange and Referral.
      </p>
      <form onSubmit={onSubmit} className="rx-card mt-6 space-y-4 rounded-2xl p-6" data-testid="login-form">
        <label className="block text-sm font-medium text-[var(--rx-muted)]" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-sm font-medium text-[var(--rx-muted)]" htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm text-white"
          />
        </label>
        {error && (
          <p className="text-sm text-fuchsia-300" data-testid="login-error">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-cyan-400/20 py-2.5 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-400/50 disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-4 text-xs text-[var(--rx-faint)]">
        Prototype accounts live in the v2 README. Passwords are not shown here.
      </p>
    </div>
  );
}
