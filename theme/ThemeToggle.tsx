import React, { createContext, useState } from "react";

import { ThemeMode } from "./themeConfig";

// CONTEXT
type ThemeToggleContextType = {
  mode: ThemeMode;
  toggleMode: () => void;
};
export const ThemeToggleContext: React.Context<ThemeToggleContextType> =
  createContext<ThemeToggleContextType>({
    mode: ThemeMode.light,
    toggleMode: () => {},
  });

// PROVIDER
type ThemeToggleProviderProps = {
  children: React.ReactNode;
};
const ThemeToggleProvider = ({ children }: ThemeToggleProviderProps) => {
  const [mode, setMode] = useState(ThemeMode.light);

  const toggleMode = () =>
    mode === ThemeMode.light
      ? setMode(ThemeMode.dark)
      : setMode(ThemeMode.light);

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};

export default ThemeToggleProvider;
