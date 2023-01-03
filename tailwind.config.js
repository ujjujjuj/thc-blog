/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        logo: ["TanPearl", "serif"],
        euclid: ["EuclidCircularA", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        
      },
      colors: {
        dark: "#111111",
        darker: "#080808",
      },
      scale: {
        hover: "1.03",
      },
    },
  },
  plugins: [],
};
