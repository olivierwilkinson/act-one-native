import React, { useState, useEffect, useContext } from "react";

import PlayNavigationContext from "../../../contexts/PlayNavigation";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import { createPlayNavigation } from "../../../helpers/contexts";
import usePrevious from "../../../hooks/usePrevious";
import SceneSelectModalContainer from "../sceneSelectModal/SceneSelectModalContainer";
import { useQuery } from "@apollo/client";
import { GetPlay } from "../../../graphql/queries/types/GetPlay";
import GET_PLAY from "../../../graphql/queries/GetPlay.graphql";

type Props = {
  playId: number;
  children: JSX.Element;
};

const PlayNavigationProvider = ({ playId, children }: Props) => {
  const { settings, setSettings } = useContext(PlaySettingsContext);
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

export default PlayNavigationProvider;
