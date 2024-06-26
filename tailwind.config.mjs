/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{astro,html,ts,tsx}"],
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
        primary: {
          light: '#059669',
          dark: '#10b981',
        },
        light: {
          100: '#f8fafc',
          200: '#e5e5e5',
          300: '#e2e8f0',
          400: '#cbd5e1',
        },
        dark: {
          100: '#0f172a',
          200: '#1e293b',
          300: '#334155',
          400: '#475569',
        },
      },
      typography: ({ theme }) => ({
        base: {
          css: {
            '--tw-prose-body': '#334155',
            '--tw-prose-headings': theme('colors.dark[200]'),
            '--tw-prose-bold': theme('colors.dark[400]'),
            '--tw-prose-invert-body': '#94A3B8',
            '--tw-prose-invert-headings': theme('colors.light[400]'),
            '--tw-prose-invert-bold': theme('colors.light[400]'),
          },
        },
      }),
      fontFamily: {
        lpmq: ['var(--font-lpmq)'],
        poppins: ['var(--font-poppins)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
