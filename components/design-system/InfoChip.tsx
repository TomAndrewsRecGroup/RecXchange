'use client';

import React from 'react';
import Link from 'next/link';

interface InfoChipProps {
  text: string;
  label: string;
  color?: 'emerald' | 'cyan' | 'fuchsia' | 'purple';
  href?: string;
  description?: string;
}

const colorConfig = {
  emerald: {
    glow: 'from-emerald-500/30 to-emerald-600/30',
    bg: 'bg-black/30',
    border: 'border-emerald-400/30 group-hover:border-emerald-300/50',
    text: 'text-emerald-300'
  },
  cyan: {
    glow: 'from-cyan-500/30 to-cyan-600/30',
    bg: 'bg-black/30',
    border: 'border-cyan-400/30 group-hover:border-cyan-300/50',
    text: 'text-cyan-300'
  },
  fuchsia: {
    glow: 'from-fuchsia-500/30 to-fuchsia-600/30',
    bg: 'bg-black/30',
    border: 'border-fuchsia-400/30 group-hover:border-fuchsia-300/50',
    text: 'text-fuchsia-300'
  },
  purple: {
    glow: 'from-purple-500/30 to-purple-600/30',
    bg: 'bg-black/30',
    border: 'border-purple-400/30 group-hover:border-purple-300/50',
    text: 'text-purple-300'
  }
};

export default function InfoChip({ 
  text, 
  label, 
  color = 'cyan',
  href,
  description
}: InfoChipProps) {
  const colors = colorConfig[color];
  
  const chipContent = (
    <div className="group relative" role="listitem">
      <div 
        className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} rounded-full blur opacity-50 group-hover:opacity-80 transition`}
        aria-hidden="true" 
      />
      <div 
        className={`relative backdrop-blur-lg ${colors.bg} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border ${colors.border} transition-all`}
        style={{
          boxShadow: `0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
        }}
        title={description}
      >
        <span className={`text-[9px] sm:text-[10px] font-bold ${colors.text} tracking-[0.12em] sm:tracking-[0.15em] uppercase flex items-center gap-1.5 sm:gap-2`}>
          <span 
            className="animate-pulse"
            style={{ textShadow: `0 0 10px currentColor` }}
            aria-hidden="true"
          >
            ●
          </span>
          <span aria-label={label}>{text}</span>
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{chipContent}</Link>;
  }

  return chipContent;
}
