import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";

import Header from "../components/common/Header";
import Error from "../components/common/Error";
import SettingsRow from "../components/playSettingsModal/SettingsRow";
import CharacterSelectActionSheet from "../components/playSettingsModal/CharacterSelectActionSheet";
import { Play } from "../types/play-types";
import { findPlayers } from "../helpers/play";
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
  padding: 0px;
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

  state: {
    selectedPlayer?: string;
    playerSelectActive: boolean;
  } = {
    selectedPlayer: undefined,
    playerSelectActive: false
  };

  render() {
    const { navigation } = this.props;
    const { selectedPlayer, playerSelectActive } = this.state;
    const play = navigation.state.params?.play;

    if (!play) {
      return <Error message="Unable to load Settings" />;
    }

    return (
      <>
        <View testID="play-settings">
          <TitleView>
            <TitleText>Play Settings</TitleText>
          </TitleView>

          <SettingsView>
            <SettingsRow
              label="Character"
              value={selectedPlayer}
              leftIconName="ios-person"
              onPress={() => this.setState({ playerSelectActive: true })}
            />
          </SettingsView>
        </View>

        <CharacterSelectActionSheet
          currentPlayer={selectedPlayer}
          players={findPlayers(play.scenes)}
          visible={playerSelectActive}
          onCancel={() => this.setState({ playerSelectActive: false })}
          onDone={selectedPlayer =>
            this.setState({
              playerSelectActive: false,
              selectedPlayer
            })
          }
        />
      </>
    );
  }
}
