'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HolographicCardProps {
  children: React.ReactNode;
  color?: 'cyan' | 'fuchsia' | 'purple' | 'emerald';
  href?: string;
  onClick?: () => void;
  variant?: 'stat' | 'content' | 'feature';
  className?: string;
  showStatusIndicator?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const colorConfig = {
  cyan: {
    glow: 'from-cyan-500/20 via-cyan-600/15 to-cyan-500/20',
    border: 'border-cyan-400/40 hover:border-cyan-300/60',
    statusBg: 'bg-cyan-400',
    scanLine: 'via-cyan-400',
    textHover: 'group-hover:text-cyan-300',
    shadow: 'rgba(0,240,255,0.15)',
    inset: 'rgba(0,240,255,0.15)',
    ambientGlow: 'rgba(0,240,255,0.05)'
  },
  fuchsia: {
    glow: 'from-fuchsia-500/20 via-pink-600/15 to-fuchsia-500/20',
    border: 'border-fuchsia-400/40 hover:border-fuchsia-300/60',
    statusBg: 'bg-fuchsia-400',
    scanLine: 'via-fuchsia-400',
    textHover: 'group-hover:text-fuchsia-300',
    shadow: 'rgba(255,0,255,0.15)',
    inset: 'rgba(255,0,255,0.15)',
    ambientGlow: 'rgba(255,0,255,0.05)'
  },
  purple: {
    glow: 'from-purple-500/20 via-purple-600/15 to-cyan-500/20',
    border: 'border-purple-400/40 hover:border-purple-300/60',
    statusBg: 'bg-purple-400',
    scanLine: 'via-purple-400',
    textHover: 'group-hover:text-purple-300',
    shadow: 'rgba(168,85,247,0.15)',
    inset: 'rgba(168,85,247,0.15)',
    ambientGlow: 'rgba(168,85,247,0.05)'
  },
  emerald: {
    glow: 'from-emerald-500/20 via-emerald-600/15 to-emerald-500/20',
    border: 'border-emerald-400/40 hover:border-emerald-300/60',
    statusBg: 'bg-emerald-400',
    scanLine: 'via-emerald-400',
    textHover: 'group-hover:text-emerald-300',
    shadow: 'rgba(16,185,129,0.15)',
    inset: 'rgba(16,185,129,0.15)',
    ambientGlow: 'rgba(16,185,129,0.05)'
  }
};

const glowStrength = {
  low: { opacity: 'opacity-20 group-hover:opacity-35', blur: 'blur' },
  medium: { opacity: 'opacity-30 group-hover:opacity-50', blur: 'blur-lg' },
  high: { opacity: 'opacity-40 group-hover:opacity-60', blur: 'blur-xl' }
};

export default function HolographicCard({
  children,
  color = 'cyan',
  href,
  onClick,
  variant = 'content',
  className = '',
  showStatusIndicator = false,
  glowIntensity = 'medium'
}: HolographicCardProps) {
  const colors = colorConfig[color];
  const glow = glowStrength[glowIntensity];

  const padding = {
    stat: 'p-3 sm:p-5',
    content: 'p-6 sm:p-8',
    feature: 'p-6'
  }[variant];

  const cardContent = (
    <div className="group relative isolate">
      {/* Outer glow layer - softened */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-br ${colors.glow} rounded-2xl ${glow.blur} ${glow.opacity} transition duration-300 pointer-events-none`}
        aria-hidden="true" 
      />
      
      {/* Main card */}
      <div 
        className={`relative backdrop-blur-xl bg-black/40 ${padding} rounded-2xl border ${colors.border} transition-all duration-300 overflow-hidden ${className}`}
        style={{
          boxShadow: `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 ${colors.inset}, 0 0 20px ${colors.ambientGlow}`
        }}
      >
        {/* Status indicator */}
        {showStatusIndicator && (
          <div className="absolute top-2 left-2" aria-hidden="true">
            <div className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.statusBg} opacity-75`} />
              <span 
                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${colors.statusBg}`}
                style={{ boxShadow: `0 0 6px currentColor` }}
              />
            </div>
          </div>
        )}
        
        {children}
        
        {/* Bottom scan line */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${colors.scanLine} to-transparent opacity-50`}
          aria-hidden="true" 
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="block">
        {cardContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        {cardContent}
      </button>
    );
  }

  return cardContent;
}
