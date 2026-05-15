import { useAppState } from "../../context/AppStateContext.jsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppState();
  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" onClick={toggleTheme} className="btn-pill-header" aria-label={label}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
