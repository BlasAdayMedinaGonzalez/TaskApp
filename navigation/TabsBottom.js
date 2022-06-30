import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";

function MyTabs() {
    const navigation = useNavigation();

    return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen />} 
          options={{
            // headerShown: false,
            headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Wellcome");
                  }}
                >
                  <Icon name="log-out-outline" size={25} />
                </TouchableOpacity>
              ),
              tabBarIcon: () => <Icon name="person" size={25} />
          }}
        />
        
      </Tab.Navigator>
    );
  }
  
export default function TabsBottom() {
    return (
      <MyTabs />
    );
}