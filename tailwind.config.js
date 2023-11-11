/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat Alternates']
      },
      colors: {
        primary: '#17b39c',
        'primary-alt': '#0e7490',

        secondary: '#212432',
      }
    },
  },
  plugins: [],
}