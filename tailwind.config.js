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
          'cs-gray-100':'#D4D4D8',
          'cs-gray-800':'#38424D',
          'cs-gray-700':'#606871',
          'cs-gray-600':'#888E94',
          'cs-gray-500':'#52525B',
          'cs-gray-400':'#A1A1AA',
          'cs-gray-300':'#E7E8E9',
          'cs-gray-200':'#374151',
          'cs-gray':'#F6F6F3',
          'cs-lightGray-900':'#2D353E',
          'cs-darkBlack':'#000',
          'cs-green' : '#277E78',
          'cs-green-200' : '#42BA78',
          'cs-dark-500' : '#202124',
          'cs-primary' : '#42BA78'
        },

        maxWidth:{
          '9xl':"82rem"
        },

        fontFamily:{
          'sans':['Inter', 'sans-serif'],
          'manrope':['Manrope', 'Inter', 'sans-serif']
        },

        backgroundImage: {
          'gradient-text': 'linear-gradient(90deg, #FEF08A 0%, #60A5FA 100%)',  
        },

        letterSpacing: {
          tighterText: '-0.48px',
        },

      },
    },
    plugins: [require('@tailwindcss/typography')],
    
  }