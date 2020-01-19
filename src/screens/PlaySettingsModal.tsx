import React from "react";
import { View, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";

import { Play } from "../types/play-types";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import CustomActionSheet from "../components/common/CustomActionSheet";
import { findPlayers } from "../helpers/play";
import { bigSizeFont, titleFont, mediumSizeFont } from "../styles/typography";
import { Picker } from "react-native";
import {
  lightPrimaryColour,
  lightGray,
  darkGray,
  primaryColour
} from "../styles/colours";

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

const SettingView = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${lightGray};
  background: white;
`;

const SettingText = styled.Text`
  ${mediumSizeFont}
  color: ${darkGray}
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

  state = {
    selectedPlayer: undefined,
    playerSelectActive: false
  };

  render() {
    const { navigation } = this.props;
    const { selectedPlayer, playerSelectActive } = this.state;
    const play = navigation.state.params?.play;

    if (!play) {
      return <Error message="Unable to load Play" />;
    }

    return (
      <>
        <View>
          <TitleView>
            <TitleText>Play Settings</TitleText>
          </TitleView>

          <SettingsView>
            <TouchableHighlight
              onPress={() => this.setState({ playerSelectActive: true })}
            >
              <SettingView>
                <SettingText>
                  Character{selectedPlayer && `: ${selectedPlayer}`}
                </SettingText>
              </SettingView>
            </TouchableHighlight>
          </SettingsView>
        </View>

        <CustomActionSheet
          visible={playerSelectActive}
          onCancel={() =>
            this.setState({
              playerSelectActive: false,
              selectedPlayer: undefined
            })
          }
          onDone={() => this.setState({ playerSelectActive: false })}
        >
          <Picker
            selectedValue={selectedPlayer}
            onValueChange={itemValue =>
              this.setState({ selectedPlayer: itemValue })
            }
          >
            {findPlayers(play).map(player => (
              <Picker.Item
                color={player === selectedPlayer ? primaryColour : undefined}
                label={player}
                value={player}
                key={player}
              />
            ))}
          </Picker>
        </CustomActionSheet>
      </>
    );
  }
}
