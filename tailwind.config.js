/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "!./node_modules"],
  theme: {
    extend: {
      colors: {
        primary: "#d36ce3",
        primaryLight: "#E098EB",
        light: "#ffffff",
        lightShade: "#F4F6FF",
        dark: "#26292f",
        semiDarkTr: "rgba(38, 41, 47, 0.2)",
        grey: "#556669",
      },
      fontFamily: {
        oswald: ["var(--font-oswald)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        helveticThin: ["var(--font-helveticThin)"],
        helveticLight: ["var(--font-helveticLight)"],
        helveticRegular: ["var(--font-helveticRegular)"],
        helveticBold: ["var(--font-helveticBold)"],
      },
    },
  },
  plugins: [],
};
