/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
   
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {

        colors:{
          'cs-100':"red"
        },
        maxWidth:{
          '8xl':"80rem"
        },
        fontFamily:{
          'sans':['Inter', 'sans-serif'],
          'manrope':['Manrope', 'Inter', 'sans-serif']
        }

      },
      extend: {},
    },
    plugins: [],
    
  }