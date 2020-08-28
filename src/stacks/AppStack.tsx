import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PlayScreen from "../screens/PlayScreen";
import { MainStackParamList } from "../types/navigation-types";
import BottomTabStack from "./BottomTabStack";
import Header from "../components/common/header/Header";

const Stack = createStackNavigator<MainStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabStack}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen name="Play" component={PlayScreen} />
    </Stack.Navigator>
  );
}
