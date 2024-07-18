import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: "dark" | "light";

    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      background: string;

      backgroundButton: string;
      backgroundButtonSelected: string;
      backgroundButtonActions: string;

      textPrimary: string;
      textSecondary: string;

      input: string;
      inputBorder: string;

      card: string;

      danger: string;
    };
  }
}
