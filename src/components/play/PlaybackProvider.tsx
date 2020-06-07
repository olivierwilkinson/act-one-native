import React, { useState, ReactNode, useEffect, useContext } from "react";
import { AUDIO_RECORDING } from "expo-permissions";

import Playback, { PlaybackMode } from "../../contexts/Playback";
import Audio from "../../contexts/Audio";
import PermissionsContext from "../../contexts/Permissions";
import { Line } from "../../types/play-types";
import PlayPosition from "../../contexts/PlayPosition";
import PlaySettings from "../../contexts/PlaySettings";
import { getLineText } from "../../helpers/play";
import { AsyncStorage } from "react-native";

type Props = {
  children: ReactNode;
};

const PlaybackProvider = ({ children }: Props) => {
  const { permissions, requesting, ask } = useContext(PermissionsContext);
  const { play, record, speak, stop } = useContext(Audio);
  const { activeScene, setActiveLine } = useContext(PlayPosition);
  const {
    settings: { selectedPlayer },
  } = useContext(PlaySettings);
  const [mode, setMode] = useState(PlaybackMode.Play);

  const start = async (line: Line) => {
    switch (mode) {
      case PlaybackMode.Play:
        console.log(`line:${line.id}`);
        const recordingUri = await AsyncStorage.getItem(`line:${line.id}`);
        if (recordingUri) {
          await play(recordingUri);
          break;
        }

        await speak(getLineText(line));
        break;

      case PlaybackMode.Record:
        if (line.player === selectedPlayer) {
          await record(`line:${line.id}`);
          break;
        }

        await speak(getLineText(line));
        break;
    }

    const lineIndex = activeScene.lines.findIndex(({ id }) => id === line.id);
    const nextLine = activeScene.lines[lineIndex + 1];
    if (!nextLine) {
      await stop();
      return;
    }

    setActiveLine(nextLine);
    await start(nextLine);
  };

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
        setMode,
        start,
      }}
    >
      {children}
    </Playback.Provider>
  );
};

export default PlaybackProvider;
