/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".title_page": {
          color: "#275DE3",
          marginBottom: "0.75rem",
          marginTop: "0.5rem",
          fontSize: "1.5rem",
          lineHeight: "2rem",
          textTransform: "uppercase",
          fontWeight: "600",
        },
      });
    },
  ],
};
