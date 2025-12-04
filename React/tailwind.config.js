/** @type {import('tailwindcss').Config} */
import cozyConfig from './cozy.config.json';

// Helper to map color keys to CSS variables
const mapColors = (colors) => {
  const result = {};
  Object.keys(colors).forEach(key => {
    result[key] = `var(--color-${key})`;
  });
  return result;
};

export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...mapColors(cozyConfig.theme.colors),
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: '#FFFFFF',
          dark: '#D06348'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#E63946',
          foreground: '#FFFFFF'
        },
        border: 'var(--color-line)',
        input: 'var(--color-line)',
        ring: 'var(--color-primary)',
        background: 'var(--color-paper)',
        foreground: 'var(--color-ink)',
      },
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
        sans: ['"Nunito"', 'sans-serif'],
      },
      boxShadow: cozyConfig.theme.boxShadow,
      borderRadius: cozyConfig.theme.borderRadius,
    },
  },
  plugins: [],
}