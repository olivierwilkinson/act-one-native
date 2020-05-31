import React, { useState, ReactNode, useContext, useEffect } from "react";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import AudioContext, { AudioState } from "../../contexts/Audio";
import { getLineText } from "../../helpers/play";
import { Line } from "../../types/play-types";
import Recording from "../../contexts/Recording";

type Props = {
  children: ReactNode;
};

const AudioProvider = ({ children }: Props) => {
  const { recording, record: beginRecording, stop: stopRecording } = useContext(
    Recording
  );
  const [audioState, setAudioState] = useState(AudioState.Stopped);

  const stop = async () => {
    setAudioState(AudioState.Stopped);

    switch (audioState) {
      case AudioState.Recording:
        await stopRecording();
        return Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });

      case AudioState.Speaking:
        return Speech.stop();

      case AudioState.Playing:
        return undefined;
    }
  };

  const record = async (line: Line) => {
    await stop();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    try {
      await beginRecording(`line:${line.id}`);
      setAudioState(AudioState.Recording);
    } catch (_) {
      // catch case where permission not granted
    }
  };

  const speak = async (line: Line, options?: Speech.SpeechOptions) => {
    setAudioState(AudioState.Speaking);

    if (audioState === AudioState.Paused) {
      return Speech.resume();
    }

    return new Promise<void>((res, rej) =>
      Speech.speak(getLineText(line), {
        voice: "com.apple.ttsbundle.Daniel-compact",
        ...options,
        onDone: () => {
          setAudioState(AudioState.Stopped);
          res();
        },
        onError: (e) => {
          setAudioState(AudioState.Stopped);
          rej(e);
        },
      })
    );
  };

  const pause = async () => {
    setAudioState(AudioState.Paused);

    switch (audioState) {
      case AudioState.Recording:
        await recording?.pauseAsync();
        break;

      case AudioState.Speaking:
        await Speech.pause();
        break;

      case AudioState.Playing:
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(audioState);
  }, [audioState]);

  return (
    <AudioContext.Provider
      value={{
        audioState,
        record,
        speak,
        pause,
        stop,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
