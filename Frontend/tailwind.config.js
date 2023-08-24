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
        spinSlow: "spin 3s linear infinite",
        homepagePing: "ping 1s cubic-bezier(0, 0, 0.2, 1) 1",
        topbarBounce: "bounceCustom 1s infinite",
        loginShake: "shake 1s infinite",
        filterShake: "smallShake 0.5s 1",
        togglePop: "pop 0.5s 1",
        buttonPush: "push 0.4s 1",
        editGrowRotate: "growRotate 0.5s 1",
        sendGrowRotateOpposite: "growRotateOpposite 1s infinite",
        tagSweepToLeft: "sweepToLeft 0.5s 1",
        titlePop: "pop 1s ease-in-out 1",
        breaking: "flip 0.6s infinite",
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
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "10%": {
            transform: "translate(-1px, -2px) rotate(-1deg)",
          },
          "20%": {
            transform: "translate(3px, 2px) rotate(0deg)",
          },
          "30%": {
            transform: "translate(-1px, 2px) rotate(-1deg)",
          },
          "40%": {
            transform: "translate(3px, 1px) rotate(-1deg)",
          },
          "50%": {
            transform: "translate(1px, 2px) rotate(0deg)",
          },
          "60%": {
            transform: "translate(-1px, -2px) rotate(-1deg)",
          },
          "70%": {
            transform: "translate(3px, 2px) rotate(0deg)",
          },
          "80%": {
            transform: "translate(-1px, 2px) rotate(-1deg)",
          },
          "90%": {
            transform: "translate(3px, 1px) rotate(-1deg)",
          },
        },
        pop: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        push: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(0.9)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        smallShake: {
          "0%, 100%": {
            transform: "translateX(0) rotate(0deg)",
          },
          "15%, 35%, 60%, 85%": {
            transform: "translateX(-1px) rotate(-1deg)",
          },
          "25%, 50%, 75%": {
            transform: "translateX(1px) rotate(1deg)",
          },
        },
        growRotate: {
          "0%": {
            transform: "scale(1) rotate(0deg)",
          },
          "50%": {
            transform: "scale(1.1) rotate(30deg)",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
          },
        },
        growRotateOpposite: {
          "0%": {
            transform: "scale(1) rotate(0deg)",
          },
          "50%": {
            transform: "scale(1.1) rotate(-30deg)",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
          },
        },
        sweepToLeft: {
          "0%": {
            transform: "translateX(2%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        flip: {
          "0%": {
            transform: "perspective(400px) rotateY(0)",
            "animation-timing-function": "ease-out",
          },
          "40%": {
            transform: "perspective(400px)  rotateY(170deg)",
            "animation-timing-function": "ease-out",
          },
          "50%": {
            transform: "perspective(400px)  rotateY(190deg) scale(1)",
            "animation-timing-function": "ease-in",
          },
          "80%": {
            transform: "perspective(400px) rotateY(360deg) scale(.95)",
            "animation-timing-function": "ease-in",
          },
          "100%": {
            transform: "perspective(400px) scale(1)",
            "animation-timing-function": "ease-in",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
