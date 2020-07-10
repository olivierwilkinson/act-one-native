import React from "react";

export type PlaySettings = {
  selectedPlayer?: string;
  act?: number;
  scene?: number;
};

export type PlaySettingsContextValue = {
  settings: PlaySettings;
  setSettings: (settings: PlaySettings) => void;
  openSettings: () => void;
};

export default React.createContext<PlaySettingsContextValue>({
  settings: {},
  setSettings: () => null,
  openSettings: () => null,
});
