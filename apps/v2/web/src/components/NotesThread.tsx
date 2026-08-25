'use client';

import { useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import { relativeTime } from '@/lib/format';
import type { Note } from '@/lib/types';

export function NotesThread({
  entityType,
  entityId,
}: {
  entityType: string;
  entityId: string;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setNotes(await api.notes(entityType, entityId));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not load notes');
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const note = await api.addNote({
        entity_type: entityType,
        entity_id: entityId,
        body: body.trim(),
      });
      setNotes((prev) => [...prev, note]);
      setBody('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not add note');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section data-testid="notes-thread" className="rx-card rounded-2xl p-4">
      <h2 className="font-display text-base font-semibold text-white">Notes</h2>
      <ol className="mt-3 max-h-64 space-y-3 overflow-y-auto">
        {notes.length === 0 && (
          <li className="text-sm text-[var(--rx-faint)]">No notes yet.</li>
        )}
        {notes.map((n) => (
          <li key={n.id} className="rounded-lg bg-white/[0.03] p-3">
            <p className="text-sm leading-relaxed text-[var(--rx-muted)]">{n.body}</p>
            <p className="mt-1 text-[11px] text-[var(--rx-faint)]">
              {n.author_name || 'You'} · {relativeTime(n.created_at)}
            </p>
          </li>
        ))}
      </ol>
      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a note"
          aria-label="Add a note"
          className="flex-1 rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={busy || !body.trim()}
          className="rounded-lg bg-cyan-400/15 px-3 py-2 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/40 disabled:opacity-50"
        >
          Add
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-fuchsia-300">{error}</p>}
    </section>
  );
}
