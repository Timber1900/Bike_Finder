module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'green-gradient-1a': '#52B788',
        'green-gradient-1b': '#40916C',
        'green-gradient-2a': '#38A3A5',
        'green-gradient-2b': '#57CC99',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
