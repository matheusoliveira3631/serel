import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ForgotPassword from "../screens/ForgotPassword";
import Login from "../screens/Login";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="forget-password" component={ForgotPassword} />
    </Navigator>
  );
}
