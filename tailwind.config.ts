import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17201b",
        paper: "#fbfaf7",
        moss: "#5e7a5b",
        tomato: "#c94f44",
        sky: "#5a8fbf",
        honey: "#d6a94d"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(23, 32, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
