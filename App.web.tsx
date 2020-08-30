import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";

import AppProviders from "./src/components/app/appProviders/AppProviders";
import AppStack from "./src/stacks/AppStack";
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

export default () => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AppProviders>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </AppProviders>
  );
};
