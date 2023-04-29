/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        utsg:'rgb(135, 205, 19)',
        utsb:'rgb(14, 87, 133)',
        "dark-purple":"#081A51",
        "light-white": "rgba(255,255,255,0.17)"
      },
    },
  },
  plugins: [],
}