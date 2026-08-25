'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { PublicStats, Role, RoleKind } from '@/lib/types';
import { ROLE_KINDS } from '@/lib/types';
import { kindLabel } from '@/lib/format';
import { RoleCard } from './RoleCard';
import { ApplyModal, WorkModal } from './WorkApply';
import { useAuth } from './AuthProvider';

export function Marketplace() {
  const { user } = useAuth();
  const [kind, setKind] = useState<RoleKind | 'all'>('direct');
  const [roles, setRoles] = useState<Role[]>([]);
  const [stats, setStats] = useState<PublicStats>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState<Role | null>(null);
  const [apply, setApply] = useState<Role | null>(null);

  const load = useCallback(async (k: RoleKind | 'all') => {
    setLoading(true);
    setError(null);
    try {
      const list = await api.publicRoles(k === 'all' ? undefined : k);
      setRoles(list);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Marketplace is unreachable');
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void api.stats().then(setStats);
  }, []);

  useEffect(() => {
    void load(kind);
  }, [kind, load]);

  const counts = useMemo(
    () => ({
      direct: stats.direct,
      xchange: stats.xchange,
      referral: stats.referral,
    }),
    [stats],
  );

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 rx-pulse" />
          Open marketplace
        </p>
        <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
          Live roles.{' '}
          <span className="grad-text">Visible to everyone.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--rx-muted)]">
          Direct, Xchange and Referral on one board. Guests can read every
          advert. Work and Apply stay locked until you log in.
        </p>
        <dl className="mt-6 flex flex-wrap gap-6 text-sm">
          <div>
            <dt className="text-[var(--rx-faint)]">Open roles</dt>
            <dd className="font-display text-2xl font-bold text-white tabular-nums">
              {stats.open_roles ?? stats.roles ?? roles.length}
            </dd>
          </div>
          {ROLE_KINDS.map((k) => (
            <div key={k}>
              <dt className="text-[var(--rx-faint)]">{kindLabel(k)}</dt>
              <dd className="font-display text-2xl font-bold text-white tabular-nums">
                {counts[k] ?? '—'}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        role="tablist"
        aria-label="Role kind"
        data-testid="kind-tabs"
        className="mb-6 flex gap-1 rounded-xl bg-white/[0.03] p-1 ring-1 ring-white/10"
      >
        {ROLE_KINDS.map((k) => {
          const selected = kind === k;
          return (
            <button
              key={k}
              role="tab"
              aria-selected={selected}
              data-testid={`tab-${k}`}
              onClick={() => setKind(k)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                selected
                  ? k === 'direct'
                    ? 'bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-400/40'
                    : k === 'xchange'
                      ? 'bg-fuchsia-500/15 text-fuchsia-100 ring-1 ring-fuchsia-500/40'
                      : 'bg-purple-500/15 text-purple-100 ring-1 ring-purple-400/40'
                  : 'text-[var(--rx-muted)] hover:text-white'
              }`}
            >
              {kindLabel(k)}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-fuchsia-500/10 px-3 py-2 text-sm text-fuchsia-200">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-[var(--rx-faint)]">Loading roles…</p>
      ) : roles.length === 0 ? (
        <p className="text-sm text-[var(--rx-muted)]">No open {kindLabel(kind)} roles.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onWork={user ? setWork : undefined}
              onApply={user ? setApply : undefined}
            />
          ))}
        </div>
      )}

      {work && (
        <WorkModal
          role={work}
          onClose={() => setWork(null)}
          onDone={(next) => {
            setRoles((prev) => prev.map((r) => (r.id === next.id ? { ...r, ...next } : r)));
            setWork(null);
          }}
        />
      )}
      {apply && (
        <ApplyModal role={apply} onClose={() => setApply(null)} onDone={() => setApply(null)} />
      )}
    </div>
  );
}
