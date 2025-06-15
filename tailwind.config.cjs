const daisyui = require("daisyui");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "luxury", "synthwave", "cupcake", "corporate", "dark", "wireframe"],
  },
};
