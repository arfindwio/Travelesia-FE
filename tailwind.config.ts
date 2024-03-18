import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#7126B5",
          hover: "#4B1979",
          3: "#A06ECE",
          4: "#D0B7E6",
          5: "#E2D4F0",
        },
        secondary: {
          1: "#AA9B87",
          2: "#D4C2A8",
          3: "#FFE9CA",
          4: "#FFF0DC",
          5: "#FFF8ED",
        },
        alert: {
          red: "#FF0000",
          yellow: "#F9CC00",
          green: "#73CA5C",
        },
        neutral: {
          1: "#151515",
          2: "#3C3C3C",
          3: "#8A8A8A",
          4: "#D0D0D0",
          5: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
