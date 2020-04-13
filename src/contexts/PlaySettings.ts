import React from "react";

export type PlaySettings = {
  selectedPlayer?: string;
  act?: number;
  scene?: number;
};

export type PlaySettingsContext = {
  settings: PlaySettings;
  setSettings: (settings: PlaySettings) => void;
}

export default React.createContext<PlaySettingsContext>({
  settings: {},
  setSettings: () => null,
});
