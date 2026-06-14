/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg:      '#05050f',
          bg2:     '#080818',
          card:    '#0c0c20',
          cyan:    '#00f5ff',
          purple:  '#7c3aed',
          blue:    '#3b82f6',
          magenta: '#ff00ff',
          green:   '#00ff88',
        },
      },
      boxShadow: {
        cyan:   '0 0 20px rgba(0,245,255,0.35)',
        'cyan-lg': '0 0 50px rgba(0,245,255,0.5)',
        purple: '0 0 20px rgba(124,58,237,0.4)',
      },
      animation: {
        'spin-slow':  'spin 8s linear infinite',
        'spin-rev':   'spin-rev 12s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan':       'scan 3s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'blink':      'blink 1s step-end infinite',
        'stream':     'stream 2s ease-in-out infinite',
      },
      keyframes: {
        'spin-rev': { to: { transform: 'rotate(-360deg)' } },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 40px rgba(0,245,255,0.3)' },
          '50%':     { boxShadow: '0 0 80px rgba(0,245,255,0.7)' },
        },
        scan: {
          '0%':   { top: '0%' },
          '100%': { top: '100%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        stream: {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '50%':  { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
      },
      backgroundImage: {
        'grid-cyber': "linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)",
        'scanlines':  "repeating-linear-gradient(0deg, rgba(0,245,255,0.02) 0, rgba(0,245,255,0.02) 1px, transparent 1px, transparent 4px)",
        'corridor':   "linear-gradient(90deg, transparent 49.5%, rgba(0,245,255,0.05) 49.5%, rgba(0,245,255,0.05) 50.5%, transparent 50.5%)",
      },
    },
  },
  plugins: [],
}
