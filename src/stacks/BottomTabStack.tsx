import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import { darkGray, primaryColour } from "../styles/colours";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex" }, null],
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="home"
              size={26}
              color={focused ? primaryColour : darkGray}
            />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="user"
              size={26}
              color={focused ? primaryColour : darkGray}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
