import React, { useContext } from "react";

import CardModal from "../../common/cardModal/CardModal";
import SceneList from "../sceneList/SceneList";
import { Play } from "../../../types/play-types";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import PlayPositionContext from "../../../contexts/PlayPosition";

export type Props = {
  play: Play;
  visible: boolean;
  onClose: () => void;
};

export default ({ play, visible, onClose }: Props) => {
  const { setSettings } = useContext(PlaySettingsContext);
  const { activeScene } = useContext(PlayPositionContext);

  return (
    <CardModal title="Scene Select" visible={visible} onClose={onClose}>
      <SceneList
        activeScene={activeScene}
        scenes={play.scenes}
        onScenePress={scene =>
          setSettings({
            act: scene.act,
            scene: scene.scene
          })
        }
      />
    </CardModal>
  );
};
