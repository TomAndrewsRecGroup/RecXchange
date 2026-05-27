"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  intensity?: number;
};

const VERT = `
  attribute vec2 a_pos;
  void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
  precision highp float;
  uniform vec2  u_res;
  uniform float u_t;
  uniform float u_intensity;

  // Hash + value noise (cheap, no textures)
  float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float n(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = h(i), b = h(i + vec2(1.0,0.0)), c = h(i + vec2(0.0,1.0)), d = h(i + vec2(1.0,1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i = 0; i < 5; i++){ v += a * n(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  // Iris: soft elliptical light with internal striation
  vec3 iris(vec2 uv, vec2 c, float r, vec3 col, float t, float seed){
    vec2 d = uv - c;
    float dist = length(d);
    float ang  = atan(d.y, d.x);
    // base radial falloff (soft)
    float core = smoothstep(r, 0.0, dist);
    // striation lines that twist over time (iris fibers)
    float fibers = 0.5 + 0.5 * sin(ang * 14.0 + t * 0.25 + seed * 11.0 + dist * 6.0);
    fibers = pow(fibers, 3.0) * smoothstep(r * 1.1, r * 0.2, dist);
    // noisy bloom around it
    float bloom = fbm(uv * 2.5 + vec2(seed * 3.0, t * 0.05)) * smoothstep(r * 1.6, 0.0, dist);
    float a = core * 0.85 + fibers * 0.25 + bloom * 0.35;
    return col * a;
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
    float t = u_t * 0.18;

    // Two slow-drifting iris centers
    vec2 c1 = vec2(-0.55 + 0.10 * sin(t * 0.7), 0.18 + 0.06 * cos(t * 0.55));
    vec2 c2 = vec2( 0.58 + 0.08 * cos(t * 0.5), -0.22 + 0.07 * sin(t * 0.8));

    // Warm amber + cool jade — both desaturated, low-chroma
    vec3 amber = vec3(0.95, 0.62, 0.28);
    vec3 jade  = vec3(0.36, 0.78, 0.62);

    vec3 col = vec3(0.0);
    col += iris(uv, c1, 0.55, amber, u_t, 1.0);
    col += iris(uv, c2, 0.50, jade,  u_t, 2.3);

    // Subtle film grain
    float g = (h(gl_FragCoord.xy + u_t) - 0.5) * 0.04;
    col += g;

    // Vignette toward deep ink
    float vig = smoothstep(1.2, 0.2, length(uv));
    col *= mix(0.55, 1.0, vig);

    // Global intensity
    col *= u_intensity;

    // Output (background ink baked in by the page; this layer is additive via CSS)
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function IrisShader({ className = "", intensity = 1.0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, alpha: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const v = compile(gl.VERTEX_SHADER, VERT);
    const f = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");
    const uI = gl.getUniformLocation(prog, "u_intensity");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, prefersReducedMotion ? 0 : t);
      gl.uniform1f(uI, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(v);
      gl.deleteShader(f);
      gl.deleteBuffer(buf);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
