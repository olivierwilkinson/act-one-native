import React, { useContext } from "react";

import { Scene } from "../../../types/play-types";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import PlayPositionContext from "../../../contexts/PlayPosition";
import SceneSelectModal from "./SceneSelectModal";

export type Props = {
  scenes: Scene[];
  visible: boolean;
  onClose: () => void;
};

export default ({ scenes, visible, onClose }: Props) => {
  const { setSettings } = useContext(PlaySettingsContext);
  const { activeScene } = useContext(PlayPositionContext);

  return (
    <SceneSelectModal
      scenes={scenes}
      activeScene={activeScene}
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
