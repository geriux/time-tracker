const { hairlineWidth, platformSelect } = require("nativewind/theme");
const colors = require("./colors");

const fonts = {
  condensed: platformSelect({
    ios: "HelveticaNeue-CondensedBlack",
    android: "sans-serif-condensed",
    default: "Arial",
  }),
  light: platformSelect({
    ios: "HelveticaNeue-Light",
    android: "sans-serif-light",
    default: "Arial",
  }),
  boldCustom: platformSelect({
    ios: "HelveticaNeue-Bold",
    android: "sans-serif-medium",
    default: "Arial",
  }),
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: fonts,
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
