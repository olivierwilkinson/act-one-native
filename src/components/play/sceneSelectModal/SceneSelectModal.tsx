import React from "react";

import CardModal from "../../common/cardModal/CardModal";
import SceneList from "../sceneList/SceneList";
import { Scene } from "../../../types/play-types";

export type Props = {
  activeScene: Scene;
  scenes: Scene[];
  visible: boolean;
  onClose: () => void;
  onScenePress: (scene: Scene) => void;
};

export default ({
  activeScene,
  scenes,
  visible,
  onClose,
  onScenePress
}: Props) => (
  <CardModal title="Scene Select" visible={visible} onClose={onClose}>
    <SceneList
      activeScene={activeScene}
      scenes={scenes}
      onScenePress={onScenePress}
    />
  </CardModal>
);
