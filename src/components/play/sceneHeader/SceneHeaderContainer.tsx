import React, { useContext } from "react";

import SceneHeader from "./SceneHeader";
import PlayNavigationContext from "../../../contexts/PlayNavigation";
import Playback from "../../../contexts/Playback";
import { Scene } from "../../../types/play-types";
import PlayPosition from "../../../contexts/PlayPosition";

export type Props = Scene;

export default () => {
  const {
    activeScene: { act, scene }
  } = useContext(PlayPosition);
  const { goToNextScene, goToPreviousScene, openSceneSelect } = useContext(
    PlayNavigationContext
  );
  const { stop } = useContext(Playback);

  return (
    <SceneHeader
      act={act}
      scene={scene}
      showPreviousSceneButton={!!goToPreviousScene}
      showNextSceneButton={!!goToNextScene}
      onPreviousScenePress={() => {
        stop();
        if (goToPreviousScene) goToPreviousScene();
      }}
      onNextScenePress={() => {
        stop();
        if (goToNextScene) goToNextScene();
      }}
      onSceneSelectPress={openSceneSelect}
    />
  );
};
