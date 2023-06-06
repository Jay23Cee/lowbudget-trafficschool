/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "my-background-image": "url('/path/to/your/background-image.jpg')",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "325px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1280px",
      },
      colors: {
        brand: {
          primary: "#fd4c1d",
          secoundary: "",
        },
        white: {
          main: "#FFFFFF",
          off: "#f5f5f5",
          cool: "#faf4ff",
        },
        black: {
          main: "#000000",
        },
      },
    },
  },
  plugins: [],
};
