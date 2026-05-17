/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0071e3',
          'blue-hover': '#0077ed',
          text: '#1d1d1f',
          'text-secondary': '#6e6e73',
          'text-tertiary': '#86868b',
          link: '#06c',
          bg: '#fbfbfd',
          'bg-secondary': '#f5f5f7',
          border: '#d2d2d7',
          'border-light': '#e8e8ed',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
