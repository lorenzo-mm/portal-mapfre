/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        red: '#D81e05',
        white: '#ffffff',
        gray: '#E7EBED'
      },
      fontFamily: {
        helvetica: 'helvetica'
      },
      maxHeight: {
        502: '502px'
      }
    }
  },
  plugins: []
}
