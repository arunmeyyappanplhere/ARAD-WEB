# ARAD Dashboard — React Setup

## 1. Install dependencies

```bash
npm install react-router-dom chart.js
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/container-queries
```

## 2. Drop in the files

Place them in your project like this:

```
src/
  App.jsx
  index.css
  components/
    TopNavBar.jsx
    RightSideBar.jsx
  pages/
    DashboardPage.jsx
    EmergenciesPage.jsx
    TeamsPage.jsx
    AnalyticsPage.jsx
    DevicesPage.jsx
tailwind.config.js   (project root)
```

Replace your existing `src/index.css` (or `App.css`) with the one provided, and make sure it's imported once in your entry file (`main.jsx`):

```jsx
import './index.css';
```

Replace your project's `tailwind.config.js` with the one provided — it carries all the custom design tokens (colors, spacing, fonts) the components rely on.

## 3. Notes

- **Routing**: `App.jsx` uses `HashRouter` from `react-router-dom` so it works without any server config. Swap to `BrowserRouter` if your host supports client-side routing rewrites.
- **Icons**: Uses Google's "Material Symbols Outlined" ligature font (loaded via `index.css`), matching the original design. Each icon is just a `<span className="material-symbols-outlined">icon_name</span>`.
- **Charts**: `AnalyticsPage.jsx` uses `chart.js` directly (`chart.js/auto` import) instead of the CDN `<script>` tag. If you'd rather use `react-chartjs-2`, the chart configs are all there to adapt.
- **Images**: placeholder photography URLs from the original mockup were kept as-is — swap in your own assets when ready.
- All `class` attributes from the original HTML were converted to `className`, and everything is standard JSX (no `React.createElement` calls).