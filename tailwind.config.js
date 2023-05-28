/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

// d36ce3

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "!./node_modules"],
  theme: {
    extend: {
      colors: {
        primary: "#d36ce3",
        primaryLight: "#E098EB",
        light: "#ffffff",
        lightShade: "#F4F6FF",
        dark: "#475569",
        semiDarkTr: "rgba(38, 41, 47, 0.2)",
        grey: "#556669",
      },
      fontFamily: {
        oswald: ["var(--font-comfortaa)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        roboto: ["var(--font-roboto)", ...fontFamily.sans],
        comfortaa: ["var(--font-comfortaa)", ...fontFamily.sans],
        helveticThin: ["var(--font-helveticThin)"],
        helveticLight: ["var(--font-helveticLight)"],
        helveticRegular: ["var(--font-helveticRegular)"],
        helveticBold: ["var(--font-helveticBold)"],
      },
    },
  },
  plugins: [],
};
