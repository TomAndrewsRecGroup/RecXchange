import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        rx: {
          bg: '#0a0a0f',
          deep: '#060312',
          cyan: '#00f0ff',
          fuchsia: '#ff00ff',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        display: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cyan: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,240,255,0.15), 0 0 20px rgba(0,240,255,0.05)',
        fuchsia:
          '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,0,255,0.15), 0 0 20px rgba(255,0,255,0.05)',
        purple:
          '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(168,85,247,0.15), 0 0 20px rgba(168,85,247,0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
