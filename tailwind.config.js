/** @type {import('tailwindcss').Config} */
const tailwindcssMotion = require('tailwindcss-motion');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-2nd": "var(--foreground-2nd)",
        highlight: "var(--highlight)",
        highlighter: "var(--highlighter)",
        "highlighter-2nd": "var(--highlighter-2nd)",
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        lg: '4px 4px 6px rgba(0, 0, 0, 0.7)',
        none: 'none',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
        },
        ".text-shadow-lg": {
          textShadow: "4px 4px 6px rgba(0, 0, 0, 0.7)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        ".box-shadow": {
          boxShadow: "0px 5px 9px 0px rgba(0,0,0,0.1),0px 20px 35px 2px rgba(0,0,0,0.1),0px 9px 17px 12px rgba(0,0,0,0.1)"
        },
        ".box-shadow-glass": {
          boxShadow: "inset 5px 5px 3px -4px rgba(255,255,255,1),0px 10px 13px -4px rgba(0,0,0,0.5)"
        },
        ".flex-2": {
          flex: "2"
        },
        ".highlighter-shadow": {
          boxShadow: "0px 0px 20px 1px var(--highlighter)"
        },
        ".font-barlow": {
          fontFamily: "var(--font-barlow)"
        },
        ".font-barlow-condensed": {
          fontFamily: "var(--font-barlow-condensed)"
        },
        ".font-sour-gummy": {
          fontFamily: "var(--font-sour-gummy)"
        },
        ".neumorphic-bevel": {
          borderRadius: "1rem",
          backgroundImage: "linear-gradient(145deg, #cacaca, #f0f0f0)",
          boxShadow:  "5px 5px 10px #bebebe, -5px -5px 10px #ffffff"
        },
        ".neumorphic-emboss": {
          borderRadius: "1rem",
          backgroundImage: "linear-gradient(145deg, #f0f0f0, #cacaca)",
          boxShadow:  "5px 5px 10px #bebebe, -5px -5px 10px #ffffff"
        }
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    tailwindcssMotion
  ],
};
