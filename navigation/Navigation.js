import React, {useState} from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import WellcomeScreen from "../screens/WellcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabsBottom from "../navigation/TabsBottom";

const Stack = createStackNavigator();

export default function navigation() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Stack.Navigator initialRouteName="Home">
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
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
        children={() => 
          <LoginScreen 
            username={username} 
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
        />}
      />
      <Stack.Screen
        name="Register"
        options={{
          headerShown: false,
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
        children={() => TabsBottom({username, setUsername, setPassword})}
      />
    </Stack.Navigator>
  );
}
