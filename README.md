# Budget Bud

**Budget Bud** is a personal finance web app built with the 50/30/20 budgeting method in mind. This project uses:

- [Vite](https://vitejs.dev/) for fast React development
- [Tailwind CSS 3.4](https://tailwindcss.com/) for styling
- [DaisyUI 3.8](https://daisyui.com/) for themed UI components
- [Supabase](https://supabase.com/) for authentication and backend (coming soon)

---

## 🛠 Tech Stack

- React (Vite)
- Tailwind CSS (v3.4.3)
- DaisyUI (v3.8.0)
- PostCSS
- Node.js / npm

---

## 🧱 Installation Summary

```bash
# 1. Scaffold Vite + React app
npm create vite@latest budget-bud --template react
cd budget-bud
npm install

# 2. Install Tailwind 3, PostCSS, Autoprefixer, and DaisyUI
npm install -D tailwindcss@3.4.3 postcss@latest autoprefixer@latest
npm install daisyui@3.8.0
```

---

Manually created config files (CommonJS because "type": "module" in package.json):

tailwind.config.cjs

const daisyui = require("daisyui");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "luxury", "synthwave", "cupcake", "corporate"],
  },
};

postcss.config.cjs

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

Tailwind entry file: src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;

---

🚀 Starting the App (Fresh Machine)

# Clone the repo
git clone https://github.com/your-username/budget-bud.git
cd budget-bud

# Install dependencies
npm install

# Start the dev server
npm run dev

Then open: http://localhost:5173

---

🎨 Using DaisyUI Themes

Wrap your app layout in a theme selector:

<div data-theme="luxury" className="min-h-screen bg-base-100 text-base-content">
  {/* App content here */}
</div>

Your chosen theme must match one listed in tailwind.config.cjs
✅ You can swap themes by updating the data-theme attribute at runtime

---

Coming Soon

    ✅ Supabase integration

Login & registration

50/30/20 budget dashboard

Expense CSV import

Saving goal creation and tracking





ironside1987+test2@gmail.com
test22