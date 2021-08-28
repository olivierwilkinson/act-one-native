import React, { memo } from "react";

import PlaySettingsModal from "./PlaySettingsModal";
import { usePlaySettings } from "../../../contexts/PlaySettings";
import { useQuery } from "@apollo/client";
import { GetPlay } from "../../../graphql/queries/types/GetPlay";
import GET_PLAY from "../../../graphql/queries/GetPlay.graphql";

export type Props = {
  playId: number;
  visible: boolean;
  onClose: () => void;
};

const PlaySettingsModalContainer = ({ playId, visible, onClose }: Props) => {
  const { settings, setSettings } = usePlaySettings();
  const { data: { play } = {} } = useQuery<GetPlay>(GET_PLAY, {
    variables: { where: { id: playId } },
    skip: !playId
  });

  return (
    <PlaySettingsModal
      visible={visible}
      onClose={onClose}
      selectedPlayer={settings?.selectedPlayer}
      scenes={play?.scenes || []}
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
