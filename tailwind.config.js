module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"] ,
        Bricolage : ["Bricolage Grotesque", "sans-serif"],
        Mulish : ["Mulish", "sans-serif"],
        Besley : ["Besley", "serif"],
        Outfit : ["Outfit", "sans-serif"],
        Playwrite : ["Playwrite HR Lijeva", "cursive"],
        raleway : ["Raleway", "sans-serif"]
      },
      colors: {
        primary: '#b73034',
        secondary: '#d2ab66',
        white: '#ffffff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}