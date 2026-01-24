/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-orange-100",
    "bg-orange-600",
    "bg-orange-500",
    "bg-green-500",
    "bg-green-200",
    "bg-green-600",
    "bg-green-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
