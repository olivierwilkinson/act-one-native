import React, { useState, ReactNode, useContext, useRef } from "react";
import { AUDIO_RECORDING } from "expo-permissions";

import Playback, { PlaybackMode } from "../../../../contexts/Playback";
import Audio from "../../../../contexts/Audio";
import PermissionsContext from "../../../../contexts/Permissions";
import { Line } from "../../../../types/play-types";
import PlayPosition from "../../../../contexts/PlayPosition";
import PlaySettings from "../../../../contexts/PlaySettings";
import { getLineText } from "../../../../helpers/play";
import AsyncStorage from "@react-native-community/async-storage";

type Props = {
  children: ReactNode;
};

const PlaybackProvider = ({ children }: Props) => {
  const { permissions, requesting, ask } = useContext(PermissionsContext);
  const { play, record, speak, stop } = useContext(Audio);

  const { activeScene, activeLine, setActiveLine } = useContext(PlayPosition);
  const {
    settings: { selectedPlayer }
  } = useContext(PlaySettings);

  const [mode, setMode] = useState(PlaybackMode.Play);
  const stoppedFlag = useRef(false);

  const run: (line: Line) => Promise<void> = async (line: Line) => {
    try {
      switch (mode) {
        case PlaybackMode.Play:
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
    } catch (_) {
      return stop();
    }

    if (stoppedFlag.current) {
      return stop();
    }

    const lineIndex = activeScene.lines.findIndex(({ id }) => id === line.id);
    const nextLine = activeScene.lines[lineIndex + 1];
    if (!nextLine) {
      return stop();
    }

    setActiveLine(nextLine);
    return run(nextLine);
  };

  const canRecord =
    !!permissions[AUDIO_RECORDING]?.granted &&
    permissions[AUDIO_RECORDING]?.status !== "denied" &&
    !requesting.includes(AUDIO_RECORDING);

  return (
    <Playback.Provider
      value={{
        mode,
        setMode: (mode: PlaybackMode) => {
          if (mode === PlaybackMode.Record && !canRecord) {
            ask(AUDIO_RECORDING);
          } else {
            setMode(mode);
          }

          stoppedFlag.current = true;
          return stop();
        },
        start: () => {
          stoppedFlag.current = false;
          return run(activeLine);
        },
        stop: () => {
          stoppedFlag.current = true;
          return stop();
        }
      }}
    >
      {children}
    </Playback.Provider>
  );
};

export default PlaybackProvider;
