/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        background: {
          light: '#FFFFFF',
          dark: '#121212',
        },
        text: {
          light: '#000000',
          dark: '#FFFFFF',
        },
        secondary: '#151312',
        light: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',      
        },
        dark: {
          100: '#1A1A1A',
          200: '#2C2C2C',
          300: '#3F3F3F',
        },
      },
    },
  },
  plugins: [],
}

