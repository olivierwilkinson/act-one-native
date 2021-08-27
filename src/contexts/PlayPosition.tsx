import { useQuery } from "@apollo/client";
import React, {
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

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
  const { settings } = usePlaySettings()

  const { data: { play } = {} } = useQuery<GetPlay>(GET_PLAY, {
    variables: { where: { id: playId } },
    skip: !playId,
  });

  const activeScene = findActiveScene(play?.scenes || [], settings);
  const [activeSceneId, setActiveSceneId] = useState(activeScene?.id);
  const [activeLineId, setActiveLineId] = useState(activeScene?.lines[0]?.id);

  useEffect(() => {
    const newActiveScene = findActiveScene(play?.scenes || [], settings);
    setActiveSceneId(newActiveScene?.id);
    setActiveLineId(newActiveScene?.lines[0]?.id);
  }, [play, settings]);

  const value = useMemo(
    () => ({
      activeSceneId,
      activeLineId,
      setActiveLineId,
    }),
    [activeSceneId, activeLineId]
  );

  return (
    <PlayPositionContext.Provider value={value}>
      {children}
    </PlayPositionContext.Provider>
  );
};
