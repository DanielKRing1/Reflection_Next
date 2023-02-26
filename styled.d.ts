import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    body: HexColor;
    text: HexColor;
    border: HexColor;
    background: HexColor;

    colors: {
      main: string;
      accent: string;
    };
    fonts: {
      main: string;
      fallback: string;
    };
  }
}
