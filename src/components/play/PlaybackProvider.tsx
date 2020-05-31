import React, { useState, ReactNode, useEffect, useContext } from "react";
import { AUDIO_RECORDING } from "expo-permissions";

import Playback, { PlaybackMode } from "../../contexts/Playback";
import PermissionsContext from "../../contexts/Permissions";

type Props = {
  children: ReactNode;
};

const PlaybackProvider = ({ children }: Props) => {
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
  }, [mode, permissions, requesting, ask]);

  return (
    <Playback.Provider
      value={{
        mode,
        setMode
      }}
    >
      {children}
    </Playback.Provider>
  );
};

export default PlaybackProvider;
