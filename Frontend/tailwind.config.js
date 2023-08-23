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
        primaryColor: "#C43F3F",
        backgroundColor: "#D14444",
        secondaryColor: "#E79292",
        textColor: "#5E0D0D",
        darkPrimaryColor: "#01061B",
        darkSecondaryColor: "#243477",
        darkBackgroundColor: "#020B35",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "homepage-ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) 1",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
