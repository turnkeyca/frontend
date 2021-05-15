module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      teal: {
        light: '#D1FAE5',
        DEFAULT: '#34D399',
        dark: '#047857'
      },
      amber: {
        light: '#FEF3C7',
        DEFAULT: '#FBBF24',
        dark: '#B45309'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
