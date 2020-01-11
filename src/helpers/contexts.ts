import { NavigationStackProp } from "react-navigation-stack";

import { Play } from "../types/play-types";
import { findActiveScene } from "../helpers/play";
import { goToScene, openSceneSelect } from "../helpers/navigation";

export const createPlayNavigation = (
  navigation: NavigationStackProp,
  play: Play
) => {
  const { scenes } = play;
  const activeScene = findActiveScene(play);
  const sceneIndex = scenes.indexOf(activeScene);

  const goToNextScene =
    scenes[sceneIndex + 1] &&
    (() => goToScene(navigation, play, sceneIndex + 1));

  const goToPreviousScene =
    scenes[sceneIndex - 1] &&
    (() => goToScene(navigation, play, sceneIndex - 1));

  return {
    goToNextScene,
    goToPreviousScene,
    openSceneSelect: openSceneSelect.bind(null, navigation, play)
  };
};
