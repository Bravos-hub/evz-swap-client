/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evz: {
          primary: '#03cd8c',
          accent: '#f77f00',
          bg: '#ffffff',
          surfaceSoft: '#f2f2f2',
          textPrimary: '#111827',
          textSecondary: '#6b7280',
          borderSubtle: 'rgba(15, 23, 42, 0.08)',
        }
      }
    },
  },
  plugins: [],
}
