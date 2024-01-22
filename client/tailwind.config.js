/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fornt': "url('/src/img/fornt1.avif')",
        'img1': "url('/src/img/img1.avif')",
        
      }
    },
  },
  plugins: [],
}