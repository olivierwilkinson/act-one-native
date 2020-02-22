import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import SettingsRow from "../common/SettingsRow";
import CharacterSelectActionSheet from "./CharacterSelectActionSheet";
import { findPlayers } from "../../helpers/play";
import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour } from "../../styles/colours";
import { Scene } from "../../types/play-types";
import { PlaySettings } from "../../contexts/PlaySettings";

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

export type Props = {
  scenes: Scene[];
  settings: PlaySettings;
  onSettingsUpdate: (settings: PlaySettings) => void;
};

export default ({ scenes, onSettingsUpdate, settings }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState(settings.selectedPlayer);
  const [playerSelectActive, setPlayerSelectActive] = useState(false);

  useEffect(() => {
    if (selectedPlayer !== settings.selectedPlayer) {
      onSettingsUpdate({ selectedPlayer });
    }
  }, [selectedPlayer]);

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
