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
      'primary-one': '#E868A3',
      'primary-two': '#E9C8DD',
      'primary-three': '#EC6AA6',
      'primary-four': '#E872A8',
      'secondary-one': '#D6B62C',
      'secondary-two': '#FEEC58',
      'secondary-three': '#BF902D',
      'tertiary': '#808285'
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      'primary-one': '#E868A3',
      'primary-two': '#E9C8DD',
      'primary-three': '#EC6AA6',
      'primary-four': '#E872A8',
      'secondary-one': '#D6B62C',
      'secondary-two': '#FEEC58',
      'secondary-three': '#BF902D',
      'tertiary': '#808285'
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
