import React, { useContext, useState, useEffect, ReactNode } from "react";
import { Alert, Linking } from "react-native";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import { AUDIO_RECORDING } from "expo-permissions";

import AudioContext, { PlaybackState } from "../../contexts/Audio";
import PlayPositionContext from "../../contexts/PlayPosition";
import PermissionsContext from "../../contexts/Permissions";
import { getLineText } from "../../helpers/play";
import usePrevious from "../../hooks/usePrevious";
import { Line } from "../../types/play-types";

type Props = {
  children: ReactNode;
};

const AudioProvider = ({ children }: Props) => {
  const {
    activeScene: { lines },
    setActiveLine,
    activeLine
  } = useContext(PlayPositionContext);
  const navigation = useNavigation();
  const { permissions } = useContext(PermissionsContext);

  const [playbackState, setPlaybackState] = useState(PlaybackState.Stopped);
  const previousPlaybackState = usePrevious(playbackState);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      setPlaybackState(PlaybackState.Stopped)
    );

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!previousPlaybackState) {
      return;
    }

    switch (playbackState) {
      case PlaybackState.Stopped:
        Speech.stop();
        break;

      case PlaybackState.Paused:
        Speech.pause();
        break;

      case PlaybackState.Playing:
        if (previousPlaybackState === PlaybackState.Paused) {
          Speech.resume();
          break;
        }

        if (
          previousPlaybackState === PlaybackState.Stopped ||
          previousPlaybackState === PlaybackState.Recording
        ) {
          beginPlayback(activeLine);
          break;
        }

      case PlaybackState.Recording:
        if (!permissions[AUDIO_RECORDING]?.granted) {
          Alert.alert(
            "Unable to record",
            "We can't access your microphone, please update your permissions in the Settings app...",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Settings",
                onPress: () => Linking.openURL("app-settings:")
              }
            ]
          );

          setPlaybackState(PlaybackState.Stopped);
          break;
        }

        beginPlayback(activeLine);
        break;
    }
  }, [playbackState, previousPlaybackState]);

  const beginPlayback = (line: Line) => {
    Speech.speak(getLineText(line), {
      voice: "com.apple.ttsbundle.Daniel-compact",
      onDone: () => {
        const lineIndex = lines.findIndex(({ id }) => line.id === id);
        const nextLine = lines[lineIndex + 1];
        if (!nextLine) {
          return setPlaybackState(PlaybackState.Stopped);
        }

        setActiveLine(nextLine);
        beginPlayback(nextLine);
      }
    });
  };

  return (
    <AudioContext.Provider
      value={{
        playbackState,
        setPlaybackState
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
