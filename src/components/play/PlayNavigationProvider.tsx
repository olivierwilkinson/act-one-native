import React, { useState, useEffect, useContext } from "react";

import { Play as PlayType } from "../../types/play-types";
import PlayNavigationContext from "../../contexts/PlayNavigation";
import PlaySettingsContext from "../../contexts/PlaySettings";
import { createPlayNavigation } from "../../helpers/contexts";
import usePrevious from "../../hooks/usePrevious";

type Props = {
  play: PlayType;
  children: JSX.Element;
};

const PlayNavigationProvider = ({
  play,
  children
}: Props) => {
  const { settings, setSettings } = useContext(PlaySettingsContext)
  const previousSettings = usePrevious(settings);
  const [playNavigation, setPlayNavigation] = useState(
    createPlayNavigation(play, settings, setSettings)
  );

  useEffect(() => {
    if (!previousSettings) {
      return;
    }

    const { act: prevAct, scene: prevScene } = previousSettings;
    const { act, scene } = settings;
    if (act === prevAct && scene === prevScene) {
      return;
    }

    setPlayNavigation(createPlayNavigation(play, settings, setSettings));
  }, [play, settings, previousSettings, setSettings]);

  return (
    <PlayNavigationContext.Provider value={playNavigation}>
      {children}
    </PlayNavigationContext.Provider>
  );
};

export default PlayNavigationProvider;
