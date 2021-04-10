import "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { PlaySettings } from "../contexts/PlaySettings";

export const getStoredSettings: (
  playId: number
) => Promise<null | PlaySettings> = async playId => {
  try {
    const serialisedSettings = await AsyncStorage.getItem(
      `@${playId}-settings`
    );

    if (!serialisedSettings) {
      return null;
    }

    return JSON.parse(serialisedSettings);
  } catch (e) {
    return null;
  }
};

export const setStoredSettings = async (
  playId: number,
  settings: PlaySettings
) => {
  try {
    const oldSettings = await getStoredSettings(playId);
    const serialisedSettings = JSON.stringify({ ...oldSettings, ...settings });

    await AsyncStorage.setItem(`@${playId}-settings`, serialisedSettings);
  } catch (e) {
    return;
  }
};
