import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Times New Roman', 'serif'],
      },
      colors: {
        ink: {
          950: '#07090f',
          900: '#0d1018',
          800: '#161b26',
          700: '#222936',
          300: '#8c95a3',
          200: '#c6ccd6',
          100: '#eef1f5',
        },
        teal: {
          300: '#b8dedb',
          400: '#92cdc8',
          500: '#6ab4b0',
        },
        dawn: {
          400: '#95b3d2',
          500: '#7297be',
        },
        sodium: {
          400: '#efbb80',
          500: '#e8a155',
        },
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
