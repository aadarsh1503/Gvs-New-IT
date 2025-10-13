const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'display': ['Bebas Neue', 'cursive'],
        'script': ['Caveat', 'cursive'],
        'jost': ['Jost', 'sans-serif'], // ✅ Added Jost font
      },
      colors: {
        // Colors picked from the image
        'brand-teal': '#28a994',
        'brand-bg': '#f8f5f1',
        'brand-pink': '#EF3365',
        'brand-background': '#FAF6F1',
      },
    },
  },
  plugins: [
    // Plugin to add the text-stroke utility
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke': `2px ${theme('colors.black')}`,
        },
        '.text-stroke-sm': {
          '-webkit-text-stroke': `1px ${theme('colors.black')}`,
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
}
