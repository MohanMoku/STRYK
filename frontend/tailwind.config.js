/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
import flyonui from 'flyonui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flyonui/dist/js/*.js"
  ],
  theme: {
    extend: {},
    flyonui: {
      themes: [/* optional custom themes, see docs */]
    },
  },
  plugins: [
    flowbitePlugin,
    flyonui
  ],
}