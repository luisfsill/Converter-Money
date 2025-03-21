/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#233876",
        secondary: "#5162FF",
        accent: "#00D1FF",
        background: "#F8FAFC",
        surface: "#FFFFFF",
      },
      boxShadow: {
        card: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
} 