module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E9EFEC',
          200: '#C4DAD2',
          300: '#6A9C89',
          400: '#16423C',
        }
      }
    },
  },
  plugins: [],
}
