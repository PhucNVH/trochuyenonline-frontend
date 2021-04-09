module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#00f4a6cd",
        secondary: "#1e3239",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
