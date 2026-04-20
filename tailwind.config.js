/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  safelist: [
    // Accent classes built from template strings at runtime. Safelist so the
    // JIT emits the full set regardless of static occurrence in source.
    { pattern: /^(text|bg|border|from|via|to|stroke|fill)-(wood|fire|earth|metal|water)(\/(10|15|20|25|30|40|50|60|70|80|90))?$/ },
  ],
  theme: {
    extend: {
      colors: {
        // Five Elements accent palette.
        wood:  { DEFAULT: "#2f8f5e", soft: "#d5ebd9" },
        fire:  { DEFAULT: "#c8382d", soft: "#f7dad6" },
        earth: { DEFAULT: "#b8864b", soft: "#f1e3c9" },
        metal: { DEFAULT: "#9ea3a8", soft: "#ececec" },
        water: { DEFAULT: "#1e4f7a", soft: "#d6e3ef" },

        ink: "#1a1a1a",
        parchment: "#faf6ed",
        muted: "#6b6b6b",
      },
      fontFamily: {
        display: ['"Noto Serif SC"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
