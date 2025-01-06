/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6d8cfb', // graident blue
        primary_dark: '#31035e',
        primary_dark2: '#304aa5',

        primary_hover: '#4469ed',
        primary_dark2_hover: '#3556c8',

        secondary: "#fff",
        secondary_hover: "#e4e4e4",

        danger: "#cc0202",
      },
    },
  },
  plugins: [],
};
