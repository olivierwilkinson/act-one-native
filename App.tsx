import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./src/screens/Home";
import Play from "./src/screens/Play";
import PlaySceneSelectModal from "./src/screens/PlaySceneSelectModal";
import Header from "./src/components/Header";

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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    PlaySceneSelectModal: {
      screen: PlaySceneSelectModal
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
