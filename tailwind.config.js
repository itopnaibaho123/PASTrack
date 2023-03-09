/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'background': '#E8EDF6',
        'main-color-navy': '#0E3178',
        'main-color-yellow': '#FFD503',
        'main-text-brown': '#666666',
        'main-text-grey': '#EAEAEA'
      }

    },
  },
  plugins: [],
}
