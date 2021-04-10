import React from "react";

export type PlaySettings = {
  selectedPlayer?: string;
  actNum?: number;
  sceneNum?: number;
};

export type PlaySettingsContextValue = {
  settings?: PlaySettings;
  setSettings: (settings: PlaySettings) => void;
  openSettings: () => void;
};

export default React.createContext<PlaySettingsContextValue>({
  setSettings: () => null,
  openSettings: () => null
});
