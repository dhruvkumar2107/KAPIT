/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        plex: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        primary: "#1E3A8A",
        primary_foreground: "#FFFFFF",
        secondary: "#E2E8F0",
        secondary_foreground: "#1E293B",
        accent: "#0F172A",
        accent_foreground: "#F8FAFC",
        muted: "#F1F5F9",
        muted_foreground: "#64748B",
        border: "#E2E8F0",
      }
    },
  },
  plugins: [],
}
