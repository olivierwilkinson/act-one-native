import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PlayScreen from "../screens/PlayScreen";
import { MainStackParamList } from "../types/navigation-types";
import HomeStack from "./HomeStack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator<MainStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={HomeScreen.navigationOptions}
      />
      <Stack.Screen name="Play" component={PlayScreen} />
    </Stack.Navigator>
  );
}
