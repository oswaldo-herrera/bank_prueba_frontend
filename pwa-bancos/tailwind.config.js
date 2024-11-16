// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Ruta de tu archivo HTML
    "./src/**/*.{js,ts,jsx,tsx}", // Rutas de los archivos que contienen clases Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
