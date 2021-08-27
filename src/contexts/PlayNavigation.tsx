import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import { usePlaySettings } from "./PlaySettings";
import { createPlayNavigation } from "../helpers/contexts";
import usePrevious from "../hooks/usePrevious";
import SceneSelectModalContainer from "../components/play/sceneSelectModal/SceneSelectModalContainer";
import { GetPlay } from "../graphql/queries/types/GetPlay";
import GET_PLAY from "../graphql/queries/GetPlay.graphql";

export interface PlayNavigation {
  goToNextScene?: () => void;
  goToPreviousScene?: () => void;
  openSceneSelect: () => void;
}

const PlayNavigationContext = React.createContext<PlayNavigation>({
  openSceneSelect: () => null,
});

type Props = {
  playId: number;
  children: JSX.Element;
};

export const PlayNavigationProvider = ({ playId, children }: Props) => {
  const { settings, setSettings } = usePlaySettings()
  const previousSettings = usePrevious(settings);

  const { data: { play } = {} } = useQuery<GetPlay>(GET_PLAY, {
    variables: { where: { id: playId } },
    skip: !playId,
  });

  const [sceneSelectActive, setSceneSelectActive] = useState(false);
  const [playNavigation, setPlayNavigation] = useState(
    createPlayNavigation({
      play,
      settings,
      setSettings,
      setSceneSelectActive,
    })
  );

  useEffect(() => {
    if (!previousSettings || !settings) {
      return;
    }

    setPlayNavigation(
      createPlayNavigation({
        play,
        settings,
        setSettings,
        setSceneSelectActive,
      })
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
        scenes={[...(play?.scenes || [])].sort((a, b) => a.index - b.index)}
        visible={sceneSelectActive}
        onClose={() => setSceneSelectActive(false)}
      />
    </>
  );
};

export const usePlayNavigation = () => {
  const playNavigation = useContext(PlayNavigationContext);
  if (!playNavigation) {
    throw new Error("usePlayNavigation must be used within a PlayNavigationProvider");
  }

  return playNavigation;
};
