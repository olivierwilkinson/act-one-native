import React from "react";

import SceneHeader from "./SceneHeader";
import { usePlayNavigation } from "../../../contexts/PlayNavigation";
import { usePlayback } from "../../../contexts/Playback";
import { Scene } from "../../../types/play-types";
import { usePlayPosition } from "../../../contexts/PlayPosition";
import { useQuery } from "@apollo/client";
import {
  GetSceneHeader,
  GetSceneHeaderVariables,
} from "./types/GetSceneHeader";
import GET_SCENE_HEADER from "./GetSceneHeader.graphql";
import Placeholder from "../../common/placeholder/Placeholder";

export type Props = Scene;

export default () => {
  const { activeSceneId } = usePlayPosition();
  const {
    goToNextScene,
    goToPreviousScene,
    openSceneSelect,
  } = usePlayNavigation();
  const { stop } = usePlayback();

  const { data: { scene } = {}, loading } = useQuery<
    GetSceneHeader,
    GetSceneHeaderVariables
  >(GET_SCENE_HEADER, {
    variables: { where: { id: activeSceneId } },
    skip: !activeSceneId,
  });

  if (!scene) {
    return <Placeholder loading={loading} />;
  }

  return (
    <SceneHeader
      act={scene.actNum}
      scene={scene.sceneNum}
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
