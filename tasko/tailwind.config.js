/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
});

module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin"), nextui()],
};

