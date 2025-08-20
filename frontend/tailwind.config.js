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
      themes: false
    },
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
      'xl': '1280px',
    },
  },
  plugins: [
    flowbitePlugin,
    flyonui
  ],
  variants: {
    extend: {
      backgroundColor: ['responsive'], // Ensure responsive is included
    },
  },
}