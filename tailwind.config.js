/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SUIT", "Malgun Gothic", "Apple SD Gothic Neo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
