import React, { useContext, useState, useEffect, ReactNode } from "react";
import { Alert, Linking } from "react-native";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import { AUDIO_RECORDING } from "expo-permissions";

import AudioContext, { AudioState } from "../../contexts/Audio";
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

  const [audioState, setAudioState] = useState(AudioState.Stopped);
  const previousAudioState = usePrevious(audioState);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      setAudioState(AudioState.Stopped)
    );

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!previousAudioState) {
      return;
    }

    switch (audioState) {
      case AudioState.Stopped:
        Speech.stop();
        break;

      case AudioState.Paused:
        Speech.pause();
        break;

      case AudioState.Playing:
        if (previousAudioState === AudioState.Paused) {
          Speech.resume();
          break;
        }

        if (
          previousAudioState === AudioState.Stopped ||
          previousAudioState === AudioState.Recording
        ) {
          beginPlayback(activeLine);
          break;
        }

      case AudioState.Recording:
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

          setAudioState(AudioState.Stopped);
          break;
        }

        beginPlayback(activeLine);
        break;
    }
  }, [audioState, previousAudioState]);

  const beginPlayback = (line: Line) => {
    Speech.speak(getLineText(line), {
      voice: "com.apple.ttsbundle.Daniel-compact",
      onDone: () => {
        const lineIndex = lines.findIndex(({ id }) => line.id === id);
        const nextLine = lines[lineIndex + 1];
        if (!nextLine) {
          return setAudioState(AudioState.Stopped);
        }

        setActiveLine(nextLine);
        beginPlayback(nextLine);
      }
    });
  };

  return (
    <AudioContext.Provider
      value={{
        audioState,
        setAudioState
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
