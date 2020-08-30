import { Play } from "../types/play-types";
import { findActiveScene } from "../helpers/play";
import { PlaySettings } from "../contexts/PlaySettings";

export const createPlayNavigation = (
  play: Play,
  settings: PlaySettings,
  setSettings: (settings: PlaySettings) => void,
  setSceneSelectModalActive: (active: boolean) => void
) => {
  const { scenes } = play;
  const activeScene = findActiveScene(play, settings);
  const sceneIndex = scenes.indexOf(activeScene);

  const nextScene = scenes[sceneIndex + 1];
  const previousScene = scenes[sceneIndex - 1];

  const goToNextScene =
    nextScene &&
    (() =>
      setSettings({ actNum: nextScene.actNum, sceneNum: nextScene.sceneNum }));

  const goToPreviousScene =
    previousScene &&
    (() =>
      setSettings({
        actNum: previousScene.actNum,
        sceneNum: previousScene.sceneNum
      }));

  return {
    goToNextScene,
    goToPreviousScene,
    openSceneSelect: () => setSceneSelectModalActive(true)
  };
};
