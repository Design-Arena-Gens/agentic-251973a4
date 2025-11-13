/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f8fafc",
        accent: {
          DEFAULT: "#38bdf8",
          soft: "#1d4ed8"
        },
        muted: "rgba(148, 163, 184, 0.6)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        "pulse-glow": {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(56, 189, 248, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(56, 189, 248, 0)' }
        }
      },
      animation: {
        glow: 'pulse-glow 4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
