import { useAppState } from "../context/AppStateContext.jsx";

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useAppState();
  return { theme, setTheme, toggleTheme };
}
