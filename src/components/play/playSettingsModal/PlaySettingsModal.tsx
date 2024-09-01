import React, { useState } from "react";
import styled from "styled-components/native";

import CardModal from "../../common/cardModal/CardModal";
import SettingsRow from "../../common/settingsRow/SettingsRow";
import PickerActionSheet from "../../common/pickerActionSheet/PickerActionSheet";

const SettingsView = styled.View`
  padding: 0px;
`;

export type Props = {
  selectedPlayer?: string;
  players: string[];
  visible: boolean;
  onClose: () => void;
  onPlayerSelected: (selectedPlayer: string) => void;
};

export default ({
  selectedPlayer,
  players,
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
          leftIconName="person"
          onPress={() => setPlayerSelectActive(true)}
        />
      </SettingsView>

      <PickerActionSheet
        initialValue={selectedPlayer}
        options={players}
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
