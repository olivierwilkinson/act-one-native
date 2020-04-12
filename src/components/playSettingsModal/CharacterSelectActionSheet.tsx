import React, { useState } from "react";
import { Picker } from "react-native";

import CustomActionSheet from "../common/CustomActionSheet";
import { primaryColour } from "../../styles/colours";

export type Props = {
  visible: boolean;
  onCancel: () => void;
  onDone: (player: string) => void;
  players: string[];
  currentPlayer?: string;
};

export default ({
  visible,
  onCancel,
  onDone,
  players,
  currentPlayer = ""
}: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState(currentPlayer);

  return (
    <CustomActionSheet
      visible={visible}
      onCancel={() => {
        setSelectedPlayer(currentPlayer);
        onCancel();
      }}
      onDone={() => onDone(selectedPlayer)}
    >
      <Picker
        testID="character-select-picker"
        selectedValue={selectedPlayer}
        onValueChange={player => setSelectedPlayer(player)}
      >
        {players.map(player => (
          <Picker.Item
            color={player === selectedPlayer ? primaryColour : undefined}
            label={player}
            value={player}
            key={player}
          />
        ))}
      </Picker>
    </CustomActionSheet>
  );
};
