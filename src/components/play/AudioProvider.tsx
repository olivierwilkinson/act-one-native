import React, { useContext, useState, useEffect, ReactNode } from "react";
import { Alert, Linking, AsyncStorage } from "react-native";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import { AUDIO_RECORDING } from "expo-permissions";
import { Audio } from "expo-av";

import AudioContext, { AudioState } from "../../contexts/Audio";
import PlayPositionContext from "../../contexts/PlayPosition";
import PermissionsContext from "../../contexts/Permissions";
import PlaybackModeContext, { PlaybackMode } from "../../contexts/Playback";
import { getLineText } from "../../helpers/play";
import usePrevious from "../../hooks/usePrevious";
import { Line } from "../../types/play-types";
import PlaySettingsContext from "../../contexts/PlaySettings";

const saveRecording = async (recording: Audio.Recording, line: Line) => {
  console.log('save', line.id)
  try {
    try {
      await recording.stopAndUnloadAsync();
    } catch (_) {}

    const uri = recording.getURI();
    if (uri) {
      await AsyncStorage.setItem(`line:${line.id}`, uri);
    }
  } catch (e) {
    console.error(e);
  }
};

type Props = {
  children: ReactNode;
};

const AudioProvider = ({ children }: Props) => {
  const {
    activeScene: { lines },
    setActiveLine,
    activeLine,
  } = useContext(PlayPositionContext);
  const navigation = useNavigation();
  const { permissions } = useContext(PermissionsContext);
  const {
    settings: { selectedPlayer },
  } = useContext(PlaySettingsContext);
  const { mode } = useContext(PlaybackModeContext);

  const [audioState, setAudioState] = useState(AudioState.Stopped);
  const previousAudioState = usePrevious(audioState);
  const [recording, setRecording] = useState<Audio.Recording>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      setAudioState(AudioState.Stopped)
    );

    return unsubscribe;
  }, [navigation]);

  const play = (line: Line, onDone: (nextLine?: Line) => void) => {
    Speech.speak(getLineText(line), {
      voice: "com.apple.ttsbundle.Daniel-compact",
      onDone: () => {
        const lineIndex = lines.findIndex(({ id }) => line.id === id);

        onDone(lines[lineIndex + 1]);
      },
    });
  };

  const record = async () => {
    console.log('record', activeLine.id)
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
      const newRecording = new Audio.Recording();
      setRecording(newRecording);

      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
      );
      await newRecording.startAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextLine = (nextLine?: Line) => {
    if (!nextLine) {
      return setAudioState(AudioState.Stopped);
    }

    setActiveLine(nextLine);
    if (mode === PlaybackMode.Record && selectedPlayer === nextLine.player) {
      return record();
    }

    play(nextLine, handleNextLine);
  };

  useEffect(() => {
    if (!previousAudioState || previousAudioState === audioState) {
      return;
    }

    switch (audioState) {
      case AudioState.Stopped:
        if (
          previousAudioState === AudioState.Playing ||
          previousAudioState === AudioState.Paused
        ) {
          Speech.stop();
          break;
        }

        if (previousAudioState === AudioState.Recording) {
          if (recording) {
            saveRecording(recording, activeLine).then(() => {
              const lineIndex = lines.findIndex(
                ({ id }) => activeLine.id === id
              );
              handleNextLine(lines[lineIndex + 1]);
            });
          } else {
            const lineIndex = lines.findIndex(({ id }) => activeLine.id === id);
            handleNextLine(lines[lineIndex + 1]);
          }
        }
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
          play(activeLine, handleNextLine);
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
                style: "cancel",
              },
              {
                text: "Settings",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );

          setAudioState(AudioState.Stopped);
          break;
        }

        record();
        break;
    }
  }, [audioState, previousAudioState, handleNextLine, play, record, recording, permissions]);

  return (
    <AudioContext.Provider
      value={{
        audioState,
        setAudioState,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
