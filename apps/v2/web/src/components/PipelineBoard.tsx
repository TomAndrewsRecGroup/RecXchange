'use client';

import { useMemo, useState } from 'react';
import { PIPELINE_STAGES, type Application, type PipelineStage } from '@/lib/types';
import { cn, stageLabel } from '@/lib/format';

export function PipelineBoard({
  applications,
  onMove,
  busyId,
}: {
  applications: Application[];
  onMove: (id: string, status: PipelineStage) => Promise<void> | void;
  busyId?: string | null;
}) {
  const [dragging, setDragging] = useState<string | null>(null);

  const columns = useMemo(() => {
    const map: Record<string, Application[]> = {};
    for (const s of PIPELINE_STAGES) map[s] = [];
    for (const app of applications) {
      const key = (app.status || 'applied').toLowerCase();
      if (!map[key]) map[key] = [];
      map[key].push(app);
    }
    return map;
  }, [applications]);

  return (
    <div
      data-testid="pipeline-board"
      className="grid auto-cols-[minmax(180px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-2"
    >
      {PIPELINE_STAGES.map((stage) => (
        <div
          key={stage}
          data-testid={`pipeline-col-${stage}`}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain') || dragging;
            if (id) void onMove(id, stage);
            setDragging(null);
          }}
          className="min-h-[220px] rounded-xl bg-white/[0.03] p-2 ring-1 ring-white/10"
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--rx-muted)]">
              {stageLabel(stage)}
            </h3>
            <span className="text-[11px] tabular-nums text-[var(--rx-faint)]">
              {columns[stage]?.length ?? 0}
            </span>
          </div>
          <div className="space-y-2">
            {(columns[stage] ?? []).map((app) => {
              const name =
                app.candidate?.display_name ||
                `Candidate ${app.candidate_id.slice(0, 8)}`;
              return (
                <article
                  key={app.id}
                  draggable
                  data-testid="pipeline-card"
                  data-application-id={app.id}
                  onDragStart={(e) => {
                    setDragging(app.id);
                    e.dataTransfer.setData('text/plain', app.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  className={cn(
                    'cursor-grab rounded-lg bg-[#0a0a0f] p-3 ring-1 ring-white/10',
                    busyId === app.id && 'opacity-60',
                  )}
                >
                  <p className="text-sm font-medium text-white">{name}</p>
                  {app.candidate?.headline && (
                    <p className="mt-0.5 line-clamp-2 text-xs text-[var(--rx-faint)]">
                      {app.candidate.headline}
                    </p>
                  )}
                  <label className="mt-2 block text-[10px] uppercase tracking-wider text-[var(--rx-faint)]">
                    Move
                    <select
                      aria-label={`Move ${name}`}
                      className="mt-1 w-full rounded-md px-2 py-1 text-xs"
                      value={stage}
                      disabled={busyId === app.id}
                      onChange={(e) => void onMove(app.id, e.target.value as PipelineStage)}
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s} value={s}>
                          {stageLabel(s)}
                        </option>
                      ))}
                    </select>
                  </label>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
