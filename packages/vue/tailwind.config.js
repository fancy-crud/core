/** @type {import('tailwindcss').Config} */
import { blue, gray, red, slate } from 'tailwindcss/colors'

export const content = [
  './src/**/*.{vue,js,ts}',
]
export const theme = {
  extend: {
    colors: {
      primary: blue,
      danger: red,
      inactive: gray,
      default: slate,
    },
  },
}
export const plugins = []
