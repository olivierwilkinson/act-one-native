import { useQuery } from "@apollo/client";
import React, { useContext, useState, ReactNode, useMemo } from "react";

import { usePlaySettings } from "./PlaySettings";
import { findActiveScene } from "../helpers/play";
import GET_PLAY from "../graphql/queries/GetPlay.graphql";
import { GetPlay } from "../graphql/queries/types/GetPlay";

export interface PlayPosition {
  activeSceneId?: number;
  activeLineId?: number;
  setActiveLineId: (line: number) => void;
}

const PlayPositionContext = React.createContext<PlayPosition | undefined>(
  undefined
);

export function usePlayPosition() {
  const position = useContext(PlayPositionContext);
  if (typeof position === "undefined") {
    throw new Error(
      "usePlayPosition must be used within a PlayPositionProvider"
    );
  }

  return position;
}

export type Props = {
  playId: number;
  children: ReactNode;
};

export const PlayPositionProvider = ({ playId, children }: Props) => {
  const { settings } = usePlaySettings();

  const { data: { play } = {} } = useQuery<GetPlay>(GET_PLAY, {
    variables: { where: { id: playId } },
    skip: !playId
  });

  const activeScene = findActiveScene(play?.scenes || [], settings);
  const activeSceneId = activeScene?.id;
  const defaultActiveLineId = activeScene?.lines[0]?.id;
  const [chosenActiveLineId, setChosenActiveLineId] = useState(
    defaultActiveLineId
  );

  const value = useMemo(
    () => ({
      activeSceneId,
      activeLineId: chosenActiveLineId || defaultActiveLineId,
      setActiveLineId: setChosenActiveLineId
    }),
    [
      activeSceneId,
      chosenActiveLineId,
      defaultActiveLineId,
      setChosenActiveLineId
    ]
  );

  return (
    <PlayPositionContext.Provider value={value}>
      {children}
    </PlayPositionContext.Provider>
  );
};
