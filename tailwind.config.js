/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
     content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // if using the App Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
    extend: {
      colors: {
        forest: {
          600: '#3A4F3F', // Deep forest green for text
          800: '#2A3A2C', // Darker green for headings
        },
      },
    },
  },
};