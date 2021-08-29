import React, { memo } from "react";

import PlaySettingsModal from "./PlaySettingsModal";
import { usePlaySettings } from "../../../contexts/PlaySettings";
import { usePlayers } from "../../../contexts/Players";

export type Props = {
  visible: boolean;
  onClose: () => void;
};

const PlaySettingsModalContainer = ({ visible, onClose }: Props) => {
  const { settings, setSettings } = usePlaySettings();
  const { players } = usePlayers();

  return (
    <PlaySettingsModal
      visible={visible}
      onClose={onClose}
      selectedPlayer={settings?.selectedPlayer}
      players={players}
      onPlayerSelected={selectedPlayer => {
        if (selectedPlayer !== settings?.selectedPlayer) {
          setSettings({ selectedPlayer });
        }
      }}
    />
  );
};

// don't rerender on prop changes to optimise lists
export default memo(PlaySettingsModalContainer);
