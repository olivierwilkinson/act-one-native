import { Play } from "../types/play-types";
import { findActiveScene } from "../helpers/play";
import { PlaySettings } from "../contexts/PlaySettings";

export const createPlayNavigation = ({
  play,
  settings,
  setSettings,
  setSceneSelectActive,
}: {
  play?: Play | null;
  settings?: PlaySettings;
  setSettings: (settings: PlaySettings) => void;
  setSceneSelectActive: (active: boolean) => void;
}) => {
  if (!play) return { openSceneSelect: () => setSceneSelectActive(true) };

  const scenes = [...play.scenes].sort((a, b) => a.index - b.index);
  const activeScene = findActiveScene(play.scenes, settings);
  const sceneIndex = activeScene ? scenes.indexOf(activeScene) : -1;

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
        sceneNum: previousScene.sceneNum,
      }));

  return {
    goToNextScene,
    goToPreviousScene,
    openSceneSelect: () => setSceneSelectActive(true),
  };
};
