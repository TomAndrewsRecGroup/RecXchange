'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Direction the element travels from. Default: up. */
  dir?: 'up' | 'left' | 'right' | 'scale';
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal, zero dependencies.
 * Adds `.is-visible` when the element enters the viewport; the transition
 * itself lives in globals.css (`.reveal`), which also disables it entirely
 * under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  dir = 'up',
  delay = 0,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-dir={dir === 'up' ? undefined : dir}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
