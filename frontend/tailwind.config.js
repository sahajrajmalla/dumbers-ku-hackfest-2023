/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
        xxl: "1920px",
        xxxl: "2560px",
      },

      maxWidth: {
        "5xl": "80rem",
        "8xl": "105rem",
      },

      colors: {
        primary: "#09DA09",
        primaryGradient: "",

        dark: "#45413C",
        paragraph: "#5B5B5B"
      },
    },
  },
  plugins: [],
};
