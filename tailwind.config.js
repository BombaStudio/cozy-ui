/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--color-paper)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        sub: 'var(--color-sub)',
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
        line: 'var(--color-line)',
        
        // Standart Tailwind sınıflarını bizim değişkenlere eşle
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
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.04)', 
        'hard': '3px 3px 0px 0px var(--color-shadow)',    
        'hard-hover': '5px 5px 0px 0px var(--color-shadow)',
      },
      borderRadius: {
        'cozy': '16px',
      },
    },
  },
  plugins: [],
}