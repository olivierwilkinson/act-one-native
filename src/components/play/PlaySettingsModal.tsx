import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";

import SettingsRow from "../common/SettingsRow";
import PickerActionSheet from "../common/PickerActionSheet";
import { findPlayers } from "../../helpers/play";
import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour, primaryColour } from "../../styles/colours";
import { Play } from "../../types/play-types";
import PlaySettingsContext from "../../contexts/PlaySettings";

const ContentView = styled.View`
  height: 100%;
  width: 100%;
  background: white;
  border-radius: 40px;
  margin-top: 100px;
`;

const TitleView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${lightPrimaryColour};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  height: 55px;
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

const CloseTouchableHighlight = styled.TouchableHighlight`
  position: absolute;
  right: 14px;
`;

export type Props = {
  play: Play;
  visible: boolean;
  onClose: () => void;
};

export default ({ visible, onClose, play }: Props) => {
  const { settings, setSettings } = useContext(PlaySettingsContext);
  const [playerSelectActive, setPlayerSelectActive] = useState(false);

  return (
    <Modal
      isVisible={visible}
      presentationStyle="overFullScreen"
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={{ margin: 0 }}
    >
      <ContentView testID="play-settings">
        <TitleView>
          <TitleText>Play Settings</TitleText>

          <CloseTouchableHighlight
            testID="settings-close-button"
            onPress={onClose}
            underlayColor={primaryColour}
          >
            <HeaderText>Close</HeaderText>
          </CloseTouchableHighlight>
        </TitleView>

        <SettingsView>
          <SettingsRow
            label="Character"
            value={settings.selectedPlayer}
            leftIconName="ios-person"
            onPress={() => setPlayerSelectActive(true)}
          />
        </SettingsView>
      </ContentView>

      <PickerActionSheet
        initialValue={settings.selectedPlayer}
        options={findPlayers(play.scenes)}
        visible={playerSelectActive}
        onCancel={() => setPlayerSelectActive(false)}
        onDone={selectedPlayer => {
          if (selectedPlayer !== settings.selectedPlayer) {
            setSettings({ selectedPlayer });
          }

          setPlayerSelectActive(false);
        }}
      />
    </Modal>
  );
};
