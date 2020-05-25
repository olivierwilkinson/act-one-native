import React, { useState, ReactNode, useEffect, useContext } from "react";
import { AUDIO_RECORDING } from "expo-permissions";

import PlaybackModeContext, { PlaybackMode } from "../../contexts/PlaybackMode";
import PermissionsContext from "../../contexts/Permissions";

type Props = {
  children: ReactNode;
};

const PlaybackModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState(PlaybackMode.Play);
  const { permissions, requesting, ask } = useContext(PermissionsContext);

  useEffect(() => {
    const grantedRecording = !!permissions[AUDIO_RECORDING]?.granted;
    const deniedRecording = permissions[AUDIO_RECORDING]?.status === "denied";
    const requestingRecording = requesting.includes(AUDIO_RECORDING);

    if (
      mode === PlaybackMode.Record &&
      !(grantedRecording || deniedRecording || requestingRecording)
    ) {
      ask(AUDIO_RECORDING);
    }
  }, [mode]);

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
