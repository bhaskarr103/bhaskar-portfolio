import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#EDEDED",
        surface: {
          DEFAULT: "#121212",
          card: "#141416",
          elevated: "#18181B",
          border: "#232326",
        },
        accent: {
          DEFAULT: "#00F0FF",
          cyan: "#00F0FF",
          orange: "#FF5500",
          amber: "#FFB800",
        },
        muted: {
          DEFAULT: "#8E8E93",
          dark: "#52525B",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "Geist", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Space Mono", "monospace"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
