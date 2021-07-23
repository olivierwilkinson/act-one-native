import React from "react";

import CardModal from "../../common/cardModal/CardModal";
import SceneList, { Props as SceneListProps } from "../sceneList/SceneList";
import { Scene } from "../../../types/play-types";

export type Props = {
  activeSceneId?: number;
  scenes: Scene[];
  visible: boolean;
  onClose: () => void;
  onScenePress: SceneListProps["onScenePress"];
};

export default ({
  activeSceneId,
  scenes,
  visible,
  onClose,
  onScenePress,
}: Props) => (
  <CardModal title="Scene Select" visible={visible} onClose={onClose}>
    <SceneList
      activeSceneId={activeSceneId}
      scenes={scenes}
      onScenePress={onScenePress}
    />
  </CardModal>
);
