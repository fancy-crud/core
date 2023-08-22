import { blue, gray, red } from 'tailwindcss/colors'

export const content = [
  './viewer/**/*.{vue,js,ts,sass}',
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
