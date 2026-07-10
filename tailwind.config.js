/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        xs: '325px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1280px',
      },
      colors: {
        brand: {
          main: '#FFD400',
          ink: '#0A0A0A',
          primary: '#FFD400',
          'primary-hover': '#F5C400',
          accent: '#C58B00',
          'accent-soft': '#FFF6BF',
          surface: '#F7F5ED',
          'surface-alt': '#FFF3A3',
          border: '#D6D0BA',
          'border-strong': '#8A846F',
          success: '#246B3D',
          secondary: '#FFD400',
        },

        white: {
          DEFAULT: '#FFFFFF',
          main: '#FFFFFF',
          off: '#f5f5f5',
          cool: '#faf4ff',
        },
        black: {
          DEFAULT: '#000000',
          main: '#000000',
        },
      },
    },
  },
  plugins: [],
}
