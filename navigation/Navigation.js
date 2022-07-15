import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WellcomeScreen from "../screens/WellcomeScreen";
import TabsBottom from "../navigation/TabsBottom";

import Constants from "../constants/constants";

const Stack = createStackNavigator();

export default function navigation() {
  const [refreshData, setRefreshData] = useState(false);
  const [userId, setUserId] = useState();
  const [homeData, setHomeData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    setRefreshData(false);
    if (!userId) {
      return;
    }
    fetch(Constants.ulrGetUserById + userId)
      .then((response) => response.json())
      .then((data) => setProfileData(data.data))
      .catch((error) => console.log(error));
    fetch(Constants.urlGetTasks + userId)
      .then((response) => response.json())
      .then((data) => setHomeData(data.data))
      .catch((error) => console.log(error));
      console.log("Ha pasado por aqui, Data actualizada")
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
            homeData,
            profileData,
            setHomeData,
            setRefreshData,
            userId
          })
        }
      />
    </Stack.Navigator>
  );
}
