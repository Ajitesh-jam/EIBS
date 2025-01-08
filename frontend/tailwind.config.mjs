/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['CD','sans-serif'],
      },
      colors: {
        'primary-red': "#F45B49",
        'primary-yellow': "#FFF59F",
      },
    },
  },
  plugins: [],
};
