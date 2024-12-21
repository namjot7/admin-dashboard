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
        primary_hover: '#0a7c79',
        secondary: "#096baa",
        secondary_hover: "#045a91",
        danger: "#cc0202",
        // foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
