'use client';

import { useState } from 'react';

/**
 * Interactive earnings calculator — placements/year × average fee × split %.
 * Pure client-side maths; no network calls.
 */
export default function EarningsCalculator() {
  const [placements, setPlacements] = useState(6);
  const [avgFee, setAvgFee] = useState(14000);
  const [split, setSplit] = useState(50);

  const perPlacement = Math.round((avgFee * split) / 100);
  const annual = perPlacement * placements;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-7">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label
                htmlFor="calc-placements"
                className="text-sm font-semibold text-white"
              >
                Split placements per year
              </label>
              <span className="text-sm font-bold grad-text tabular-nums">
                {placements}
              </span>
            </div>
            <input
              id="calc-placements"
              type="range"
              min={1}
              max={36}
              value={placements}
              onChange={(e) => setPlacements(Number(e.target.value))}
              className="w-full accent-[#8b5cf6]"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label
                htmlFor="calc-fee"
                className="text-sm font-semibold text-white"
              >
                Average placement fee
              </label>
              <span className="text-sm font-bold grad-text tabular-nums">
                {fmt(avgFee)}
              </span>
            </div>
            <input
              id="calc-fee"
              type="range"
              min={4000}
              max={60000}
              step={1000}
              value={avgFee}
              onChange={(e) => setAvgFee(Number(e.target.value))}
              className="w-full accent-[#8b5cf6]"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label
                htmlFor="calc-split"
                className="text-sm font-semibold text-white"
              >
                Your split
              </label>
              <span className="text-sm font-bold grad-text tabular-nums">
                {split}%
              </span>
            </div>
            <input
              id="calc-split"
              type="range"
              min={30}
              max={70}
              step={5}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
              className="w-full accent-[#8b5cf6]"
            />
            <p className="mt-1 text-xs text-[var(--rx-faint)]">
              50% is typical on Xchange roles; up to 70% on RecX Direct.
            </p>
          </div>
        </div>

        <div className="grad-border-hot rounded-2xl p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--rx-faint)] mb-2">
            Your estimated earnings
          </p>
          <p
            className="text-4xl sm:text-5xl font-black grad-text-hot tabular-nums"
            aria-live="polite"
          >
            {fmt(annual)}
          </p>
          <p className="mt-1 text-sm text-[var(--rx-muted)]">per year</p>
          <p className="mt-4 text-sm text-[var(--rx-muted)] tabular-nums">
            {fmt(perPlacement)} per placement — your cut, after the split
          </p>
        </div>
      </div>
    </div>
  );
}
