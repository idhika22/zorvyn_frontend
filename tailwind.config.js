/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#98E5DD",   
        accent: "#EEB58F",    
        dark: "#111313",
        bg: "#f5f5f5",        
      },
    },
  },
  plugins: [],
}

