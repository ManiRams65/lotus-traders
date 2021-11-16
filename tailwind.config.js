module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'primary': '#3d0d3c',
      'secondary': '#d3b357',
      'tertiary': '#ec018d',
     }),
     textColor: (theme) => ({
       ...theme('colors'),
      'primary': '#3d0d3c',
      'secondary': '#d3b357',
      'tertiary': '#ec018d',
    })
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
