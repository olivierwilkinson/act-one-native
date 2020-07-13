import React, { useState, useContext } from "react";
import styled from "styled-components/native";

import CardModal from "../../common/cardModal/CardModal";
import SettingsRow from "../../common/settingsRow/SettingsRow";
import PickerActionSheet from "../../common/pickerActionSheet/PickerActionSheet";
import { findPlayers } from "../../../helpers/play";
import { Play } from "../../../types/play-types";
import PlaySettingsContext from "../../../contexts/PlaySettings";

const SettingsView = styled.View`
  padding: 0px;
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
    <CardModal title="Play Settings" visible={visible} onClose={onClose}>
      <SettingsView>
        <SettingsRow
          label="Character"
          value={settings.selectedPlayer}
          leftIconName="ios-person"
          onPress={() => setPlayerSelectActive(true)}
        />
      </SettingsView>

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
    </CardModal>
  );
};
