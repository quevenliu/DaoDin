/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#F77B54",
        backgroundColor: "#F3F3F3",
        secondaryColor: "#FCC3C3",
        darkPrimaryColor: "#01061B",
        darkSecondaryColor: "#243477",
        darkBackgroundColor: "#020B35",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
