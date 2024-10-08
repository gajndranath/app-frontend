/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        pink: "#FF7DB0",
        pinkHover: "#FFF0F5",
        cyan: "#84EBE1",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
