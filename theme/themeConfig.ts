import { DefaultTheme, createGlobalStyle } from "styled-components";

// MODES
export enum ThemeMode {
  light,
  dark,
}

// THEMES
export const lightTheme: DefaultTheme = {
  body: "#FFF",
  text: "#363537",
  border: "#FFF",
  background: "#363537",

  colors: {
    main: "#f5f2f3",
    accent: "#b19cd9",
  },
  fonts: {
    main: "sans-serif",
    fallback: "Roboto",
  },
};

export const darkTheme: DefaultTheme = {
  body: "#363537",
  text: "#FAFAFA",
  border: "#6B8096",
  background: "#999",

  colors: {
    main: "#f5f2f3",
    accent: "#b19cd9",
  },
  fonts: {
    main: "sans-serif",
    fallback: "Roboto",
  },
};

// GLOBAL STYLESHEET
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`;
