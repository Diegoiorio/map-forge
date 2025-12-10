import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // (safe catch-all if you want)
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};

export default config;
