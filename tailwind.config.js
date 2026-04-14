/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/react/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Inter Display", "system-ui", "sans-serif"],
        display: ["'Bricolage Grotesque'", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        /* ── exact tokens from reference ── */
        bg:       "#000000",
        surface:  "#0d0d0d",
        surface2: "#0f0f0f",
        muted:    "#c2c2c2",
        muted2:   "#8a8a8a",
        acc:      "#fa8039",
      },
      fontSize: {
        /* exact values from reference presets */
        "h1":   ["56px", { lineHeight: "1.1em",  letterSpacing: "-0.04em", fontWeight: "400" }],
        "h1-lg":["40px", { lineHeight: "1.1em",  letterSpacing: "-0.04em", fontWeight: "400" }],
        "h2":   ["36px", { lineHeight: "1.1em", letterSpacing: "-0.03em", fontWeight: "400" }],
        "lg-b": ["20px", { lineHeight: "1.3em", letterSpacing: "-0.02em", fontWeight: "500" }],
        "lg":   ["20px", { lineHeight: "1.3em", letterSpacing: "-0.02em", fontWeight: "400" }],
        "base": ["16px", { lineHeight: "1.4em", letterSpacing: "0",       fontWeight: "400" }],
        "sm":   ["14px", { lineHeight: "1.3em", letterSpacing: "0",       fontWeight: "400" }],
        "xs":   ["12px", { lineHeight: "1.3em", letterSpacing: "0",       fontWeight: "400" }],
      },
      maxWidth: {
        container: "1128px",
      },
      padding: {
        section: "128px",
        "section-tablet": "80px",
        "section-mobile": "64px",
      },
      borderRadius: {
        card: "24px",
        "card-lg": "32px",
      },
      backgroundImage: {
        none: "none",
      },
    },
  },
  plugins: [],
};
