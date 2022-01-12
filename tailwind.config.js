module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic': 'Comic Neue'
      }
    },
    listStyleType: { none: "none" },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
