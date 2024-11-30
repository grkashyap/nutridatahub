/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: { 
        backgroundColor: theme => ({
          ...theme('color'),
          'brown': '#f0eadf'
        })
       },
    },
    plugins: [],
  }