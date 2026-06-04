/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary green scale (wellness / trust)
        brand: {
          50: "#f3f7f3",
          100: "#e4efe5",
          200: "#c8dccb",
          300: "#a1c0a6",
          400: "#719c79",
          500: "#4f8059", // primary
          600: "#3c6646",
          700: "#315139",
          800: "#294230",
          900: "#233729",
        },
        // Warm neutrals
        cream: "#FBF8F2",
        sand: "#F2EBDD",
        ink: "#2C3530",
        clay: "#C97C5D", // warm accent
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(47, 74, 60, 0.18)",
        card: "0 8px 30px -10px rgba(44, 53, 48, 0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
