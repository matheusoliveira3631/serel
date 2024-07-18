import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Configuration from "../screens/Configuration";
import Dashboard from "../screens/Dashboard";
import Documents from "../screens/Documents";
import Extract from "../screens/Extract";
import Menu from "../screens/Menu";
import RegisterData from "../screens/RegisterData";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="extract" component={Extract} />
      <Screen name="menu" component={Menu} />
      <Screen name="documents" component={Documents} />
      <Screen name="register" component={RegisterData} />
      <Screen name="configuration" component={Configuration} />
    </Navigator>
  );
}
