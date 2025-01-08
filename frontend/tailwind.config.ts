import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        CD: ['CD','sans-serif'],
      },
      colors: {
        'primary-orange': '#F45B49',
        'primary-yellow': '#FFF59F',
      },
    },
  },
  plugins: [],
} satisfies Config;
