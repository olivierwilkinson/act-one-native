import React from "react";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import { Play as PlayType } from "../types/play-types";
import Play from "../components/play/Play";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import { bigSizeFont } from "../styles/typography";

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

type Params = { play: PlayType };
type Props = NavigationStackScreenProps<Params>;

export default class PlayScreen extends React.Component<Props> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => ({
    header: () => (
      <Header
        title={navigation.state.params?.play?.play}
        left={{
          onPress: () => navigation.pop(),
          view: <HeaderText>Back</HeaderText>
        }}
        right={{
          onPress: () =>
            navigation.navigate("PlaySettings", {
              play: navigation.state.params?.play
            }),
          view: <Ionicons name="ios-settings" color="white" size={28} />
        }}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;

    if (!play) {
      return <Error message="Play could not be loaded" />;
    }

    return <Play play={play} navigation={navigation} />;
  }
}
