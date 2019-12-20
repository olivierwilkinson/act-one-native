import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AppLoading } from "expo";
import { Container, Content, Spinner } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import PlayList from "./components/PlayList";
import Header from "./components/Header";

const LoadingView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return (
      <LoadingView>
        <Spinner />
      </LoadingView>
    );
  }

  return (
    <Container>
      <Content>
        <PlayList />
      </Content>
    </Container>
  );
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: Header
    }
  }
);

export default createAppContainer(AppNavigator);
