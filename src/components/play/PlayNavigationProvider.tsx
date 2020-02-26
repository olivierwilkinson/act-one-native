import React, { useState, useEffect } from "react";

import { Play as PlayType } from "../../types/play-types";
import PlayNavigationContext from "../../contexts/PlayNavigation";
import { PlaySettings } from "../../contexts/PlaySettings";
import { createPlayNavigation } from "../../helpers/contexts";
import { NavigationStackProp } from "react-navigation-stack";

type Props = {
  navigation: NavigationStackProp;
  play: PlayType;
  settings: PlaySettings;
  children: JSX.Element;
};

export default ({ navigation, play, settings, children }: Props) => {
  const [playNavigation, setPlayNavigation] = useState(
    createPlayNavigation(navigation, play, settings)
  );

  useEffect(() => {
    setPlayNavigation(createPlayNavigation(navigation, play, settings));
  }, [settings.act, settings.scene]);

  return (
    <PlayNavigationContext.Provider value={playNavigation}>
      {children}
    </PlayNavigationContext.Provider>
  );
};
