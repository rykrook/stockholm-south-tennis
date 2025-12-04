/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tennis-navy': '#0a192f',
        'tennis-gold': '#c5a059',
      }
    },
  },
  plugins: [],
}