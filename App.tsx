import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";

import AppProviders from "./src/components/app/appProviders/AppProviders";
import HomeScreen from "./src/screens/HomeScreen";
import PlayScreen from "./src/screens/PlayScreen";
import { MainStackParamList } from "./src/types/navigation-types";
import "./disableWarnings";

if (__DEV__ && process.env.NODE_ENV !== "test") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);
}

let screenOptions = {};
if (process && process.env && process.env.NODE_ENV === "test") {
  screenOptions = {
    ...screenOptions,
    animationEnabled: false
  };
}

Sentry.init({
  dsn: Constants.manifest?.extra?.sentryDSN || "",
  enableInExpoDevelopment: false
});

const Stack = createStackNavigator<MainStackParamList>();

export default () => (
  <AppProviders>
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
  </AppProviders>
);
