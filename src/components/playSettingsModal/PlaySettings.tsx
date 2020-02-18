import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import SettingsRow from "./SettingsRow";
import CharacterSelectActionSheet from "./CharacterSelectActionSheet";
import { findPlayers } from "../../helpers/play";
import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour } from "../../styles/colours";
import { Play } from "../../types/play-types";

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

export type Props = Play;

export default ({ scenes }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [playerSelectActive, setPlayerSelectActive] = useState(false);

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
            onPress={() => setPlayerSelectActive(true)}
          />
        </SettingsView>
      </View>

      <CharacterSelectActionSheet
        currentPlayer={selectedPlayer}
        players={findPlayers(scenes)}
        visible={playerSelectActive}
        onCancel={() => setPlayerSelectActive(false)}
        onDone={player => {
          setSelectedPlayer(player);
          setPlayerSelectActive(false);
        }}
      />
    </>
  );
};
