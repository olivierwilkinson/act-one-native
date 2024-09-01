import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MainStackParamList } from "../types/navigation-types";
import Header from "../components/common/header/Header";
import BottomTabStack from "./BottomTabStack";
import * as Play from "../screens/PlayScreen";

const Stack = createStackNavigator<MainStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabStack}
        options={{
          header: () => <Header />
        }}
      />

      <Stack.Screen
        name="Play"
        component={Play.Screen}
        options={{ header: Play.Header }}
      />
    </Stack.Navigator>
  );
}
