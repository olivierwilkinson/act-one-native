import React, { useState, ReactNode } from "react";

import PlaybackModeContext from "../../contexts/PlaybackMode";
import { PlaybackMode } from "../../types/playback-types";

type Props = {
  children: ReactNode;
};

const PlaybackModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState(PlaybackMode.Play);

  return (
    <PlaybackModeContext.Provider
      value={{
        mode,
        setMode
      }}
    >
      {children}
    </PlaybackModeContext.Provider>
  );
};

export default PlaybackModeProvider;
