import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";

import { Play } from "../types/play-types";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import { bigSizeFont, titleFont } from "../styles/typography";
import { lightPrimaryColour } from "../styles/colours";

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

const TitleView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${lightPrimaryColour};
`;

const TitleText = styled.Text`
  ${titleFont}
  ${bigSizeFont}
  color: white;
`;

const SettingsView = styled.View`
  padding: 10px;
`;

type Params = {
  play: Play;
};

export default class PlaySettingsModal extends React.Component<
  NavigationStackScreenProps<Params>
> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => ({
    header: () => (
      <Header
        title={navigation.state.params?.play?.play}
        right={{
          onPress: () => navigation.pop(),
          view: <HeaderText>Cancel</HeaderText>
        }}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;

    if (!play) {
      return <Error message="Unable to load Play" />;
    }

    return (
      <View>
        <TitleView>
          <TitleText>Play Settings</TitleText>
        </TitleView>

        <SettingsView />
      </View>
    );
  }
}
