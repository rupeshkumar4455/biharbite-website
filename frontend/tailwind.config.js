/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#15803d",
        primaryDark: "#166534",
        accent: "#f97316",
      },
    },
  },
  plugins: [],
};
