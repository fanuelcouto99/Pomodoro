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
          300: '#00B37E',
          500: '#00875F',
          600: '#015F43'
        },
        red: {
          500: '#AB222E',
          700: '#7A1921'
        },
        gray: {
          100: '#E1E1E6',
          300: '#C4C4CC',
          400: '#8D8D99',
          500: '#7C7C8A',
          600: '#323238',
          700: '#29292E',
          800: '#202024',
          900: '#121214',
        },
        yellow: {
          500: '#FBA94C'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
}
