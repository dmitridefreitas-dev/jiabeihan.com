/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './contexts/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0EDEA',
        foreground: '#1C1C28',
        muted: {
          DEFAULT: '#4A4A5A',
          foreground: '#4A4A5A',
        },
        accent: {
          DEFAULT: '#CC0022',
          blue: '#0044CC',
          indigo: '#440099',
          violet: '#8800BB',
          cyan: '#007733',
          gold: '#9A8000',
          foreground: '#FFFFFF',
          glow: 'rgba(0,68,204,0.18)',
        },
        surface: {
          DEFAULT: '#F8F6F4',
          hover: '#EEEBE8',
        },
        border: {
          DEFAULT: '#E0DCD7',
          strong: '#D0CBC5',
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'Consolas', 'monospace'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display':    ['clamp(1.75rem,3.5vw,2.75rem)', { lineHeight: '1.0',  letterSpacing: '-0.03em', fontWeight: '900' }],
        'headline':   ['clamp(1.2rem,2vw,1.75rem)',    { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'subhead':    ['clamp(0.95rem,1.5vw,1.2rem)',  { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-fluid': ['clamp(0.8rem,0.9vw,0.95rem)',  { lineHeight: '1.65', fontWeight: '600' }],
      },
      keyframes: {
        'ticker-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(204,0,34,0.15), 0 0 40px rgba(0,68,204,0.08)' },
          '50%':      { boxShadow: '0 0 35px rgba(0,68,204,0.2), 0 0 70px rgba(0,119,51,0.1)' },
        },
        'grid-breathe': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
        'aurora-shift': {
          '0%':   { transform: 'translateX(-50%) scale(1) rotate(0deg)' },
          '33%':  { transform: 'translateX(-48%) scale(1.05) rotate(1deg)' },
          '66%':  { transform: 'translateX(-52%) scale(0.97) rotate(-1deg)' },
          '100%': { transform: 'translateX(-50%) scale(1) rotate(0deg)' },
        },
        'blob-drift-light': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%':      { transform: 'translate(-15px, 15px) scale(0.97)' },
        },
      },
      animation: {
        'ticker-scroll':     'ticker-scroll 60s linear infinite',
        'pulse-glow':        'pulse-glow 2s ease-in-out infinite',
        'grid-breathe':      'grid-breathe 20s ease-in-out infinite',
        'aurora-shift':      'aurora-shift 25s ease-in-out infinite',
        'blob-drift-light':  'blob-drift-light 20s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
