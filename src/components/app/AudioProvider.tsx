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
    switch (audioState) {
      case AudioState.Recording:
        await stopRecording();
        break;

      case AudioState.Speaking:
        await Speech.stop();
        break;

      case AudioState.Playing:
        break;
    }

    setAudioState(AudioState.Stopped);
  };

  const record = async (line: Line) => {
    await stop();

    try {
      await beginRecording(`line:${line.id}`);
      setAudioState(AudioState.Recording);
    } catch (_) {
      // catch case where permission not granted
    }
  };

  const speak = async (line: Line, options?: Speech.SpeechOptions) => {
    if (await Speech.isSpeakingAsync()) {
      setAudioState(AudioState.Speaking);
      return Speech.resume();
    }

    return new Promise<void>((res, rej) =>
      Speech.speak(getLineText(line), {
        voice: "com.apple.ttsbundle.Daniel-compact",
        ...options,
        onStart: () => {
          setAudioState(AudioState.Speaking);
        },
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
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
  }, []);

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
