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
      },
      keyframes: {
        slideRight: {
            "0%": {
                transform: "translateX(-2rem)"
            },
            "100%": {
                transform: "translateX(0)"
            }
        },
        scaleOut: {
            "0%": {
                transform: "scale(1.1, 1.1)"
            },
            "100%": {
                transform: "none"
            }
        },
        blurOut: {
            "0%": {
                filter: "blur(5px)"
            },
            "100%": {
                filter: "blur(0)"
            }
        },
        fadeIn: {
            "0%": {
                opacity: "0"
            },
            "100%": {
                opacity: "1"
            }
        },
        fadeInOut: {
            "0%": {
                opacity: "0"
            },
            "50%": {
                opacity: "1"
            },
            "100%": {
                opacity: "0"
            }
        },
        wiggle: {
          "0%": {
            transform: "translate(-.3rem, -.3rem) rotate(-2.5deg)"
          },
          "25%": {
            transform: "translate(.3rem, -.3rem) rotate(2.5deg)"
          },
          "50%": {
            transform: "translate(-.3rem, .3rem) rotate(-2.5deg)"
          },
          "75%": {
            transform: "translate(.3rem, .3rem) rotate(2.5deg)"
          },
          "100%": {
            transform: "translate(-.3rem, -.3rem) rotate(-2.5deg)"
          }
        },
        slideRightFadeIn: {
          "0%": {
              transform: "translateX(-2rem)",
              opacity: "0"
          },
          "100%": {
              transform: "translateX(0)",
              opacity: "1"
          }
        },
        slideLeftFadeIn: {
          "0%": {
              transform: "translateX(2rem)",
              opacity: "0"
          },
          "100%": {
              transform: "translateX(0)",
              opacity: "1"
          }
        },
        slideBottomFadeIn: {
          "0%": {
              transform: "translateY(2rem)",
              opacity: "0"
          },
          "100%": {
              transform: "translateY(0)",
              opacity: "1"
          }
        },
        slideTopFadeIn: {
          "0%": {
              transform: "translateY(-2rem)",
              opacity: "0"
          },
          "100%": {
              transform: "translateY(0)",
              opacity: "1"
          }
        }      
      },
      animation: {
        "slideRight": "slideRight 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideRight-50": "slideRight 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "slideRight-75": "slideRight 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideRight-100": "slideRight 1s cubic-bezier(0.5, 0, 0, 1)",
        "scaleOut": "scaleOut 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "scaleOut-50": "scaleOut 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "scaleOut-75": "scaleOut 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "scaleOut-100": "scaleOut 1s cubic-bezier(0.5, 0, 0, 1)",
        "blurOut": "blurOut 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "blurOut-50": "blurOut 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "blurOut-75": "blurOut 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "blurOut-100": "blurOut 1s cubic-bezier(0.5, 0, 0, 1)",
        "fadeIn": "fadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "fadeIn-50": "fadeIn 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "fadeIn-75": "fadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "fadeIn-100": "fadeIn 1s cubic-bezier(0.5, 0, 0, 1)",
        "fadeInOut": "fadeInOut 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "fadeInOut-50": "fadeInOut 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "fadeInOut-75": "fadeInOut 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "fadeInOut-100": "fadeInOut 1s cubic-bezier(0.5, 0, 0, 1)",
        "wiggle": "wiggle 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "wiggle-50": "wiggle 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "wiggle-75": "wiggle 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "wiggle-100": "wiggle 1s cubic-bezier(0.5, 0, 0, 1)",
        "slideRightFadeIn": "slideRightFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideRightFadeIn-50": "slideRightFadeIn 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "slideRightFadeIn-75": "slideRightFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideRightFadeIn-100": "slideRightFadeIn 1s cubic-bezier(0.5, 0, 0, 1)",
        "slideLeftFadeIn": "slideLeftFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideLeftFadeIn-50": "slideLeftFadeIn 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "slideLeftFadeIn-75": "slideLeftFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideLeftFadeIn-100": "slideLeftFadeIn 1s cubic-bezier(0.5, 0, 0, 1)",
        "slideBottomFadeIn": "slideBottomFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideBottomFadeIn-50": "slideBottomFadeIn 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "slideBottomFadeIn-75": "slideBottomFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideBottomFadeIn-100": "slideBottomFadeIn 1s cubic-bezier(0.5, 0, 0, 1)",
        "slideTopFadeIn": "slideTopFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideTopFadeIn-50": "slideTopFadeIn 0.5s cubic-bezier(0.5, 0, 0, 1)",
        "slideTopFadeIn-75": "slideTopFadeIn 0.75s cubic-bezier(0.5, 0, 0, 1)",
        "slideTopFadeIn-100": "slideTopFadeIn 1s cubic-bezier(0.5, 0, 0, 1)"
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
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
