import React, { useState, useEffect } from "react";

import PlaySettingsContext, {
  PlaySettings
} from "../../../contexts/PlaySettings";
import { getStoredSettings, setStoredSettings } from "../../../helpers/storage";
import PlaySettingsModalContainer from "../playSettingsModal/PlaySettingsModalContainer";

type Props = {
  playId: number;
  children: JSX.Element;
};

const PlaySettingsProvider = ({ playId, children }: Props) => {
  const [settings, setSettings] = useState<PlaySettings>();
  const [settingsActive, setSettingsActive] = useState(false);

  useEffect(() => {
    getStoredSettings(playId).then(storedSettings =>
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
            ...newSettings
          });
        }
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

export default PlaySettingsProvider;
