import React, { useState, useEffect } from "react";

import { Play as PlayType } from "../../types/play-types";
import PlayNavigationContext from "../../contexts/PlayNavigation";
import { PlaySettings } from "../../contexts/PlaySettings";
import { createPlayNavigation } from "../../helpers/contexts";
import { NavigationStackProp } from "react-navigation-stack";
import usePrevious from "../../hooks/usePrevious";

type Props = {
  navigation: NavigationStackProp;
  play: PlayType;
  settings: PlaySettings;
  children: JSX.Element;
};

const PlayNavigationProvider = ({
  navigation,
  play,
  settings,
  children
}: Props) => {
  const previousSettings = usePrevious(settings);
  const [playNavigation, setPlayNavigation] = useState(
    createPlayNavigation(navigation, play, settings)
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

    setPlayNavigation(createPlayNavigation(navigation, play, settings));
  }, [settings.act, settings.scene]);

  return (
    <PlayNavigationContext.Provider value={playNavigation}>
      {children}
    </PlayNavigationContext.Provider>
  );
};

export default PlayNavigationProvider;
