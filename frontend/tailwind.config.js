// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandCream: "#fff6ef",
        brandPink: "#d8a5c7",
        lavender: "#e8d9f1",
        accent: "#c69ac7",
        accentStrong: "#8f5f97",
        plum: "#6e5575",
        ink: "#463544",
        muted: "#7d6a79",
        softBg: "#fff8fc",
        cream: "#fffaf5",
        hapi: {
          pink: "#d8a5c7",
          light: "#fff8fc",
          purple: "#c69ac7",
          dark: "#6e5575",
        },
        surface: "#fffaf5",
        "surface-elevated": "#fffdf9",
        "accent-soft": "#f7e8f4",
        "border-soft": "#eadbe7",
        "text-primary": "#463544",
        "text-secondary": "#7d6a79",
        success: "#7daf9a",
        danger: "#d18198",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        script: ["Magnolia Script", "cursive"],
      },
      borderRadius: {
        ui: "1.5rem",
        card: "1.75rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(154, 124, 149, 0.12)",
        float: "0 24px 60px rgba(154, 124, 149, 0.16)",
        insetSoft: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      spacing: {
        18: "4.5rem",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
