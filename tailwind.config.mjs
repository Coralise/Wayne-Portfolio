/** @type {import('tailwindcss').Config} */
export default {
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
        red: "#F13751",
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
        }
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require('tailwindcss-motion')
  ],
};
