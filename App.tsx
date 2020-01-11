import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import PlayScreen from "./src/screens/PlayScreen";
import SceneSelectModal from "./src/screens/SceneSelectModal";
import Header from "./src/components/common/Header";

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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    SceneSelect: {
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
