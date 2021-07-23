import React, { useState, ReactNode, useContext, useRef, useMemo } from "react";
import { AUDIO_RECORDING } from "expo-permissions";

import Playback, { PlaybackMode } from "../../../contexts/Playback";
import Audio from "../../../contexts/Audio";
import PermissionsContext from "../../../contexts/Permissions";
import PlaySettings from "../../../contexts/PlaySettings";
import { getLineText } from "../../../helpers/play";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../app/authProvider/AuthProvider";
import { usePlayPosition } from "../../../contexts/PlayPosition";
import { useQuery } from "@apollo/client";
import GET_PLAYBACK_PROVIDER_SCENE from "./GetPlaybackProviderScene.graphql";
import {
  GetPlaybackProviderScene,
  GetPlaybackProviderSceneVariables,
} from "./types/GetPlaybackProviderScene";

type Props = {
  children: ReactNode;
};

type Line = {
  id: number;
  player: string;
  index: number;
  lineRows: { index: number; text: string }[];
};

const PlaybackProvider = ({ children }: Props) => {
  const { permissions, requesting, ask } = useContext(PermissionsContext);
  const { play, record, speak, stop } = useContext(Audio);
  const { user, openLoginModal } = useAuth();
  const { activeSceneId, activeLineId, setActiveLineId } = usePlayPosition();
  const { settings: { selectedPlayer = "" } = {} } = useContext(PlaySettings);

  const [mode, setMode] = useState(PlaybackMode.Play);
  const stoppedFlag = useRef(false);

  const { data: { scene } = {} } = useQuery<
    GetPlaybackProviderScene,
    GetPlaybackProviderSceneVariables
  >(GET_PLAYBACK_PROVIDER_SCENE, {
    variables: { where: { id: activeSceneId } },
    skip: !activeSceneId,
  });

  const lines = useMemo(() =>
    [...(scene?.lines || [])].sort((a, b) => a.index - b.index),
    [scene?.lines]
  );

  const run: (line: Line) => Promise<void> = async (line: Line) => {
    console.log('run', line)
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

    const nextLine = lines[line.index + 1];
    if (!nextLine) {
      return stop();
    }

    setActiveLineId(nextLine.id);
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
          stoppedFlag.current = true;
          stop();

          if (mode === PlaybackMode.Record) {
            if (!user) {
              openLoginModal("Sign in to begin recording");
              throw new Error("Unable to record, you must be logged in");
            }

            if (!canRecord) {
              ask(AUDIO_RECORDING);
              throw new Error("Unable to record, insufficient permissions");
            }
          }

          setMode(mode);
        },
        start: () => {
          const line = lines.find(({ id }) => id === activeLineId);
          if (!line) return;

          stoppedFlag.current = false;
          return run(line);
        },
        stop: () => {
          stoppedFlag.current = true;
          return stop();
        },
      }}
    >
      {children}
    </Playback.Provider>
  );
};

export default PlaybackProvider;
