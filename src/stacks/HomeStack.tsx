import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import { darkGray } from "../styles/colours";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Foundation name="home" size={32} color={darkGray} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
