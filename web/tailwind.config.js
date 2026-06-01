/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Big, athletic, editorial headlines
        display: ['Anton', 'Impact', 'sans-serif'],
        // Clean modern UI / body
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // --- Kept for backwards-compatibility (used everywhere) ---
        'tennis-navy': '#0a192f',
        'tennis-gold': '#c5a059',
        'tennis-cream': '#f6f4ef',
        // --- Expanded scales for depth & layering ---
        navy: {
          950: '#050b18',
          900: '#0a192f',
          800: '#0e2342',
          700: '#143058',
          600: '#1c4174',
        },
        gold: {
          DEFAULT: '#c5a059',
          light: '#e6cd92',
          300: '#d9bd7e',
          400: '#cdaa67',
          dark: '#a47e3c',
        },
      },
      letterSpacing: {
        'mega': '0.35em',
      },
      boxShadow: {
        'gold': '0 10px 40px -12px rgba(197, 160, 89, 0.55)',
        'gold-lg': '0 20px 60px -15px rgba(197, 160, 89, 0.6)',
        'card': '0 18px 50px -20px rgba(10, 25, 47, 0.35)',
        'card-hover': '0 34px 70px -25px rgba(10, 25, 47, 0.55)',
        'inset-line': 'inset 0 0 0 1px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(110deg, #a47e3c 0%, #e6cd92 45%, #c5a059 100%)',
        'gold-sheen': 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%)',
        'navy-fade': 'linear-gradient(180deg, rgba(5,11,24,0) 0%, rgba(5,11,24,0.4) 55%, rgba(5,11,24,0.95) 100%)',
        'hero-vignette': 'radial-gradient(120% 120% at 50% 0%, rgba(5,11,24,0.1) 0%, rgba(5,11,24,0.55) 60%, rgba(5,11,24,0.92) 100%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'kenburns': {
          '0%': { transform: 'scale(1) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1.5%)' },
        },
        'sheen': {
          '0%': { transform: 'translateX(-120%)' },
          '60%, 100%': { transform: 'translateX(120%)' },
        },
        'scroll-cue': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'kenburns': 'kenburns 20s ease-out forwards',
        'sheen': 'sheen 1.1s ease-in-out',
        'scroll-cue': 'scroll-cue 1.6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
