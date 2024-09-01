import React, {
  useState,
  ReactNode,
  useRef,
  useMemo,
  useContext,
  useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "./Auth";
import { useAudio } from "./Audio";
import { usePlaySettings } from "./PlaySettings";
import { usePlayPosition } from "./PlayPosition";
import { getLineText } from "../helpers/play";

import GET_PLAYBACK_PROVIDER_SCENE from "./queries/GetPlaybackProviderScene.graphql";
import {
  GetPlaybackProviderScene,
  GetPlaybackProviderSceneVariables
} from "./queries/types/GetPlaybackProviderScene";

export enum PlaybackMode {
  Play = "PLAY",
  Record = "RECORD"
}

export enum PlaybackState {
  Running = "RUNNING",
  Paused = "PAUSED",
  Stopped = "STOPPED",
  Recording = "RECORDING"
}

export interface PlaybackContextValue {
  mode: PlaybackMode;
  setMode: (mode: PlaybackMode) => void;
  start: () => void;
  stop: () => void;
}

const PlaybackContext = React.createContext<PlaybackContextValue | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

type Line = {
  id: number;
  player: string;
  index: number;
  lineRows: { index: number; text: string }[];
};

export const PlaybackProvider = ({ children }: Props) => {
  const navigation = useNavigation();
  const { play, record, speak, stop } = useAudio();
  const { user, openLoginModal } = useAuth();
  const { activeSceneId, activeLineId, setActiveLineId } = usePlayPosition();
  const { settings: { selectedPlayer = "" } = {} } = usePlaySettings();

  const [mode, setMode] = useState(PlaybackMode.Play);
  const stoppedFlag = useRef(false);

  const { data: { scene } = {} } = useQuery<
    GetPlaybackProviderScene,
    GetPlaybackProviderSceneVariables
  >(GET_PLAYBACK_PROVIDER_SCENE, {
    variables: { where: { id: activeSceneId } },
    skip: !activeSceneId
  });

  const lines = useMemo(
    () => [...(scene?.lines || [])].sort((a, b) => a.index - b.index),
    [scene?.lines]
  );

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

    const nextLine = lines[line.index + 1];
    if (!nextLine) {
      return stop();
    }

    setActiveLineId(nextLine.id);
    return run(nextLine);
  };

  // stop playback when the screen is popped from the stack
  useEffect(() => {
    return navigation.addListener("blur", stop);
  }, [navigation, stop]);

  return (
    <PlaybackContext.Provider
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
        }
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => {
  const playback = useContext(PlaybackContext);
  if (!playback) {
    throw new Error("usePlayback must be used within a PlaybackProvider");
  }

  return playback;
};
