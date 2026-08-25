'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import type { Client, Role } from '@/lib/types';
import { RequireSession } from '@/components/RequireSession';
import { NotesThread } from '@/components/NotesThread';
import { kindLabel } from '@/lib/format';

function ClientDetail() {
  const params = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const c = await api.client(params.id);
      setClient(c);
      setName(c.name);
      setSector(c.sector ?? '');
      setRoles(await api.roles({ client_id: params.id }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Client not found');
    }
  }, [params.id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const next = await api.patchClient(params.id, { name, sector });
      setClient(next);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  if (!client && !error) {
    return <p className="text-sm text-[var(--rx-faint)]">Loading client…</p>;
  }
  if (!client) return <p className="text-fuchsia-300">{error}</p>;

  return (
    <div data-testid="client-detail">
      <Link href="/ats" className="text-xs uppercase tracking-wider text-cyan-400">
        ← ATS
      </Link>
      <h1 className="mt-2 font-display text-3xl font-bold text-white">{client.name}</h1>
      <form onSubmit={save} className="rx-card mt-6 max-w-lg space-y-3 rounded-2xl p-5">
        <label className="block text-sm text-[var(--rx-muted)]">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm text-[var(--rx-muted)]">
          Sector
          <input
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-400/40"
        >
          Save
        </button>
        {error && <p className="text-sm text-fuchsia-300">{error}</p>}
      </form>

      <h2 className="mt-8 font-display text-lg font-semibold text-white">Roles</h2>
      <ul className="mt-3 space-y-2">
        {roles.map((r) => (
          <li key={r.id}>
            <Link
              href={`/ats/roles/${r.id}`}
              className="rx-card block rounded-xl px-4 py-3 hover:border-white/20"
            >
              <p className="text-sm font-medium text-white">{r.title}</p>
              <p className="text-xs text-[var(--rx-faint)]">
                {kindLabel(r.kind)} · {r.status || 'draft'}
              </p>
            </Link>
          </li>
        ))}
        {roles.length === 0 && <li className="text-sm text-[var(--rx-faint)]">No roles for this client.</li>}
      </ul>

      <div className="mt-8">
        <NotesThread entityType="client" entityId={client.id} />
      </div>
    </div>
  );
}

export default function AtsClientPage() {
  return (
    <RequireSession>
      <ClientDetail />
    </RequireSession>
  );
}
