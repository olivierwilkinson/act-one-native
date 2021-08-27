import React, { useState, useEffect, useContext } from "react";

import { getStoredSettings, setStoredSettings } from "../helpers/storage";
import PlaySettingsModalContainer from "../components/play/playSettingsModal/PlaySettingsModalContainer";

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

const PlaySettingsContext = React.createContext<PlaySettingsContextValue>({
  setSettings: () => null,
  openSettings: () => null,
});

type Props = {
  playId: number;
  children: JSX.Element;
};

export const PlaySettingsProvider = ({ playId, children }: Props) => {
  const [settings, setSettings] = useState<PlaySettings>();
  const [settingsActive, setSettingsActive] = useState(false);

  useEffect(() => {
    getStoredSettings(playId).then((storedSettings) =>
      setSettings(storedSettings || {})
    );
  }, [getStoredSettings, playId, setSettings]);

  useEffect(() => {
    if (settings) {
      setStoredSettings(playId, settings);
    }
  }, [setStoredSettings, playId, settings]);

  return (
    <PlaySettingsContext.Provider
      value={{
        settings,
        openSettings: () => setSettingsActive(true),
        setSettings: (newSettings: PlaySettings) => {
          setSettings({
            ...settings,
            ...newSettings,
          });
        },
      }}
    >
      {children}

      <PlaySettingsModalContainer
        playId={playId}
        visible={settingsActive}
        onClose={() => setSettingsActive(false)}
      />
    </PlaySettingsContext.Provider>
  );
};

export const usePlaySettings = () => {
  const playSettings = useContext(PlaySettingsContext);
  if (!playSettings) {
    throw new Error(
      "usePlaySettings must be used within an PlaySettingsProvider"
    );
  }

  return playSettings;
};
