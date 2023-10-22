import { blue, gray, red } from 'tailwindcss/colors'

export const content = [
  './viewer/**/*.{vue,js,ts,sass}',
  // './node_modules/@fancy-crud/vue/**/*.{vue,js,ts,sass}',
  // './node_modules/@fancy-crud/oruga-wrapper/**/*.{vue,js,ts,sass}',
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
