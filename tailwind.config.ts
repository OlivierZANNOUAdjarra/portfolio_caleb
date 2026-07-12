import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A1626',
          light: '#132135',
        },
        paper: {
          DEFAULT: '#F3EEE0',
          dark: '#0A1626',
        },
        electric: {
          DEFAULT: '#9A7A3D',
          50: '#FBF6EA',
          400: '#C9A661',
          500: '#C9A661',
          600: '#A88B5D',
        },
        signal: {
          DEFAULT: '#3D5A78',
          400: '#7C93AD',
        },
        glow: {
          DEFAULT: '#7C6339',
          400: '#A88B5D',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'aurora-gradient':
          'radial-gradient(circle at 20% 20%, rgba(201,166,97,0.16), transparent 40%), radial-gradient(circle at 80% 0%, rgba(124,147,173,0.12), transparent 40%), radial-gradient(circle at 50% 100%, rgba(168,139,93,0.12), transparent 40%)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sheen: {
          '0%': { left: '-60%' },
          '100%': { left: '130%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sheen: 'sheen 2.6s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;