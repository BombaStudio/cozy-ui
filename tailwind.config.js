/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,html}",
    "./src/*.{js,css,ts,html}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FDFBF7',
        surface: '#FFFFFF',
        ink: '#2D2D2D',
        sub: '#6B7280',
        primary: {
          DEFAULT: '#E07A5F',
          foreground: '#FFFFFF',
          dark: '#D06348'
        },
        secondary: {
          DEFAULT: '#81B29A',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#E63946',
          foreground: '#FFFFFF'
        },
        line: '#E5E7EB',
      },
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.04)', 
        'hard': '3px 3px 0px 0px #2D2D2D',    
        'hard-hover': '5px 5px 0px 0px #2D2D2D',
      },
      borderRadius: {
        'cozy': '16px',
      },
    },
  },
  plugins: [],
}