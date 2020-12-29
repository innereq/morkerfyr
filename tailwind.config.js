module.exports = {
  purge: [
    "./content/*.md",
    "./content/**/*.md",
    "./layouts/*.html",
    "./layouts/**/*.html"
  ],
  plugins: [
    require('@tailwindcss/typography')
  ],
  darkMode: "class"
};