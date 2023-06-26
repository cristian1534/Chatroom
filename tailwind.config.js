/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(159, 143, 239)',
        'secondary': 'rgb(53 57 61/var(--tw-bg-opacity))',
        'third': 'rgb(167 163 208/var(--tw-text-opacity));'
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
