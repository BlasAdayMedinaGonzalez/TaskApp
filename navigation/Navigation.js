import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import WellcomeScreen from "../screens/WellcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabsBottom from "../navigation/TabsBottom";

const Stack = createStackNavigator();

export default function navigation() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [homeData, setHomeData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {

  },[])

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Wellcome"
        options={{
          headerShown: false,
        }}
        children={() => <WellcomeScreen 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
        />}
      />
      <Stack.Screen
        name="TabsBottom"
        options={{
          headerShown: false,
        }}
        children={() => TabsBottom({username, setUsername, setPassword, setEmail})}
      />
    </Stack.Navigator>
  );
}
