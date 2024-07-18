import {GestureHandlerRootView} from "react-native-gesture-handler";

import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";

import AppProvider from "./src/hooks";
import Routes from "./src/routes";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProvider>
        <Routes />
        <FlashMessage
          position="top"
          floating
          statusBarHeight={StatusBar.currentHeight}
          style={{ margin: 16, marginTop: 0 }}
          titleStyle={{ fontSize: 18, fontWeight: "bold" }}
          textStyle={{ fontSize: 16 }}
        />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
