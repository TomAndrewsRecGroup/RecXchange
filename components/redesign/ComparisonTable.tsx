import Reveal from '@/components/redesign/Reveal';

export interface ComparisonRow {
  label: string;
  recxchange: string;
  other: string;
}

/**
 * Two-column comparison table used across /compare pages.
 * Server component — no interactivity needed.
 */
export default function ComparisonTable({
  otherName,
  rows,
}: {
  otherName: string;
  rows: ComparisonRow[];
}) {
  return (
    <Reveal>
      <div className="overflow-x-auto rounded-2xl border border-[var(--rx-line)]">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.14em] text-[var(--rx-faint)]">
                &nbsp;
              </th>
              <th className="px-5 py-4 text-left text-sm font-extrabold grad-text">
                RecXchange
              </th>
              <th className="px-5 py-4 text-left text-sm font-bold text-white">
                {otherName}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-[var(--rx-line)] bg-white/[0.02]"
              >
                <th
                  scope="row"
                  className="px-5 py-4 text-left align-top font-semibold text-white whitespace-nowrap"
                >
                  {row.label}
                </th>
                <td className="px-5 py-4 align-top text-[var(--rx-text)]">
                  {row.recxchange}
                </td>
                <td className="px-5 py-4 align-top text-[var(--rx-muted)]">
                  {row.other}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
