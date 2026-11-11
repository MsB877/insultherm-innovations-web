/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          ink: '#14171A',
          charcoal: '#1E2328',
          stone: '#F6F5F1',
          alabaster: '#FBFBF9',
          border: '#E2E0D8',
          orange: '#E04819',
          orangeDark: '#BF360C',
          orangeLight: '#FFF3EE',
          crimson: '#C81E1E',
          amber: '#D97706',
          emerald: '#047857',
        },
      },
    },
  },
  plugins: [],
};
