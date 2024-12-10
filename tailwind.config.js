/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006A67',
        primary_hover: '#058a86',
        danger: "#ff0505"
        // foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
