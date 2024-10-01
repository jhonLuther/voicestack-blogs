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
          'cs-100':"red",
          'bg-green':'#26A363',
          'cs-purple':'#8347CF',
          'cs-black':'#151515',
          'cs-gray-900':'#18181B',
          'cs-gray-800':'#38424D',
          'cs-gray-600':'#888E94',
          'cs-gray-500':'#52525B',
          'cs-gray':'#F6F6F3',
          'cs-lightGray-900':'#2D353E',

          'cs-darkBlack':'#000'

        },
        maxWidth:{
          '8xl':"80rem"
        },
        fontFamily:{
          'sans':['Inter', 'sans-serif'],
          'manrope':['Manrope', 'Inter', 'sans-serif']
        }

      },
    },
    plugins: [require('@tailwindcss/typography')],
    
  }