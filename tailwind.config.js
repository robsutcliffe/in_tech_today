const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        18: "4.5rem",
        112: "28rem",
        120: "30rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
