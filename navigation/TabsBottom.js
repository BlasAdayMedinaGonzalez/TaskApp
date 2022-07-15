import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

function MyTabs({
  homeData,
  profileData,
  setHomeData,
  setRefreshData,
  userId
}) {
  const navigation = useNavigation();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen profileData={profileData} setRefreshData={setRefreshData} />}
        options={{
          // headerShown: false,
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Wellcome");
                }}
              >
                <Icon name="log-out-outline" size={25} />
              </TouchableOpacity>
            </View>
          ),
          headerTitleStyle: {
            color: "white",
            marginLeft: "62%",
          },
          tabBarIcon: () => <Icon name="person" size={25} />,
          headerStyle: {
            backgroundColor: "red",
          },
        }}
      />
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeScreen homeData={homeData} setRefreshData={setRefreshData} setHomeData={setHomeData} userId={userId} />
        )}
        options={{
          // headerShown: false,
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Wellcome");
                }}
              >
                <Icon name="log-out-outline" size={25} />
              </TouchableOpacity>
            </View>
          ),
          headerTitleStyle: {
            color: "white",
            marginLeft: "62%",
          },
          tabBarIcon: () => <Icon name="home" size={25} />,
          headerStyle: {
            backgroundColor: "red",
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabsBottom({
  homeData,
  setHomeData,
  setRefreshData,
  profileData,
  userId
}) {
  return (
    <MyTabs
      homeData={homeData}
      setHomeData={setHomeData}
      setRefreshData={setRefreshData}
      profileData={profileData}
      userId={userId}
    />
  );
}
