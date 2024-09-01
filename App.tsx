import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";

import AppProviders from "./src/components/app/appProviders/AppProviders";
import AppStack from "./src/stacks/AppStack";
import LoginModal from "./src/components/app/loginModal/LoginModal";
import "./disableWarnings";
import "./src/polyfills";

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
  dsn: Constants.expoConfig?.extra?.sentryDSN || "",
  enableInExpoDevelopment: false
});

import AsyncStorage from "@react-native-async-storage/async-storage";
AsyncStorage.clear();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default () => {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() =>
        console.error("SplashScreen unable to hide")
      );
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProviders>
      <LoginModal />

      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </AppProviders>
  );
};
