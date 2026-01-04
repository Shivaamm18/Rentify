/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          primary: {
            DEFAULT: '#2563EB',
            hover: '#1D4ED8',
          },
        secondary: {
          DEFAULT: '#009587',
          hover: '#00796b',
        },
        text: {
          main: '#464646',
          muted: '#666666',
        },
        page: {
          bg: '#F2F2F2',
          border: '#D4D4D4',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0,0,0,0.1)',
        'heavy': '0 4px 8px 0 rgba(0,0,0,0.15)',
        'search': '0 4px 20px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'nb': '4px',
      },
    },
  },
  plugins: [],
}
