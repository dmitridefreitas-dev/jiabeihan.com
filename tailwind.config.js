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
        background: '#FAFAF8',
        foreground: '#1A1A2E',
        muted: {
          DEFAULT: '#6B7280',
          foreground: '#6B7280',
        },
        accent: {
          DEFAULT: '#DC2626',
          blue: '#DC2626',
          indigo: '#991B1B',
          violet: '#7F1D1D',
          foreground: '#FFFFFF',
          glow: 'rgba(220,38,38,0.15)',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F3F4F6',
        },
        border: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
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
        'display':    ['clamp(2.25rem,5vw,4.5rem)',  { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'headline':   ['clamp(1.5rem,3vw,3rem)',     { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'subhead':    ['clamp(1.15rem,2vw,1.75rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'body-fluid': ['clamp(0.875rem,1vw,1.05rem)',{ lineHeight: '1.7'  }],
      },
      keyframes: {
        'ticker-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220,38,38,0.2), 0 0 40px rgba(220,38,38,0.08)' },
          '50%':      { boxShadow: '0 0 35px rgba(220,38,38,0.35), 0 0 70px rgba(220,38,38,0.15)' },
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
