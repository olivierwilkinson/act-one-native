import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { GatewayProvider, GatewayDest } from "react-gateway";

import HomeScreen from "./src/screens/HomeScreen";
import PlayScreen from "./src/screens/PlayScreen";
import SceneSelectModal from "./src/screens/SceneSelectModal";
import PlaySettingsModal from "./src/screens/PlaySettingsModal";
import Header from "./src/components/common/Header";
import Overlay from "./src/components/common/Overlay";
import "./disableWarnings";

if (__DEV__ && process.env.NODE_ENV !== "test") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true
  });
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Play: {
      screen: PlayScreen
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: () => <Header />
    }
  }
);

// wrap SceneSelectModal in it's own stack to enable header
const SceneSelectModalStack = createStackNavigator({
  Main: {
    screen: SceneSelectModal
  }
});

const PlaySettingsModalStack = createStackNavigator({
  Main: {
    screen: PlaySettingsModal
  }
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    SceneSelect: {
      screen: SceneSelectModalStack
    },
    PlaySettings: {
      screen: PlaySettingsModalStack
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default () => (
  <GatewayProvider>
    <>
      <AppContainer />
      <GatewayDest name="overlay" component={Overlay} />
    </>
  </GatewayProvider>
);
