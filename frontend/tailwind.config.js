module.exports = {
  purge: ["./src/**/*.{vue,js}",
   "./node_modules/tw-elements/dist/js/**/*.js",
   "./node_modules/litepie-datepicker/**/*.js"],
  darkMode: false, // or 'media' or 'class',
  plugins: [
    require("tw-elements/dist/plugin"),

  ],
  variants: {
    extend: {
      cursor: ["disabled"],
      textOpacity: ["disabled"],
      textColor: ["disabled"]
    }
  }
};
