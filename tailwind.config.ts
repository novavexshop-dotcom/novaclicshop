import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#e03030",
        "red-bright": "#ff4040",
        "red-dim": "#b02020",
        bg: "#080808",
        "bg2": "#0f0f0f",
        "bg3": "#141414",
        card: "#111111",
        border: "rgba(255, 255, 255, 0.07)",
        text: "#f0f0f0",
        muted: "rgba(255, 255, 255, 0.45)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
