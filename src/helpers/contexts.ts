import { Play } from "../types/play-types";
import { findActiveScene } from "../helpers/play";
import { PlaySettings } from "../contexts/PlaySettings";

export const createPlayNavigation = (
  play: Play,
  settings: PlaySettings,
  setSettings: (settings: PlaySettings) => void
) => {
  const { scenes } = play;
  const activeScene = findActiveScene(play, settings);
  const sceneIndex = scenes.indexOf(activeScene);

  const nextScene = scenes[sceneIndex + 1];
  const previousScene = scenes[sceneIndex - 1];

  const goToNextScene =
    nextScene &&
    (() => setSettings({ act: nextScene.act, scene: nextScene.scene }));

  const goToPreviousScene =
    previousScene &&
    (() => setSettings({ act: previousScene.act, scene: previousScene.scene }));

  return {
    goToNextScene,
    goToPreviousScene,
  };
};
