// @ts-check

const { neutral } = require('tailwindcss/colors');

/**
 * @type {import('tailwindcss').Config}
 * */
const config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Londrina Solid', 'Noto Sans TC', 'cursive', 'sans-serif'],
      },
      colors: {
        gray: neutral,
      },
    },
  },
  plugins: [],
};

module.exports = config;
