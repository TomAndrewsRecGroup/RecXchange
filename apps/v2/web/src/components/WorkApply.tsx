'use client';

import { useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { Candidate, Role } from '@/lib/types';

export function WorkModal({
  role,
  onClose,
  onDone,
}: {
  role: Role;
  onClose: () => void;
  onDone: (role: Role) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function accept() {
    setBusy(true);
    setError(null);
    try {
      const next = await api.workRole(role.id);
      onDone(next);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not work this role');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center" role="dialog" aria-modal="true">
      <div data-testid="terms-modal" className="rx-card w-full max-w-lg rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold text-white">Work role</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--rx-muted)]">
          You accept RecXchange terms for this Direct role. Client identity is
          revealed after you accept. Ownership and split terms apply from that
          timestamp.
        </p>
        <p className="mt-3 text-sm text-[var(--rx-faint)]">
          Role: <span className="text-white">{role.title}</span>
        </p>
        {error && <p className="mt-3 text-sm text-fuchsia-300">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-sm text-[var(--rx-muted)]">
            Cancel
          </button>
          <button
            type="button"
            data-testid="accept-work"
            disabled={busy}
            onClick={() => void accept()}
            className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-400/50 disabled:opacity-50"
          >
            Accept and work this role
          </button>
        </div>
      </div>
    </div>
  );
}

export function ApplyModal({
  role,
  onClose,
  onDone,
}: {
  role: Role;
  onClose: () => void;
  onDone: () => void;
}) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    api
      .candidates()
      .then(setCandidates)
      .catch((e) => setError(e instanceof ApiError ? e.message : 'Could not load candidates'));
  }, []);

  async function addDemo() {
    if (!newName.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const c = await api.createCandidate({
        display_name: newName.trim(),
        headline: 'Demo candidate',
        source_label: 'demo',
        evidence: 'Demo-labelled. No real employment history.',
        skills: [],
        systems: [],
      });
      setCandidates((prev) => [...prev, c]);
      setSelected(c.id);
      setNewName('');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not add candidate');
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!selected) {
      setError('Pick a candidate');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await api.apply(role.id, { candidate_id: selected });
      setOk('Submitted. Split agreement stamped.');
      setTimeout(onDone, 700);
    } catch (e) {
      if (e instanceof ApiError && e.code === 'PLAN_GATE_REFERRAL') {
        setError('Referral is locked on Entry. Upgrade to Lite.');
      } else {
        setError(e instanceof ApiError ? e.message : 'Apply failed');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center" role="dialog" aria-modal="true">
      <div data-testid="apply-modal" className="rx-card w-full max-w-lg rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold text-white">Apply</h2>
        <p className="mt-1 text-sm text-[var(--rx-muted)]">
          Submit a candidate you own. Timestamp and split land before details move.
        </p>
        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-[var(--rx-faint)]">
          Candidate
          <select
            className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            aria-label="Candidate"
          >
            <option value="">Select…</option>
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.display_name}
                {c.source_label ? ` · ${c.source_label}` : ''}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-3 flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Add demo candidate"
            aria-label="New demo candidate name"
            className="flex-1 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => void addDemo()}
            className="rounded-lg px-3 py-2 text-sm text-cyan-200 ring-1 ring-cyan-400/30"
          >
            Add
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-fuchsia-300">{error}</p>}
        {ok && <p className="mt-3 text-sm text-emerald-300">{ok}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-sm text-[var(--rx-muted)]">
            Cancel
          </button>
          <button
            type="button"
            data-testid="submit-apply"
            disabled={busy}
            onClick={() => void submit()}
            className="rounded-lg bg-fuchsia-500/20 px-4 py-2 text-sm font-semibold text-fuchsia-100 ring-1 ring-fuchsia-500/40 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
