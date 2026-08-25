'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import type { Application, Client, PipelineStage, Role } from '@/lib/types';
import { RequireSession } from '@/components/RequireSession';
import { PipelineBoard } from '@/components/PipelineBoard';
import { NotesThread } from '@/components/NotesThread';
import { LockedControl } from '@/components/LockedControl';
import { useAuth } from '@/components/AuthProvider';
import { addLock } from '@/lib/entitlements';
import { kindLabel } from '@/lib/format';

function AddClientForm({ onCreated }: { onCreated: (c: Client) => void }) {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const c = await api.createClient({ name: name.trim(), sector: sector.trim() || undefined });
      onCreated(c);
      setName('');
      setSector('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not add client');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-2" data-testid="add-client-form">
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Client name"
        aria-label="Client name"
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      />
      <input
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        placeholder="Sector"
        aria-label="Sector"
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      />
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-cyan-400/15 py-1.5 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-400/30"
      >
        Save client
      </button>
      {error && <p className="text-xs text-fuchsia-300">{error}</p>}
    </form>
  );
}

function AddRoleForm({
  clients,
  selectedClientId,
  onCreated,
}: {
  clients: Client[];
  selectedClientId: string | null;
  onCreated: (r: Role) => void;
}) {
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<Role['kind']>('direct');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [clientId, setClientId] = useState(selectedClientId ?? '');
  const [ownerBps, setOwnerBps] = useState('5000');
  const [partnerBps, setPartnerBps] = useState('5000');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedClientId) setClientId(selectedClientId);
  }, [selectedClientId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await api.createRole({
        title: title.trim(),
        kind,
        location: location.trim(),
        description: description.trim(),
        salary_min: salaryMin ? Number(salaryMin) : 0,
        salary_max: salaryMax ? Number(salaryMax) : 0,
        currency: 'GBP',
        client_id: clientId || null,
        proposed_split_owner_bps: Number(ownerBps) || 5000,
        proposed_split_partner_bps: Number(partnerBps) || 5000,
        status: 'draft',
      });
      onCreated(r);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not add role');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-2" data-testid="add-role-form">
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Role title"
        aria-label="Role title"
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      />
      <select
        aria-label="Kind"
        value={kind}
        onChange={(e) => setKind(e.target.value as Role['kind'])}
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      >
        <option value="direct">Direct</option>
        <option value="xchange">Xchange</option>
        <option value="referral">Referral</option>
      </select>
      <select
        aria-label="Client"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      >
        <option value="">No client</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        aria-label="Location"
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      />
      <div className="flex gap-2">
        <input
          value={salaryMin}
          onChange={(e) => setSalaryMin(e.target.value)}
          placeholder="Salary min"
          aria-label="Salary min"
          type="number"
          className="w-full rounded-lg px-2 py-1.5 text-sm"
        />
        <input
          value={salaryMax}
          onChange={(e) => setSalaryMax(e.target.value)}
          placeholder="Salary max"
          aria-label="Salary max"
          type="number"
          className="w-full rounded-lg px-2 py-1.5 text-sm"
        />
      </div>
      {kind === 'xchange' && (
        <div className="flex gap-2">
          <input
            value={ownerBps}
            onChange={(e) => setOwnerBps(e.target.value)}
            placeholder="Owner bps"
            aria-label="Owner bps"
            type="number"
            className="w-full rounded-lg px-2 py-1.5 text-sm"
          />
          <input
            value={partnerBps}
            onChange={(e) => setPartnerBps(e.target.value)}
            placeholder="Partner bps"
            aria-label="Partner bps"
            type="number"
            className="w-full rounded-lg px-2 py-1.5 text-sm"
          />
        </div>
      )}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        aria-label="Description"
        rows={3}
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      />
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-fuchsia-500/15 py-1.5 text-xs font-semibold text-fuchsia-200 ring-1 ring-fuchsia-500/30"
      >
        Save role
      </button>
      {error && <p className="text-xs text-fuchsia-300">{error}</p>}
    </form>
  );
}

function AddCandidateForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api.createCandidate({
        display_name: name.trim(),
        headline: headline.trim() || 'Demo candidate',
        source_label: 'demo',
        evidence: 'Demo-labelled. No real employment history.',
        skills: [],
        systems: [],
      });
      setName('');
      setHeadline('');
      onCreated();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not add candidate');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-2" data-testid="add-candidate-form">
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Demo name"
        aria-label="Candidate name"
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      />
      <input
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        placeholder="Headline"
        aria-label="Candidate headline"
        className="w-full rounded-lg px-2 py-1.5 text-sm"
      />
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-purple-500/15 py-1.5 text-xs font-semibold text-purple-200 ring-1 ring-purple-400/30"
      >
        Save candidate
      </button>
      {error && <p className="text-xs text-fuchsia-300">{error}</p>}
    </form>
  );
}

  const { user } = useAuth();
  const lock = addLock(user);
  const [clients, setClients] = useState<Client[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showClientForm, setShowClientForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadClients = useCallback(async () => {
    try {
      setClients(await api.clients());
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not load clients');
    }
  }, []);

  const loadRoles = useCallback(async (clientId: string | null) => {
    try {
      setRoles(await api.roles(clientId ? { client_id: clientId } : undefined));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not load roles');
    }
  }, []);

  const loadPipeline = useCallback(async (roleId: string | null) => {
    if (!roleId) {
      setApps([]);
      return;
    }
    try {
      setApps(await api.pipeline(roleId));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not load pipeline');
    }
  }, []);

  useEffect(() => {
    void loadClients();
    void loadRoles(null);
  }, [loadClients, loadRoles]);

  useEffect(() => {
    void loadRoles(selectedClient);
  }, [selectedClient, loadRoles]);

  useEffect(() => {
    void loadPipeline(selectedRole);
  }, [selectedRole, loadPipeline]);

  const visibleRoles = useMemo(() => {
    if (!selectedClient) return roles;
    return roles.filter((r) => r.client_id === selectedClient || !r.client_id);
  }, [roles, selectedClient]);

  const currentRole = roles.find((r) => r.id === selectedRole) ?? null;

  async function move(id: string, status: PipelineStage) {
    setBusyId(id);
    try {
      await api.setStage(id, status);
      await loadPipeline(selectedRole);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not move card');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div data-testid="ats-workspace">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">ATS</h1>
          <p className="text-sm text-[var(--rx-muted)]">
            Clients left, roles centre, pipeline on the right. Notes sit under the board.
          </p>
        </div>
      </div>
      {error && <p className="mb-3 text-sm text-fuchsia-300">{error}</p>}

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.4fr)]">
        <aside className="rx-card rounded-2xl p-3" data-testid="ats-clients">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--rx-faint)]">
              Clients
            </h2>
            <LockedControl lock={lock}>
              <button
                type="button"
                data-testid="add-client"
                onClick={() => setShowClientForm((v) => !v)}
                className="rounded-md p-1 text-cyan-300 hover:bg-white/5"
                aria-label="Add client"
              >
                <Plus className="h-4 w-4" />
              </button>
            </LockedControl>
          </div>
          <button
            type="button"
            onClick={() => setSelectedClient(null)}
            className={`mt-2 w-full rounded-lg px-2 py-1.5 text-left text-sm ${
              !selectedClient ? 'bg-white/10 text-white' : 'text-[var(--rx-muted)]'
            }`}
          >
            All clients
          </button>
          <ul className="mt-1 space-y-1">
            {clients.map((c) => (
              <li key={c.id}>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedClient(c.id)}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-left text-sm ${
                      selectedClient === c.id ? 'bg-cyan-400/15 text-cyan-100' : 'text-[var(--rx-muted)]'
                    }`}
                  >
                    {c.name}
                  </button>
                  <Link href={`/ats/clients/${c.id}`} className="px-1 text-[10px] text-[var(--rx-faint)]">
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          {showClientForm && (
            <AddClientForm
              onCreated={(c) => {
                setClients((prev) => [...prev, c]);
                setSelectedClient(c.id);
                setShowClientForm(false);
              }}
            />
          )}
        </aside>

        <section className="rx-card rounded-2xl p-3" data-testid="ats-roles">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--rx-faint)]">
              Roles
            </h2>
            <LockedControl lock={lock}>
              <button
                type="button"
                data-testid="add-role"
                onClick={() => setShowRoleForm((v) => !v)}
                className="rounded-md p-1 text-fuchsia-300 hover:bg-white/5"
                aria-label="Add role"
              >
                <Plus className="h-4 w-4" />
              </button>
            </LockedControl>
          </div>
          <ul className="mt-2 space-y-1">
            {visibleRoles.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  data-testid="ats-role-row"
                  data-kind={r.kind}
                  onClick={() => setSelectedRole(r.id)}
                  className={`w-full rounded-lg px-2 py-2 text-left ${
                    selectedRole === r.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <p className="text-sm font-medium text-white">{r.title}</p>
                  <p className="text-[11px] text-[var(--rx-faint)]">
                    {kindLabel(r.kind)} · {r.status || 'draft'}
                  </p>
                </button>
                <Link
                  href={`/ats/roles/${r.id}`}
                  data-testid="ats-role-edit"
                  data-kind={r.kind}
                  className="ml-2 text-[10px] uppercase tracking-wider text-cyan-400/80"
                >
                  Edit
                </Link>
              </li>
            ))}
            {visibleRoles.length === 0 && (
              <li className="px-2 py-4 text-sm text-[var(--rx-faint)]">No roles yet.</li>
            )}
          </ul>
          {showRoleForm && (
            <AddRoleForm
              clients={clients}
              selectedClientId={selectedClient}
              onCreated={(r) => {
                setRoles((prev) => [r, ...prev]);
                setSelectedRole(r.id);
                setShowRoleForm(false);
              }}
            />
          )}
        </section>

        <section className="min-w-0" data-testid="ats-pipeline">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--rx-faint)]">
            Pipeline {currentRole ? `· ${currentRole.title}` : ''}
          </h2>
          {selectedRole ? (
            <PipelineBoard applications={apps} onMove={move} busyId={busyId} />
          ) : (
            <p className="rounded-xl bg-white/[0.03] p-6 text-sm text-[var(--rx-faint)] ring-1 ring-white/10">
              Select a role to see the pipeline.
            </p>
          )}
        </section>
      </div>

      {selectedRole && (
        <div className="mt-4">
          <NotesThread entityType="role" entityId={selectedRole} />
        </div>
      )}
    </div>
  );
}

export default function AtsPage() {
  return (
    <RequireSession>
      <AtsWorkspace />
    </RequireSession>
  );
}
