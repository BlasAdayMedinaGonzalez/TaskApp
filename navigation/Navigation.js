import { createStackNavigator } from "@react-navigation/stack";

import WellcomeScreen from "../screens/WellcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabsBottom from "../navigation/TabsBottom";

const Stack = createStackNavigator();

export default function navigation() {
  return (
    <Stack.Navigator initialRouteName="WellcomeScreen">
      <Stack.Screen
        name="Wellcome"
        options={{
          headerShown: false,
        }}
        children={() => <WellcomeScreen />}
      />
      <Stack.Screen
        name="Login"
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
        children={() => <LoginScreen />}
      />
      <Stack.Screen
        name="Register"
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
        children={() => <RegisterScreen />}
      />
      <Stack.Screen
        name="TabsBottom"
        options={{
          headerShown: false,
        }}
        component={TabsBottom}
      />
    </Stack.Navigator>
  );
}
