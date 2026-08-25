'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { AuditEntry, Automation, Plan, User } from '@/lib/types';
import { RequireSession } from '@/components/RequireSession';
import { relativeTime } from '@/lib/format';

type Tab = 'users' | 'plans' | 'automations' | 'audit';

function AdminHome() {
  const [tab, setTab] = useState<Tab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [u, a, l] = await Promise.all([
        api.adminUsers(),
        api.automations(),
        api.adminAudit(),
      ]);
      setUsers(u);
      setAutomations(a);
      setAudit(l);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Admin load failed');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function changePlan(id: string, plan: Plan) {
    try {
      const next = await api.adminPatchUser(id, { plan });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...next, plan } : u)));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not change plan');
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'users', label: 'Users' },
    { id: 'plans', label: 'Plans' },
    { id: 'automations', label: 'Automations' },
    { id: 'audit', label: 'Audit' },
  ];

  return (
    <div data-testid="admin-page">
      <h1 className="font-display text-3xl font-bold text-white">Admin</h1>
      <p className="mt-1 text-sm text-[var(--rx-muted)]">
        Users, plans, automations log, audit trail. Server still checks is_admin.
      </p>
      {error && <p className="mt-3 text-sm text-fuchsia-300">{error}</p>}

      <div className="mt-6 flex gap-1 rounded-xl bg-white/[0.03] p-1 ring-1 ring-white/10" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            data-testid={`admin-tab-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
              tab === t.id ? 'bg-cyan-400/15 text-cyan-100' : 'text-[var(--rx-muted)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'users' && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm" data-testid="admin-users">
            <thead className="text-xs uppercase tracking-wider text-[var(--rx-faint)]">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Plan</th>
                <th className="px-3 py-2">Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-white/10">
                  <td className="px-3 py-2 text-white">{u.name}</td>
                  <td className="px-3 py-2 text-[var(--rx-muted)]">{u.email}</td>
                  <td className="px-3 py-2">
                    <select
                      aria-label={`Plan for ${u.email}`}
                      value={u.plan}
                      onChange={(e) => void changePlan(u.id, e.target.value as Plan)}
                      className="rounded-md px-2 py-1 text-sm"
                    >
                      <option value="entry">Entry</option>
                      <option value="lite">Lite</option>
                      <option value="pro">Pro</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-[var(--rx-muted)]">{u.is_admin ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'plans' && (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              name: 'Entry',
              price: '$1 / month',
              points: ['Direct — 50/50 with RecXchange', 'Xchange access', 'No Referral apply / post'],
            },
            {
              name: 'Lite',
              price: '$59 / month',
              points: ['Direct — 70 recruiter / 30 RecXchange', 'Xchange access', 'Referral — 50/50 with RecXchange'],
            },
            {
              name: 'Pro',
              price: '$149 / month',
              points: ['Direct — recruiter keeps 100%', 'Xchange access', 'Referral — recruiter keeps 100%'],
            },
          ].map((p) => (
            <article key={p.name} className="rx-card rounded-2xl p-5">
              <h2 className="font-display text-xl font-semibold text-white">{p.name}</h2>
              <p className="mt-1 text-cyan-300">{p.price}</p>
              <ul className="mt-3 space-y-1 text-sm text-[var(--rx-muted)]">
                {p.points.map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      {tab === 'automations' && (
        <ul className="mt-4 space-y-2" data-testid="admin-automations">
          {automations.length === 0 && (
            <li className="text-sm text-[var(--rx-faint)]">No automations logged.</li>
          )}
          {automations.map((a) => (
            <li key={a.id} className="rx-card rounded-xl px-4 py-3">
              <p className="text-sm font-medium text-white">{a.type}</p>
              <p className="text-xs text-[var(--rx-faint)]">
                {a.status} · {relativeTime(a.created_at)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {tab === 'audit' && (
        <ul className="mt-4 space-y-2" data-testid="admin-audit">
          {audit.length === 0 && <li className="text-sm text-[var(--rx-faint)]">No audit rows.</li>}
          {audit.map((row, i) => (
            <li key={row.id ?? i} className="rx-card rounded-xl px-4 py-3">
              <p className="text-sm text-white">{row.action}</p>
              <p className="text-xs text-[var(--rx-faint)]">
                {row.actor_email || row.actor_id} · {row.entity_type} {row.entity_id} ·{' '}
                {relativeTime(row.created_at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <RequireSession admin>
      <AdminHome />
    </RequireSession>
  );
}
