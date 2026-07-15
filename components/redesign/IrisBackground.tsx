'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Iris shader background — a full-viewport WebGL canvas rendering a slowly
 * flowing, domain-warped iridescent field in the brand palette
 * (violet / blue / magenta / cyan) over deep dark.
 *
 * Behaviour:
 * - DPR capped at 1.5 to keep fill-rate cheap on 4k screens
 * - Pauses when the tab is hidden
 * - prefers-reduced-motion: renders a single static frame (no loop)
 * - No WebGL: falls back to a static CSS gradient
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;

// Brand palette
const vec3 VIOLET  = vec3(0.545, 0.361, 0.965); // #8b5cf6
const vec3 BLUE    = vec3(0.231, 0.510, 0.965); // #3b82f6
const vec3 MAGENTA = vec3(0.851, 0.275, 0.937); // #d946ef
const vec3 CYAN    = vec3(0.133, 0.827, 0.933); // #22d3ee
const vec3 GROUND  = vec3(0.024, 0.012, 0.071); // #060312

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.045;

  // Domain-warped flow field
  vec2 q = vec2(
    fbm(p * 1.35 + vec2(t, -t * 0.7)),
    fbm(p * 1.35 + vec2(-t * 0.6, t) + 4.2)
  );
  vec2 r = vec2(
    fbm(p * 1.9 + q * 1.6 + vec2(1.7, 9.2) + t * 0.8),
    fbm(p * 1.9 + q * 1.6 + vec2(8.3, 2.8) - t * 0.6)
  );
  float f = fbm(p * 1.6 + r * 1.9);

  // Iris banding — soft angular streaks radiating from upper focus point
  vec2 c = p - vec2(0.62 * u_res.x / u_res.y, 0.78);
  float ang = atan(c.y, c.x);
  float bands = 0.5 + 0.5 * sin(ang * 3.0 + f * 6.0 + t * 1.4);

  // Colour mix
  vec3 col = mix(VIOLET, BLUE, smoothstep(0.15, 0.75, f));
  col = mix(col, MAGENTA, smoothstep(0.45, 0.95, q.x) * 0.75);
  col = mix(col, CYAN, smoothstep(0.55, 1.0, r.y) * 0.6);
  col *= 0.35 + 0.65 * bands;

  // Intensity envelope: brightest around the focus, darker at edges
  float d = length(c);
  float glow = exp(-d * 1.35);
  float base = f * f * 0.85 + 0.06;
  vec3 field = GROUND + col * (base * 0.55 + glow * 0.5);

  // Vignette for readability
  float vig = smoothstep(1.45, 0.35, length(uv - vec2(0.5, 0.55)));
  field = mix(GROUND, field, vig);

  // Fine grain to kill banding
  field += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012;

  gl_FragColor = vec4(field, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('[IrisBackground] shader error:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function IrisBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      }) || canvas.getContext('experimental-webgl');

    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }

    const prog = gl.createProgram();
    if (!prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    // Full-screen triangle strip
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let raf = 0;
    let running = true;
    const start = performance.now();

    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000 + 12.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
      draw(start);
    } else {
      raf = requestAnimationFrame(loop);
    }

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
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {failed ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 65% 10%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(ellipse 70% 55% at 20% 80%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(ellipse 45% 40% at 85% 70%, rgba(217,70,239,0.16), transparent 60%), #060312',
          }}
        />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
      {/* Readability veil — keeps copy AA-legible over the vivid field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,3,18,0.42) 0%, rgba(6,3,18,0.18) 30%, rgba(6,3,18,0.5) 100%)',
        }}
      />
    </div>
  );
}
