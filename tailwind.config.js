// primary: "#DEE5FFcd",
// secondary: "#1e3239",
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#91B3FA',
        secondary: '#DEE5FF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
