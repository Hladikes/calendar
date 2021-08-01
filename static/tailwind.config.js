const { colors: defaultColors } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./public/index.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: content => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
        ...(content.match(/([a-zA-Z0-9\-]{1,})=/g) || []).map(s=>s.substr(0,s.length-1))
      ],
    }
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cool-gray': {
          '50': '#fafafa',
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
          '950': '#151515',
          '1000': '#111111',
          '1100': '#050505'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
