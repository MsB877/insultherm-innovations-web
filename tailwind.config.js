/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          black: '#0F1115',
          charcoal: '#181B22',
          red: '#DC2626',
          redDark: '#B91C1C',
          redSoft: '#FEF2F2',
          surface: '#F7F8FA',
          border: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
};
