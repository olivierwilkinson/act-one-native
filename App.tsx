import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./src/screens/Home";
import PlayScreen from "./src/screens/PlayScreen";
import SceneSelectModal from "./src/screens/SceneSelectModal";
import Header from "./src/components/common/Header";

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home
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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    SceneSelectModal: {
      screen: SceneSelectModalStack
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default () => {
  return <AppContainer />;
};
