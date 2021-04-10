import React, { useState } from "react";
import styled from "styled-components/native";

import CardModal from "../../common/cardModal/CardModal";
import SettingsRow from "../../common/settingsRow/SettingsRow";
import PickerActionSheet from "../../common/pickerActionSheet/PickerActionSheet";
import { findPlayers } from "../../../helpers/play";
import { Scene } from "../../../types/play-types";

const SettingsView = styled.View`
  padding: 0px;
`;

export type Props = {
  selectedPlayer?: string;
  scenes?: Scene[];
  visible: boolean;
  onClose: () => void;
  onPlayerSelected: (selectedPlayer: string) => void;
};

export default ({
  selectedPlayer,
  scenes = [],
  visible,
  onClose,
  onPlayerSelected
}: Props) => {
  const [playerSelectActive, setPlayerSelectActive] = useState(false);

  return (
    <CardModal
      title="Play Settings"
      visible={visible}
      onClose={onClose}
      swipeToClose={!playerSelectActive}
    >
      <SettingsView>
        <SettingsRow
          label="Character"
          value={selectedPlayer}
          leftIconName="ios-person"
          onPress={() => setPlayerSelectActive(true)}
        />
      </SettingsView>

      <PickerActionSheet
        initialValue={selectedPlayer}
        options={findPlayers(scenes)}
        visible={playerSelectActive}
        onCancel={() => setPlayerSelectActive(false)}
        onDone={player => {
          onPlayerSelected(player);
          setPlayerSelectActive(false);
        }}
      />
    </CardModal>
  );
};
