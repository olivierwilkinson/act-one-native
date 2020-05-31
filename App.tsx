import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PermissionsProvider from "./src/components/app/PermissionsProvider";
import RecordingProvider from "./src/components/app/RecordingProvider";
import AudioProvider from "./src/components/app/AudioProvider";
import HomeScreen from "./src/screens/HomeScreen";
import PlayScreen from "./src/screens/PlayScreen";
import { MainStackParamList } from "./src/types/navigation-types";
import "./disableWarnings";

if (__DEV__ && process.env.NODE_ENV !== "test") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);
}

let screenOptions = {};
if (process.env.NODE_ENV === "test") {
  screenOptions = {
    ...screenOptions,
    animationEnabled: false,
  };
}

const Stack = createStackNavigator<MainStackParamList>();

export default () => (
  <PermissionsProvider>
    <RecordingProvider>
      <AudioProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={HomeScreen.navigationOptions}
            />
            <Stack.Screen name="Play" component={PlayScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AudioProvider>
    </RecordingProvider>
  </PermissionsProvider>
);
