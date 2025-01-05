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
        primary_hover: '#9936f8',
        // primary2: '#a855f7',
        // secondary: "#096baa", // blue
        // secondary_hover: "#045a91",
        secondary: "#fff",
        secondary_hover: "#e4e4e4",
        danger: "#cc0202",
        // foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
