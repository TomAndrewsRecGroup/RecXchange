'use client';

import { useEffect, useRef } from 'react';

/**
 * Network background - a living constellation of recruiter "nodes" drifting
 * over vivid violet/blue/magenta gradient washes, with connection lines
 * forming and dissolving between nearby nodes (and toward the cursor).
 * Visualises the thing the product actually is: a network making connections.
 *
 * Behaviour:
 * - Canvas 2D plexus, node count scaled to viewport, DPR capped at 1.5
 * - Pointer proximity draws brighter links to the cursor
 * - Pauses when the tab is hidden
 * - prefers-reduced-motion: renders a single static frame (no loop)
 */

const PALETTE = [
  { color: '139,92,246', weight: 3 }, // violet
  { color: '59,130,246', weight: 3 }, // blue
  { color: '217,70,239', weight: 1 }, // magenta
  { color: '34,211,238', weight: 1 }, // cyan
];

function pickColor(rand: () => number): string {
  const total = PALETTE.reduce((s, p) => s + p.weight, 0);
  let r = rand() * total;
  for (const p of PALETTE) {
    r -= p.weight;
    if (r <= 0) return p.color;
  }
  return PALETTE[0].color;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  hub: boolean;
  phase: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999 };

    const rand = Math.random;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(150, Math.floor((width * height) / 12000));
      nodes = Array.from({ length: count }, (_, i) => {
        const hub = i < count * 0.06;
        return {
          x: rand() * width,
          y: rand() * height,
          vx: (rand() - 0.5) * 0.35,
          vy: (rand() - 0.5) * 0.35,
          r: hub ? 2.6 + rand() * 1.4 : 1 + rand() * 1.4,
          color: pickColor(rand),
          hub,
          phase: rand() * Math.PI * 2,
        };
      });
    };

    const LINK_DIST = 150;
    const POINTER_DIST = 200;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // Links between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const d = Math.sqrt(d2);
          const strength = 1 - d / LINK_DIST;
          ctx.strokeStyle = `rgba(${a.color},${(strength * strength * 0.45).toFixed(3)})`;
          ctx.lineWidth = a.hub || b.hub ? 1.1 : 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Brighter links to the cursor - the network reaches toward you
        const pdx = a.x - pointer.x;
        const pdy = a.y - pointer.y;
        const pd2 = pdx * pdx + pdy * pdy;
        if (pd2 < POINTER_DIST * POINTER_DIST) {
          const pd = Math.sqrt(pd2);
          const strength = 1 - pd / POINTER_DIST;
          ctx.strokeStyle = `rgba(${a.color},${(strength * 0.6).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const pulse = n.hub ? 0.75 + 0.25 * Math.sin(t / 900 + n.phase) : 1;
        if (n.hub) {
          // Soft halo around hub nodes
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7);
          halo.addColorStop(0, `rgba(${n.color},${0.35 * pulse})`);
          halo.addColorStop(1, `rgba(${n.color},0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${n.color},${(0.9 * pulse).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }
    };

    let raf = 0;
    let running = true;

    const loop = (t: number) => {
      if (!running) return;
      step();
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    build();

    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      build();
      if (reduceMotion) draw(0);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener(
        'pointerleave',
        onPointerLeave
      );
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Vivid colour washes beneath the network */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 70% 8%, rgba(139,92,246,0.30), transparent 60%), radial-gradient(ellipse 65% 55% at 12% 45%, rgba(59,130,246,0.24), transparent 60%), radial-gradient(ellipse 50% 45% at 88% 78%, rgba(217,70,239,0.18), transparent 60%), radial-gradient(ellipse 40% 35% at 35% 95%, rgba(34,211,238,0.12), transparent 60%), #060312',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Readability veil - keeps copy AA-legible over the network */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,3,18,0.35) 0%, rgba(6,3,18,0.12) 30%, rgba(6,3,18,0.45) 100%)',
        }}
      />
    </div>
  );
}
