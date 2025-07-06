// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#001f3f",   // Blue
        secondaryColor: "#d4ff00", // Purple
      },
    },
  },
  plugins: [],
}
