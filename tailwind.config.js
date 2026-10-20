/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#123F67',       // Azul marino principal
          electric: '#2675F5',   // Azul eléctrico para acciones
          surface: '#F2F6FA',    // Gris azulado para fondos
          muted: '#64748B',      // Gris para textos secundarios
          dark: '#0B1F33',       // Azul oscuro para títulos
          light: '#FFFFFF',
          hoverElectric: '#1a64db',
          hoverNavy: '#0c2d4b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 63, 103, 0.08)',
        'card': '0 10px 30px -4px rgba(11, 31, 51, 0.06), 0 4px 6px -2px rgba(11, 31, 51, 0.03)',
        'floating': '0 20px 40px -15px rgba(38, 117, 245, 0.25)',
      }
    },
  },
  plugins: [],
}
