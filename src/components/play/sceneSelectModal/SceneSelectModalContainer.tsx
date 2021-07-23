import React, { useContext } from "react";

import { Scene } from "../../../types/play-types";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import SceneSelectModal from "./SceneSelectModal";
import { usePlayPosition } from "../../../contexts/PlayPosition";

export type Props = {
  scenes: Scene[];
  visible: boolean;
  onClose: () => void;
};

export default ({ scenes, visible, onClose }: Props) => {
  const { setSettings } = useContext(PlaySettingsContext);
  const { activeSceneId } = usePlayPosition();

  return (
    <SceneSelectModal
      scenes={scenes}
      activeSceneId={activeSceneId}
      visible={visible}
      onClose={onClose}
      onScenePress={scene =>
        setSettings({
          actNum: scene.actNum,
          sceneNum: scene.sceneNum
        })
      }
    />
  );
};
