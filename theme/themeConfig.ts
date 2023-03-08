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
    text: "#000000",
  },
  fonts: {
    main: "sans-serif",
    fallback: "Roboto",
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
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
    text: "#ffffff",
  },
  fonts: {
    main: "sans-serif",
    fallback: "Roboto",
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
  },
};

// GLOBAL STYLESHEET
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
  }

  * {
    -webkit-transition: all 500ms ease-in-out;
    -moz-transition: all 500ms ease-in-out;
    -o-transition: all 500ms ease-in-out;
    transition: all 500ms ease-in-out;
  }

  button {
    border-style: solid;
  }
`;
