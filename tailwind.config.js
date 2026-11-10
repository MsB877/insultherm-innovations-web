/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          obsidian: '#0B192C',
          slate: '#1C2430',
          orange: '#EA580C',
          orangeBright: '#FF6500',
          amber: '#FBB03B',
          emerald: '#059669',
        },
      },
    },
  },
  plugins: [],
};
