/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        title: '#270D06',
        emptyColor: '#846159',
        
      }
    },
  },
  plugins: [],
}

