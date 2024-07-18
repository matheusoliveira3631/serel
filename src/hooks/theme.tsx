import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme } from "styled-components/native";

import dark from "../theme/dark";
import light from "../theme/light";

interface IThemeContextData {
  handleSetTheme(themeChosen: "light" | "dark"): void;
  theme: DefaultTheme;
}
const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

export default function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState(light);

  const handleSetTheme = useCallback((themeChosen: "light" | "dark") => {
    AsyncStorage.setItem("@anabb-prev:theme", themeChosen);

    if (themeChosen === "dark") {
      setTheme(dark);
    } else {
      setTheme(light);
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@anabb-prev:theme").then((themeStorage: any) => {
      handleSetTheme(themeStorage || "dark");
    });
  }, [handleSetTheme]);

  return (
    <ThemeContext.Provider value={{ handleSetTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme(): IThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }

  return context;
}

export { ThemeProvider, useTheme };
