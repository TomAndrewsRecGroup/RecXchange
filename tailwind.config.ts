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
          950: '#0b0910',
          900: '#110d18',
          800: '#1a1422',
          700: '#251c30',
          300: '#ada294',
          200: '#d8cfc1',
          100: '#f5efe6',
        },
        amber: {
          300: '#fbd2a4',
          400: '#f5b876',
          500: '#f0a04b',
        },
        jade: {
          400: '#79d5b3',
          500: '#4ec39a',
        },
        plum: {
          700: '#3a1f4a',
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
