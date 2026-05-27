"use client";

import React from "react";
import Image from "next/image";

type Tone = "steel" | "teal" | "sodium" | "ink";

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
  // Cool pearl highlight → deep cool ink shadow. Documentary, not aestheticised.
  steel:  { hi: [0.92, 0.94, 0.96], lo: [0.03, 0.04, 0.06] },
  // Atmospheric teal — primary accent tone for ONE money-shot image
  teal:   { hi: [0.72, 0.88, 0.86], lo: [0.03, 0.05, 0.07] },
  // Sodium-amber — reserved for the strongest hero image only
  sodium: { hi: [0.96, 0.78, 0.50], lo: [0.04, 0.04, 0.07] },
  ink:    { hi: [0.87, 0.89, 0.93], lo: [0.03, 0.04, 0.06] },
};

let _filterId = 0;

export default function DuotonePhoto({
  src,
  alt,
  tone = "steel",
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
