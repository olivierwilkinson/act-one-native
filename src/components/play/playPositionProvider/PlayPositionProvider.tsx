import React, { useState, useEffect, useContext } from "react";

import GET_PLAY from "../../../graphql/queries/GetPlay.graphql";
import PlayPositionContext from "../../../contexts/PlayPosition";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import { findActiveScene } from "../../../helpers/play";
import { useQuery } from "@apollo/client";
import { GetPlay } from "../../../graphql/queries/types/GetPlay";

type Props = {
  playId: number;
  children: JSX.Element;
};

const PlayPositionProvider = ({ playId, children }: Props) => {
  const { settings } = useContext(PlaySettingsContext);

  const { data: { play } = {} } = useQuery<GetPlay>(GET_PLAY, {
    variables: { where: { id: playId } },
    skip: !playId
  });

  const [activeScene, setActiveScene] = useState(
    findActiveScene(play?.scenes || [], settings)
  );
  const [activeLine, setActiveLine] = useState(activeScene?.lines[0]);

  useEffect(() => {
    const newActiveScene = findActiveScene(play?.scenes || [], settings);
    setActiveScene(newActiveScene);
    setActiveLine(newActiveScene?.lines[0]);
  }, [play, settings]);

  return (
    <PlayPositionContext.Provider
      value={{
        activeScene,
        activeLine,
        setActiveLine
      }}
    >
      {children}
    </PlayPositionContext.Provider>
  );
};

export default PlayPositionProvider;
