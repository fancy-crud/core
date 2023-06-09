const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './demo/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      primary: colors.blue,
      danger: colors.red,
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
