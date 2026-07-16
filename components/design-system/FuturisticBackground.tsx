'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FuturisticBackgroundProps {
  variant?: 'default' | 'minimal' | 'intense';
  showScanLines?: boolean;
  showOrbs?: boolean;
}

export default function FuturisticBackground({ 
  variant = 'default',
  showScanLines = true,
  showOrbs = true 
}: FuturisticBackgroundProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);

  const orbOpacity = {
    default: { primary: 0.10, secondary: 0.10 },
    minimal: { primary: 0.05, secondary: 0.05 },
    intense: { primary: 0.18, secondary: 0.18 }
  }[variant];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Floating energy orbs */}
      {showOrbs && (
        <>
          <motion.div 
            style={{ 
              y: y1,
              background: `radial-gradient(circle, rgba(0,240,255,${orbOpacity.primary}) 0%, rgba(0,240,255,${orbOpacity.primary * 0.33}) 40%, transparent 70%)`,
              filter: 'blur(40px)'
            }}
            className="absolute top-[-15%] left-[5%] w-[50%] h-[50%] rounded-full animate-float"
          />
          <motion.div 
            style={{ 
              y: y2,
              background: `radial-gradient(circle, rgba(255,0,255,${orbOpacity.secondary}) 0%, rgba(255,0,255,${orbOpacity.secondary * 0.33}) 40%, transparent 70%)`,
              filter: 'blur(40px)'
            }}
            className="absolute bottom-[-15%] right-[5%] w-[50%] h-[50%] rounded-full animate-float-delayed"
          />
        </>
      )}
      
      {/* Subtle ambient line - static, not animated, to reduce visual noise */}
      {showScanLines && (
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute w-full h-[1px] top-[35%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="absolute w-full h-[1px] top-[65%] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" />
        </div>
      )}
    </div>
  );
}
