// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandCream: "#FFF2E8",
        brandPink: "#C88DBF",
        lavender: "#EAD7EA",
        accent: "#B895C2",
        plum: "#8F6AA6",
        ink: "#2E2A2F",
        muted: "#6B5E6E",
        softBg: "#FFF6FB",
        hapi: {
          pink: "#C88DBF",
          light: "#FFF6FB",
          purple: "#B895C2",
          dark: "#8F6AA6",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        script: ["Magnolia Script", "cursive"],
      },
    },
  },
  plugins: [],
};
