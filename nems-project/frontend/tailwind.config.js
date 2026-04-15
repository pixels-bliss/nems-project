module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        secondary: "#E5E5E5",
        surface: "#F7F7F7",
        error: "#E53E3E",
        success: "#38A169",
        warning: "#D69E2E",
        info: "#3182CE"
      },
      fontFamily: {
        heading: ["'Chivo'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      borderRadius: { none: "0px" },
      boxShadow: {
        brutalist: "4px 4px 0 0 #111111",
        brutalistRed: "4px 4px 0 0 #E53E3E"
      }
    }
  },
  plugins: []
};