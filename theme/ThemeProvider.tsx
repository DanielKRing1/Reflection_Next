// Wrapper for Styled Components global ThemeProvider
// Also Injects Styled Components GlobalStyles

import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";

import { ThemeMode, lightTheme, darkTheme, GlobalStyles } from "./themeConfig";
import ThemeToggleProvider, { ThemeToggleContext } from "./ThemeToggle";

type MyThemeProviderProps = {
  children: React.ReactNode;
};
const MyThemeProvider = ({ children }: MyThemeProviderProps) => {
  const { mode } = useContext(ThemeToggleContext);

  return (
    <ThemeToggleProvider>
      <ThemeProvider theme={mode === ThemeMode.light ? lightTheme : darkTheme}>
        {/* Inject Globl styles */}
        <GlobalStyles />
        {/* Display current Page */}
        {children}
      </ThemeProvider>
    </ThemeToggleProvider>
  );
};

export default MyThemeProvider;
