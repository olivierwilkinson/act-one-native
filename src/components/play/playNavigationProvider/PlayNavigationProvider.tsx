import React, { useState, useEffect, useContext } from "react";

import { Play as PlayType } from "../../../types/play-types";
import PlayNavigationContext from "../../../contexts/PlayNavigation";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import { createPlayNavigation } from "../../../helpers/contexts";
import usePrevious from "../../../hooks/usePrevious";
import SceneSelectModalContainer from "../sceneSelectModal/SceneSelectModalContainer";

type Props = {
  play: PlayType;
  children: JSX.Element;
};

const PlayNavigationProvider = ({ play, children }: Props) => {
  const { settings, setSettings } = useContext(PlaySettingsContext);
  const previousSettings = usePrevious(settings);

  const [sceneSelectActive, setSceneSelectActive] = useState(false);
  const [playNavigation, setPlayNavigation] = useState(
    createPlayNavigation(play, settings, setSettings, setSceneSelectActive)
  );

  useEffect(() => {
    if (!previousSettings) {
      return;
    }

    const { actNum: prevActNum, sceneNum: prevSceneNum } = previousSettings;
    const { actNum, sceneNum } = settings;
    if (actNum === prevActNum && sceneNum === prevSceneNum) {
      return;
    }

    setPlayNavigation(
      createPlayNavigation(play, settings, setSettings, setSceneSelectActive)
    );
  }, [play, settings, previousSettings, setSettings, setSceneSelectActive]);

  useEffect(() => {
    if (settings) {
      setSceneSelectActive(false);
    }
  }, [settings]);

  return (
    <>
      <PlayNavigationContext.Provider value={playNavigation}>
        {children}
      </PlayNavigationContext.Provider>

      <SceneSelectModalContainer
        scenes={play.scenes}
        visible={sceneSelectActive}
        onClose={() => setSceneSelectActive(false)}
      />
    </>
  );
};

export default PlayNavigationProvider;
