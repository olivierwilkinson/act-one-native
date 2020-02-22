import { NavigationStackProp } from "react-navigation-stack";

import { Play } from "../types/play-types";
import { findActiveScene } from "../helpers/play";
import { goToScene, openSceneSelect } from "../helpers/navigation";
import { PlaySettings } from '../contexts/PlaySettings';

export const createPlayNavigation = (
  navigation: NavigationStackProp,
  play: Play,
  settings: PlaySettings,
) => {
  const { scenes } = play;
  const activeScene = findActiveScene(play, settings);
  const sceneIndex = scenes.indexOf(activeScene);

  const goToNextScene =
    scenes[sceneIndex + 1] &&
    (() => goToScene(navigation, play, settings, sceneIndex + 1));

  const goToPreviousScene =
    scenes[sceneIndex - 1] &&
    (() => goToScene(navigation, play, settings, sceneIndex - 1));

  return {
    goToNextScene,
    goToPreviousScene,
    openSceneSelect: () => openSceneSelect(navigation, play, settings),
  };
};
