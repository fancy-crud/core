import { blue, red } from 'tailwindcss/colors'

export const content = [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
  // './demo/**/*.{vue,js,ts,jsx,tsx}',
]
export const theme = {
  extend: {},
  colors: {
    primary: blue,
    danger: red,
  },
}
export const plugins = []
