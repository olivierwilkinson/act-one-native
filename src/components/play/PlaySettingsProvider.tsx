import React, { useState, useEffect } from "react";

import PageLoading from "../common/PageLoading";
import PlaySettingsContext, { PlaySettings } from "../../contexts/PlaySettings";
import { getStoredSettings, setStoredSettings } from "../../helpers/storage";
import { Play as PlayType } from "../../types/play-types";

type Props = {
  play: PlayType;
  onSettingsChange: () => void;
  children: JSX.Element;
};

const PlaySettingsProvider = ({ play, onSettingsChange, children }: Props) => {
  const [settings, setSettings] = useState<PlaySettings>();

  useEffect(() => {
    getStoredSettings(play).then(storedSettings =>
      setSettings(storedSettings || {})
    );
  }, [getStoredSettings, play, setSettings]);

  useEffect(() => {
    if (settings) {
      setStoredSettings(play, settings);
      onSettingsChange();
    }
  }, [setStoredSettings, play, settings]);

  if (!settings) {
    return <PageLoading message={`Loading ${play.play}...`} />;
  }

  return (
    <PlaySettingsContext.Provider
      value={{
        settings,
        setSettings: (newSettings: PlaySettings) => {
          setSettings({
            ...settings,
            ...newSettings
          });
        }
      }}
    >
      {children}
    </PlaySettingsContext.Provider>
  );
};

export default PlaySettingsProvider;
