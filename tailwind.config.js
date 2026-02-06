/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // 3D Spatial Theme - Transparent backgrounds for canvas visibility
        background: {
          base: 'transparent',
          surface: 'rgba(10, 10, 10, 0.3)',
          overlay: 'rgba(10, 10, 10, 0.5)',
        },
        text: {
          primary: '#e5e5e5',
          secondary: '#a3a3a3',
          inverse: '#0a0a0a',
        },
        accent: {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          glow: 'rgba(139, 92, 246, 0.6)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.1)',
          highlight: 'rgba(139, 92, 246, 0.3)',
        },
        // Keep shadcn compatibility
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#8b5cf6',
          foreground: '#0a0a0a',
        },
        secondary: {
          DEFAULT: '#ec4899',
          foreground: '#0a0a0a',
        },
        muted: {
          DEFAULT: '#141414',
          foreground: '#a3a3a3',
        },
        card: {
          DEFAULT: '#141414',
          foreground: '#e5e5e5',
        },
        popover: {
          DEFAULT: '#141414',
          foreground: '#e5e5e5',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#e5e5e5',
        },
        input: '#141414',
        ring: '#8b5cf6',
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        body: ['"Inter"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero: ['96px', { lineHeight: '1.1' }],
        '4xl': ['64px', { lineHeight: '1.1' }],
        '3xl': ['48px', { lineHeight: '1.1' }],
        '2xl': ['32px', { lineHeight: '1.2' }],
        xl: ['24px', { lineHeight: '1.3' }],
        lg: ['20px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        xs: ['12px', { lineHeight: '1.5' }],
      },
      spacing: {
        '128': '128px',
        '96': '96px',
        '64': '64px',
        '48': '48px',
      },
      borderRadius: {
        lg: '24px',
        md: '16px',
        sm: '8px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 16px 48px rgba(0, 0, 0, 0.24)',
        neon: '0 0 20px rgba(139, 92, 246, 0.4)',
        'neon-strong': '0 0 40px rgba(139, 92, 246, 0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'grid-move': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'slow-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
