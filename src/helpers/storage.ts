import "react-native";

import { AsyncStorage } from "react-native";

import { Play } from "../types/play-types";
import { PlaySettings } from "../contexts/PlaySettings";

export const getStoredSettings: (
  play: Play
) => Promise<null | PlaySettings> = async play => {
  try {
    const serialisedSettings = await AsyncStorage.getItem(
      `@${play.play}-settings`
    );

    if (!serialisedSettings) {
      return null;
    }

    return JSON.parse(serialisedSettings);
  } catch (e) {
    return null;
  }
};

export const setStoredSettings = async (play: Play, settings: PlaySettings) => {
  try {
    const oldSettings = await getStoredSettings(play);
    const serialisedSettings = JSON.stringify({ ...oldSettings, ...settings });

    await AsyncStorage.setItem(`@${play.play}-settings`, serialisedSettings);
  } catch (e) {
    return;
  }
};
