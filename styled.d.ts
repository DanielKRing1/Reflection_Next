import "styled-components";
import { HexColor } from "./types/global";

declare module "styled-components" {
  export interface DefaultTheme {
    body: HexColor;
    text: HexColor;
    border: HexColor;
    background: HexColor;

    colors: {
      main: HexColor;
      accent: HexColor;
      text: HexColor;
    };
    fonts: {
      main: string;
      fallback: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
