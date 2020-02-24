import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions } from "react-navigation";

import { Play } from "../types/play-types";
import { PlaySettings } from "../contexts/PlaySettings";

export const playScreenKey = "play-screen";

// Screen Navigation
export const navigateToPlay = (
  navigation: NavigationStackProp,
  play: Play,
  settings?: PlaySettings
) => console.log('hello', play.play, settings) ||
  navigation.navigate({
    routeName: "Play",
    params: { play, settings },
    key: playScreenKey
  });

export const goToScene = (
  navigation: NavigationStackProp,
  play: Play,
  settings: PlaySettings,
  newSceneIndex: number
) => {
  const { scenes } = play;
  const scene = scenes[newSceneIndex];
  if (!scene) {
    return;
  }

  setParams(navigation, playScreenKey, {
    play,
    settings: {
      ...settings,
      act: scene.act,
      scene: scene.scene
    }
  });
};

// Modal Navigation
export const openSceneSelect = (
  navigation: NavigationStackProp,
  play: Play,
  settings: PlaySettings
) => navigation.navigate("SceneSelect", { play, settings });

export const openPlaySettings = (
  navigation: NavigationStackProp,
  play: Play,
  settings: PlaySettings
) => navigation.navigate("PlaySettings", { play, settings });

// Misc
export const setParams = (
  navigation: NavigationStackProp,
  key: string,
  params: object
) =>
  navigation.dispatch(
    NavigationActions.setParams({
      params,
      key
    })
  );
