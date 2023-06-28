/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)'
      },
      colors: {
        green: {
          400: '#00B37E',
          500: '#015F43',
          600: '#00875F'
        },
        red: {
          500: '#F03847',
          600: '#7A1921'
        },
        gray: {
          100: '#121214',
          200: '#202024',
          300: '#323238',
          400: '#7C7C8A',
          500: '#8D8D99',
          600: '#C4C4CC',
          700: '#E1E1E6',
          800: '#FFFFFF'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
}
