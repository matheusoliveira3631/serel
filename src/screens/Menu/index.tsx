import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Configuration from "../Configuration";
import Menu from "./Menu";

const Stack = createStackNavigator();

export default function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="menu" component={Menu} />
      <Stack.Screen name="configuration" component={Configuration} />
    </Stack.Navigator>
  );
}
