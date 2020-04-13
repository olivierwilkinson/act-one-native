import React, { useState, useEffect, useContext } from "react";
import { View, Modal } from "react-native";
import styled from "styled-components/native";

import SettingsRow from "../common/SettingsRow";
import PickerActionSheet from "../common/PickerActionSheet";
import Header from '../common/Header';
import { findPlayers } from "../../helpers/play";
import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour } from "../../styles/colours";
import { Play } from "../../types/play-types";
import PlaySettingsContext from "../../contexts/PlaySettings";

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

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

export type Props = {
  play: Play;
  visible: boolean;
  onClose: () => void;
};

export default ({ visible, onClose, play }: Props) => {
  const {
    settings,
    setSettings
  } = useContext(PlaySettingsContext);
  const [selectedPlayer, setSelectedPlayer] = useState(settings.selectedPlayer);
  const [playerSelectActive, setPlayerSelectActive] = useState(false);

  useEffect(() => {
    if (selectedPlayer !== settings.selectedPlayer) {
      setSettings({ selectedPlayer });
    }
  }, [selectedPlayer]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
    >
      <View testID="play-settings">
        <Header
          title={play.play}
          right={{
            onPress: onClose,
            view: <HeaderText>Close</HeaderText>
          }}
        />

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

      <PickerActionSheet
        initialValue={selectedPlayer}
        options={findPlayers(play.scenes)}
        visible={playerSelectActive}
        onCancel={() => setPlayerSelectActive(false)}
        onDone={player => {
          setSelectedPlayer(player);
          setPlayerSelectActive(false);
        }}
      />
    </Modal>
  );
};
