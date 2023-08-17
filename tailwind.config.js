import { blue, gray, red } from 'tailwindcss/colors'

export const content = [
  './demo/**/*.{vue,js,ts,jsx,tsx}',
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
  'node_modules/@fancy-crud/vue/*.{js,css}',
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
