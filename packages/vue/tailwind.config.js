/** @type {import('tailwindcss').Config} */
import { blue, gray, red } from 'tailwindcss/colors'

export const content = [
  './src/**/*.{vue,js,ts,jsx,tsx}',
]
export const theme = {
  extend: {
    colors: {
      primary: blue,
      danger: red,
      inactive: gray,
    },
  },
}
export const plugins = []
