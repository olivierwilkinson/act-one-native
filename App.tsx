import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./src/screens/Home";
import Play from "./src/screens/Play";
import PlaySceneSelectModal from "./src/screens/PlaySceneSelectModal";
import Header from "./src/components/common/Header";

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Play: {
      screen: Play
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: () => <Header />
    }
  }
);

// wrap PlaySceneSelectModal in it's own stack to enable header
const PlaySceneSelectModalStack = createStackNavigator({
  Main: {
    screen: PlaySceneSelectModal
  }
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    PlaySceneSelectModal: {
      screen: PlaySceneSelectModalStack
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
