import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import sound from "../utils/soundEngine";

export const THEMES = [
  { id: "obsidian", label: "Obsidian", icon: "🌌", description: "Deep cosmic violet & electric cyan" },
  { id: "cyberpunk", label: "Cyberpunk", icon: "⚡", description: "Neon yellow, hot pink & hyper cyan" },
  { id: "matrix", label: "Matrix", icon: "🟢", description: "Terminal CRT phosphor green" },
  { id: "dracula", label: "Dracula", icon: "🧛", description: "Curated gothic purple & soft cyan" },
];

const ThemeContext = createContext({
  theme: "obsidian",
  setTheme: () => {},
  cycleTheme: () => {},
  availableThemes: THEMES,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_theme");
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    }
    return "obsidian";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("portfolio_theme", theme);
    }
  }, [theme]);

  const setTheme = useCallback((newTheme) => {
    if (THEMES.some((t) => t.id === newTheme)) {
      setThemeState(newTheme);
      sound.playToggle();
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const currentIndex = THEMES.findIndex((t) => t.id === prev);
      const nextTheme = THEMES[(currentIndex + 1) % THEMES.length].id;
      sound.playToggle();
      return nextTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, availableThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
