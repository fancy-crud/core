import { blue, gray, red } from 'tailwindcss/colors'

export const content = [
  './src/**/*.{vue,js,ts}',
]

export const theme = {
  extend: {
    colors: {
      primary: blue,
      danger: red,
      inactive: gray,
      default: gray[300],
    },
  },
}
export const plugins = []
