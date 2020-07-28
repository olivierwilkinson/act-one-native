import React, { useState, useEffect } from "react";

import PageLoading from "../../common/pageLoading/PageLoading";
import PlaySettingsContext, {
  PlaySettings,
} from "../../../contexts/PlaySettings";
import { getStoredSettings, setStoredSettings } from "../../../helpers/storage";
import PlaySettingsModal from "../playSettingsModal/PlaySettingsModal";
import { Play as PlayType } from "../../../types/play-types";

type Props = {
  play: PlayType;
  children: JSX.Element;
};

const PlaySettingsProvider = ({ play, children }: Props) => {
  const [settings, setSettings] = useState<PlaySettings>();
  const [settingsActive, setSettingsActive] = useState(false);

  useEffect(() => {
    getStoredSettings(play).then((storedSettings) =>
      setSettings(storedSettings || {})
    );
  }, [getStoredSettings, play, setSettings]);

  useEffect(() => {
    if (settings) {
      setStoredSettings(play, settings);
    }
  }, [setStoredSettings, play, settings]);

  if (!settings) {
    return <PageLoading message={`Loading ${play.play}...`} />;
  }

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

      <PlaySettingsModal
        play={play}
        visible={settingsActive}
        onClose={() => setSettingsActive(false)}
      />
    </PlaySettingsContext.Provider>
  );
};

export default PlaySettingsProvider;
