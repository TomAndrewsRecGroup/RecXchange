'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NeonDividerProps {
  width?: string;
  height?: string;
  animated?: boolean;
  showDots?: boolean;
  color?: 'cyan' | 'purple' | 'fuchsia' | 'mixed';
}

const colorConfig = {
  cyan: {
    primary: 'via-cyan-400',
    secondary: 'from-cyan-400 via-cyan-400 to-cyan-400',
    dotLeft: 'bg-cyan-400',
    dotRight: 'bg-cyan-400',
    shadow: '0 0 10px rgba(0,240,255,0.8)'
  },
  purple: {
    primary: 'via-purple-400',
    secondary: 'from-purple-400 via-purple-400 to-purple-400',
    dotLeft: 'bg-purple-400',
    dotRight: 'bg-purple-400',
    shadow: '0 0 10px rgba(168,85,247,0.8)'
  },
  fuchsia: {
    primary: 'via-fuchsia-400',
    secondary: 'from-fuchsia-400 via-fuchsia-400 to-fuchsia-400',
    dotLeft: 'bg-fuchsia-400',
    dotRight: 'bg-fuchsia-400',
    shadow: '0 0 10px rgba(255,0,255,0.8)'
  },
  mixed: {
    primary: 'via-cyan-400',
    secondary: 'from-cyan-400 via-purple-400 to-fuchsia-400',
    dotLeft: 'bg-cyan-400',
    dotRight: 'bg-fuchsia-400',
    shadow: '0 0 10px rgba(0,240,255,0.8)'
  }
};

export default function NeonDivider({
  width = 'w-40',
  height = 'h-[3px]',
  animated = true,
  showDots = true,
  color = 'mixed'
}: NeonDividerProps) {
  const colors = colorConfig[color];
  
  const MotionWrapper = animated ? motion.div : 'div';
  const motionProps = animated ? {
    initial: { scaleX: 0, opacity: 0 },
    animate: { scaleX: 1, opacity: 1 },
    whileInView: { scaleX: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  } : {};

  return (
    <MotionWrapper
      {...motionProps}
      className={`relative ${width} ${height} mx-auto`}
      aria-hidden="true"
    >
      {/* Base gradient line */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${colors.primary} to-transparent`} />
      
      {/* Animated pulse overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${colors.secondary} animate-pulse-slow`}
        style={{ filter: 'blur(4px)' }}
      />
      
      {/* Energy dots */}
      {showDots && (
        <>
          <div 
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${colors.dotLeft}`}
            style={{ boxShadow: colors.shadow }}
          />
          <div 
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${colors.dotRight}`}
            style={{ boxShadow: color === 'mixed' ? '0 0 10px rgba(255,0,255,0.8)' : colors.shadow }}
          />
        </>
      )}
    </MotionWrapper>
  );
}
