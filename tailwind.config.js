/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1c30",
        slate: "#213145",
        mist: "#f8f9ff",
        cloud: "#eff4ff",
        glass: "rgba(255, 255, 255, 0.78)",
        orange: "#ff6b00",
        orangeDeep: "#a04100",
        teal: "#00b4d8",
        tealDeep: "#00677d",
      },
      boxShadow: {
        ambient: "0 24px 80px rgba(15, 23, 42, 0.16)",
        glow: "0 18px 50px rgba(255, 107, 0, 0.22)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "premium-radial":
          "linear-gradient(135deg, #f8f9ff 0%, #eff4ff 48%, #ffffff 100%)",
      },
    },
  },
  plugins: [],
};
