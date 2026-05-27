"use client";

import React from "react";
import Image from "next/image";

type Tone = "amber" | "jade" | "ink";

type Props = {
  src: string;
  alt: string;
  tone?: Tone;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
};

// Highlight color → linear interpolation; shadow always crushes to deep ink.
// Values are sRGB 0–1.
const TONES: Record<Tone, { hi: [number, number, number]; lo: [number, number, number] }> = {
  amber: { hi: [0.99, 0.83, 0.55], lo: [0.07, 0.05, 0.09] },
  jade:  { hi: [0.66, 0.92, 0.80], lo: [0.06, 0.07, 0.09] },
  ink:   { hi: [0.90, 0.88, 0.94], lo: [0.05, 0.05, 0.07] },
};

let _filterId = 0;

export default function DuotonePhoto({
  src,
  alt,
  tone = "amber",
  className = "",
  priority = false,
  sizes = "100vw",
  aspect = "4/5",
}: Props) {
  // Stable per-instance id (SSR-safe via React.useId fallback)
  const reactId = React.useId();
  const id = `duo-${tone}-${reactId.replace(/:/g, "")}-${_filterId++}`;
  const { hi, lo } = TONES[tone];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Inline SVG filter — applied via CSS filter: url(#id) on the img */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id={id} colorInterpolationFilters="sRGB">
            {/* Step 1: convert to luminance */}
            <feColorMatrix
              type="matrix"
              values={`0.2126 0.7152 0.0722 0 0
                       0.2126 0.7152 0.0722 0 0
                       0.2126 0.7152 0.0722 0 0
                       0 0 0 1 0`}
            />
            {/* Step 2: map luminance 0→lo, 1→hi via component transfer */}
            <feComponentTransfer>
              <feFuncR type="table" tableValues={`${lo[0]} ${hi[0]}`} />
              <feFuncG type="table" tableValues={`${lo[1]} ${hi[1]}`} />
              <feFuncB type="table" tableValues={`${lo[2]} ${hi[2]}`} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ filter: `url(#${id})` }}
      />

      {/* Subtle inner shadow + grain for filmic finish */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.5)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")",
        }}
      />
    </div>
  );
}
