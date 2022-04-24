const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      primary: colors.blue,
    },
  },
  plugins: [
    // require('daisyui')
    require('flowbite/plugin'),
  ],
}
