// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandCream: "#fff6ef",
        brandPink: "#d8a5c7",
        candy: "#f2a6c6",
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
        sans: ["Quicksand", "sans-serif"],
        script: ["Dancing Script", "cursive"],
      },
      borderRadius: {
        ui: "1.5rem",
        card: "1.75rem",
        blob: "42% 58% 65% 35% / 45% 40% 60% 55%",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(154, 124, 149, 0.12)",
        float: "0 24px 60px rgba(154, 124, 149, 0.16)",
        insetSoft: "inset 0 1px 0 rgba(255,255,255,0.6)",
        candyGlow: "0 20px 45px rgba(242, 166, 198, 0.28)",
      },
      spacing: {
        18: "4.5rem",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.06)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 2.4s ease-in-out infinite",
        "pop-in": "popIn 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "spin-slow": "spinSlow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
