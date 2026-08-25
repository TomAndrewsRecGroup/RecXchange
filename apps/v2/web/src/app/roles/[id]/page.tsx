'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Wallet } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import type { Role } from '@/lib/types';
import { useAuth } from '@/components/AuthProvider';
import { LockedControl } from '@/components/LockedControl';
import { ApplyModal, WorkModal } from '@/components/WorkApply';
import { applyLock, workLock } from '@/lib/entitlements';
import {
  clientIsHidden,
  clientName,
  formatSalary,
  formatSplit,
  kindLabel,
} from '@/lib/format';

export default function RoleDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [workOpen, setWorkOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = user ? await api.role(params.id) : await api.publicRole(params.id);
      setRole(r);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Role not found');
    }
  }, [params.id, user]);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return <p className="text-fuchsia-300">{error}</p>;
  }
  if (!role) {
    return <p className="text-sm text-[var(--rx-faint)]">Loading role…</p>;
  }

  const hidden = clientIsHidden(role);
  const name = clientName(role);
  const apply = applyLock(user, role.kind);
  const work = workLock(user, role.kind);

  return (
    <article data-testid="role-detail" data-kind={role.kind}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
        {kindLabel(role.kind)}
        {role.urgency && role.urgency !== 'standard' ? ` · ${role.urgency}` : ''}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{role.title}</h1>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--rx-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-cyan-400" />
          {role.location || role.city || 'Location TBC'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Wallet className="h-4 w-4 text-fuchsia-400" />
          {formatSalary(role.salary_min, role.salary_max, role.currency || 'GBP')}
        </span>
        {role.kind === 'xchange' && (
          <span className="text-fuchsia-300">
            Split {formatSplit(role.proposed_split_owner_bps, role.proposed_split_partner_bps)}
          </span>
        )}
      </div>

      {role.kind === 'direct' && (
        <p className="mt-4 text-sm" data-testid={hidden ? 'client-hidden' : 'client-name'}>
          {hidden ? (
            <span className="rounded-lg bg-white/5 px-3 py-2 text-[var(--rx-muted)] ring-1 ring-white/10">
              Client hidden until you work this role
            </span>
          ) : (
            <span className="text-cyan-200">Client · {name}</span>
          )}
        </p>
      )}

      <div className="prose-invert mt-6 max-w-3xl text-sm leading-relaxed text-[var(--rx-muted)] whitespace-pre-wrap">
        {role.description || 'No description.'}
      </div>

      {role.must_haves && role.must_haves.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {role.must_haves.map((m) => (
            <li key={m} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white ring-1 ring-white/10">
              {m}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {role.kind === 'direct' && (
          <LockedControl lock={work}>
            <button
              type="button"
              data-testid="work-control"
              onClick={() => setWorkOpen(true)}
              className="rounded-lg bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-400/40"
            >
              Work role
            </button>
          </LockedControl>
        )}
        <LockedControl lock={apply}>
          <button
            type="button"
            data-testid="apply-control"
            onClick={() => setApplyOpen(true)}
            className="rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15"
          >
            Apply
          </button>
        </LockedControl>
      </div>

      {workOpen && (
        <WorkModal
          role={role}
          onClose={() => setWorkOpen(false)}
          onDone={(next) => {
            setRole(next);
            setWorkOpen(false);
          }}
        />
      )}
      {applyOpen && (
        <ApplyModal role={role} onClose={() => setApplyOpen(false)} onDone={() => setApplyOpen(false)} />
      )}
    </article>
  );
}
