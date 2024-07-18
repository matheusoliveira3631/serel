import { ReactNode } from "react";

import { AuthProvider } from "./auth";
import SubscriptionsProvider from "./subscriptions";
import ThemeProvider from "./theme";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SubscriptionsProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SubscriptionsProvider>
    </AuthProvider>
  );
}
