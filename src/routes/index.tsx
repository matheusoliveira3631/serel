import { SafeAreaView, StyleSheet, Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { useAuth } from "../hooks/auth";
import { useTheme } from "../hooks/theme";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

export default function Routes() {
  const { isSigned } = useAuth();
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {Platform.OS === "android" ? (
          <StatusBar style={theme.title === "dark" ? "light" : "dark"} />
        ) : (
          <StatusBar style="inverted" />
        )}

        <NavigationContainer>
          {isSigned ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
