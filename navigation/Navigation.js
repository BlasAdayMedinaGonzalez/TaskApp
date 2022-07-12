import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WellcomeScreen from "../screens/WellcomeScreen";
import TabsBottom from "../navigation/TabsBottom";

import Constants from "../constants/constants";

const Stack = createStackNavigator();

export default function navigation() {
  const [refreshData, setRefreshData] = useState(false);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [homeData, setHomeData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    setRefreshData(false);
    fetch(Constants.urlGetTasks + userId)
      .then((response) => response.json())
      .then((data) => setHomeData(data.data))
      .catch((error) => console.log(error));
  }, [refreshData]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Wellcome"
        options={{
          headerShown: false,
        }}
        children={() => (
          <WellcomeScreen
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
            setUserId={setUserId}
            setRefreshData={setRefreshData}
          />
        )}
      />
      <Stack.Screen
        name="TabsBottom"
        options={{
          headerShown: false,
        }}
        children={() =>
          TabsBottom({
            username,
            setUsername,
            setPassword,
            setEmail,
            homeData,
            setHomeData,
            setRefreshData
          })
        }
      />
    </Stack.Navigator>
  );
}
