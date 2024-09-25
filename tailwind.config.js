/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
      },
      colors: {
        "black-rgba": "rgba(17, 25, 40, 0.75)",
        "black-rgba5": "rgba(17, 25, 40, 0.5)",
      },
    },
  },
  plugins: [],
};
