/** @type {import('tailwindcss').Config} */

import { blue, gray, red, slate } from 'tailwindcss/colors'

module.exports = {
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{vue,js,ts,sass,scss}',
    './node_modules/@fancy-crud/vue/**/*.{js,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { ...blue, DEFAULT: blue[500], dark: blue[800] },
        danger: red,
        inactive: gray,
        default: slate,
      },
    },
  },
  plugins: [],
}
