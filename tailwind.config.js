const { hairlineWidth } = require("nativewind/theme");

const colors = require("./colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        condensed: "HelveticaNeue-CondensedBlack",
        light: "HelveticaNeue-Light",
        boldCustom: "HelveticaNeue-Bold",
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
