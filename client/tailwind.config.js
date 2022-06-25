const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: [{min: "320px", max: "365px"}],
      ...defaultTheme.screens,
    },
  },
  variants: {},
}
