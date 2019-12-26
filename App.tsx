import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./screens/Home";
import Play from "./screens/Play";
import Header from "./components/Header";

const AppNavigator = createStackNavigator(
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

const LoadingView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AppContainer = createAppContainer(AppNavigator);

export default () => {
  return <AppContainer />;
};
