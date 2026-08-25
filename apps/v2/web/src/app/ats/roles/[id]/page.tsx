'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import type { Application, PipelineStage, Role } from '@/lib/types';
import { RequireSession } from '@/components/RequireSession';
import { PipelineBoard } from '@/components/PipelineBoard';
import { FrictionMeters } from '@/components/FrictionMeters';
import { NotesThread } from '@/components/NotesThread';
import { frictionFromRole } from '@/lib/format';
import { previewFriction } from '@/lib/friction-preview';
import type { FrictionReport } from '@/lib/types';

function RoleEditor() {
  const params = useParams<{ id: string }>();
  const [role, setRole] = useState<Role | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [mustHaves, setMustHaves] = useState('');
  const [ownerBps, setOwnerBps] = useState('5000');
  const [partnerBps, setPartnerBps] = useState('5000');
  const [status, setStatus] = useState('draft');

  const load = useCallback(async () => {
    try {
      const r = await api.role(params.id);
      setRole(r);
      setTitle(r.title ?? '');
      setDescription(r.description ?? '');
      setLocation(r.location ?? r.city ?? '');
      setSalaryMin(r.salary_min ? String(r.salary_min) : '');
      setSalaryMax(r.salary_max ? String(r.salary_max) : '');
      setMustHaves((r.must_haves ?? []).join(', '));
      setOwnerBps(String(r.proposed_split_owner_bps ?? 5000));
      setPartnerBps(String(r.proposed_split_partner_bps ?? 5000));
      setStatus(String(r.status ?? 'draft'));
      setApps(await api.pipeline(params.id));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Role not found');
    }
  }, [params.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const draftFields = useMemo(
    () => ({
      title,
      description,
      location,
      salary_min: salaryMin ? Number(salaryMin) : 0,
      salary_max: salaryMax ? Number(salaryMax) : 0,
      must_haves: mustHaves
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      proposed_split_owner_bps: Number(ownerBps) || 0,
      proposed_split_partner_bps: Number(partnerBps) || 0,
      role_kind: role?.kind,
    }),
    [title, description, location, salaryMin, salaryMax, mustHaves, ownerBps, partnerBps, role?.kind],
  );

  const livePreview: FrictionReport = useMemo(
    () => previewFriction(draftFields),
    [draftFields],
  );

  const persisted = role ? frictionFromRole(role) : {};
  const report: FrictionReport =
    persisted.advert_score !== undefined || (persisted.findings && persisted.findings.length > 0)
      ? persisted
      : livePreview;
  const usingPreview =
    persisted.advert_score === undefined &&
    !(persisted.findings && persisted.findings.length > 0);

  const verdict = report.verdict ?? livePreview.verdict;
  const blocked = verdict === 'block';
  const warned = verdict === 'warn';

  async function save(): Promise<Role | null> {
    const body = {
      title,
      description,
      location,
      salary_min: salaryMin ? Number(salaryMin) : 0,
      salary_max: salaryMax ? Number(salaryMax) : 0,
      must_haves: draftFields.must_haves,
      proposed_split_owner_bps: Number(ownerBps) || 0,
      proposed_split_partner_bps: Number(partnerBps) || 0,
      status,
    };
    const next = await api.patchRole(params.id, body);
    setRole(next);
    return next;
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await save();
      setMessage('Saved as draft.');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function onScore() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await save();
      const scored = await api.scoreRole(params.id, {
        title,
        description,
        location,
        salary_min: salaryMin ? Number(salaryMin) : 0,
        salary_max: salaryMax ? Number(salaryMax) : 0,
        must_haves: draftFields.must_haves,
        proposed_owner_bps: Number(ownerBps) || 0,
        proposed_partner_bps: Number(partnerBps) || 0,
        role_kind: role?.kind,
      });
      setRole(scored);
      setMessage('Scored. Meters reflect the latest save.');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Score failed');
    } finally {
      setBusy(false);
    }
  }

  async function onPublish() {
    if (blocked) return;
    if (warned && !window.confirm('Friction is on warn. Publish anyway?')) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await save();
      const { role: next, friction } = await api.publishRole(params.id);
      setRole({
        ...next,
        friction_report: friction ?? next.friction_report,
        friction_advert_score: friction?.advert_score ?? next.friction_advert_score,
        friction_split_score: friction?.split_score ?? next.friction_split_score,
        friction_verdict: friction?.verdict ?? next.friction_verdict,
      });
      setStatus('open');
      setMessage('Published.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 422) {
        setError(err.message);
        if (err.findings && role) {
          setRole({
            ...role,
            friction_report: { findings: err.findings, verdict: 'block' },
          });
        }
      } else {
        setError(err instanceof ApiError ? err.message : 'Publish failed');
      }
    } finally {
      setBusy(false);
    }
  }

  async function move(id: string, stage: PipelineStage) {
    setBusyId(id);
    try {
      await api.setStage(id, stage);
      setApps(await api.pipeline(params.id));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not move card');
    } finally {
      setBusyId(null);
    }
  }

  if (!role && !error) return <p className="text-sm text-[var(--rx-faint)]">Loading role…</p>;
  if (!role) return <p className="text-fuchsia-300">{error}</p>;

  const isXchange = role.kind === 'xchange';

  return (
    <div data-testid="ats-role-detail" data-kind={role.kind}>
      <Link href="/ats" className="text-xs uppercase tracking-wider text-cyan-400">
        ← ATS
      </Link>
      <h1 className="mt-2 font-display text-3xl font-bold text-white">{role.title}</h1>
      <p className="mt-1 text-sm text-[var(--rx-muted)]">
        {role.kind} · {status}
      </p>

      <div className={`mt-6 grid gap-6 ${isXchange ? 'lg:grid-cols-[minmax(0,1fr)_360px]' : ''}`}>
        <form onSubmit={onSave} className="rx-card space-y-3 rounded-2xl p-5">
          <label className="block text-sm text-[var(--rx-muted)]">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm text-[var(--rx-muted)]">
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <div className="flex gap-3">
            <label className="block flex-1 text-sm text-[var(--rx-muted)]">
              Salary min
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
              />
            </label>
            <label className="block flex-1 text-sm text-[var(--rx-muted)]">
              Salary max
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
              />
            </label>
          </div>
          {isXchange && (
            <div className="flex gap-3">
              <label className="block flex-1 text-sm text-[var(--rx-muted)]">
                Owner bps
                <input
                  type="number"
                  value={ownerBps}
                  onChange={(e) => setOwnerBps(e.target.value)}
                  className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
                />
              </label>
              <label className="block flex-1 text-sm text-[var(--rx-muted)]">
                Partner bps
                <input
                  type="number"
                  value={partnerBps}
                  onChange={(e) => setPartnerBps(e.target.value)}
                  className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
                />
              </label>
            </div>
          )}
          <label className="block text-sm text-[var(--rx-muted)]">
            Must-haves (comma separated)
            <input
              value={mustHaves}
              onChange={(e) => setMustHaves(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm text-[var(--rx-muted)]">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15"
            >
              Save draft
            </button>
            {isXchange && (
              <button
                type="button"
                data-testid="score-role"
                disabled={busy}
                onClick={() => void onScore()}
                className="rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-100 ring-1 ring-purple-400/40"
              >
                Score
              </button>
            )}
            <button
              type="button"
              data-testid="publish-role"
              disabled={busy || (isXchange && blocked)}
              onClick={() => void onPublish()}
              className="rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Publish
            </button>
          </div>
          {isXchange && blocked && (
            <p className="text-sm text-fuchsia-300">Publish disabled — Friction is on block.</p>
          )}
          {message && <p className="text-sm text-emerald-300">{message}</p>}
          {error && <p className="text-sm text-fuchsia-300">{error}</p>}
        </form>

        {isXchange && <FrictionMeters report={report} preview={usingPreview} />}
      </div>

      <h2 className="mt-8 font-display text-lg font-semibold text-white">Pipeline</h2>
      <div className="mt-3">
        <PipelineBoard applications={apps} onMove={move} busyId={busyId} />
      </div>
      <div className="mt-6">
        <NotesThread entityType="role" entityId={role.id} />
      </div>
    </div>
  );
}

export default function AtsRolePage() {
  return (
    <RequireSession>
      <RoleEditor />
    </RequireSession>
  );
}
