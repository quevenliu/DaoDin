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
        "topbar-bounce": "bounceCustom 1s infinite",
        "login-shake": "shake 1s infinite",
      },
      keyframes: {
        bounceCustom: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        shake: {
          "25%": {
            transform: "translate(-1px, -2px) rotate(-1deg)",
          },
          "30%": {
            transform: "translate(-3px, 0px) rotate(1deg)",
          },
          "35%": {
            transform: "translate(3px, 2px) rotate(0deg)",
          },
          "40%": {
            transform: "translate(1px, -1px) rotate(1deg)",
          },
          "45%": {
            transform: "translate(-1px, 2px) rotate(-1deg)",
          },
          "50%": {
            transform: "translate(-3px, 1px) rotate(0deg)",
          },
          "55%": {
            transform: "translate(3px, 1px) rotate(-1deg)",
          },
          "60%": {
            transform: "translate(-1px, -1px) rotate(1deg)",
          },
          "65%": {
            transform: "translate(1px, 2px) rotate(0deg)",
          },
          "70%": {
            transform: "translate(1px, -2px) rotate(-1deg)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
