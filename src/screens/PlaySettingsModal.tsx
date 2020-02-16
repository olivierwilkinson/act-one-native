import React from "react";
import { View, TouchableHighlight, Picker } from "react-native";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import { Play } from "../types/play-types";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import CustomActionSheet from "../components/common/CustomActionSheet";
import PlayerBubble from "../components/common/PlayerBubble";
import { findPlayers } from "../helpers/play";
import { bigSizeFont, titleFont, mediumSizeFont } from "../styles/typography";
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
  padding: 0px;
`;

const SettingLeftIcon = styled(Ionicons)`
  margin: 0 10px 0 5px;
`;

const SettingView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: white;
  height: 70px;
  width: 100%;
`;

const SettingContentView = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 10px;

  border-bottom-width: 1px;
  border-bottom-color: ${lightGray};
`;

const SettingRightView = styled.View`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const SettingRightArrow = styled(Ionicons)`
  margin-left: 10px;
`;

const SettingPlayerBubble = styled(PlayerBubble)`
  max-width: 80%;
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
            <TouchableHighlight
              onPress={() => this.setState({ playerSelectActive: true })}
            >
              <SettingView>
                <SettingLeftIcon size={24} name="ios-person" />
                <SettingContentView>
                  <SettingText>Character</SettingText>
                  <SettingRightView>
                    {!!selectedPlayer && (
                      <SettingPlayerBubble
                        player={selectedPlayer}
                        colour={play.colourByPlayer[selectedPlayer]}
                        highlighted={false}
                      />
                    )}
                    <SettingRightArrow
                      size={24}
                      name="ios-arrow-forward"
                      color="gray"
                    />
                  </SettingRightView>
                </SettingContentView>
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
            {findPlayers(play.scenes).map(player => (
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
