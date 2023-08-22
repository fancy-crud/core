import { blue, gray, red } from 'tailwindcss/colors'

export const content = [
  './src/**/*.{vue,js,ts}',
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
