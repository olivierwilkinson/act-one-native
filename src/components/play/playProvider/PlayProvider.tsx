import React, { useContext, createContext } from "react";

import { Play } from "../../../types/play-types";

const PlayContext = createContext<Play | undefined>(undefined);

type Props = {
  play: Play;
  children: JSX.Element;
};

const PlayProvider = ({ play, children }: Props) => (
  <PlayContext.Provider value={play}>{children}</PlayContext.Provider>
);

export const usePlay = () => {
  const play = useContext(PlayContext);
  if (!play) {
    throw new Error("Play context must be used within a PlayProvider");
  }

  return play;
};

export default PlayProvider;
