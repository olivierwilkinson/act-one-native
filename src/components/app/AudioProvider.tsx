import React, { useState, ReactNode, useContext, useEffect } from "react";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { Alert, Linking } from "react-native";

import AudioContext, { AudioState } from "../../contexts/Audio";
import Recording from "../../contexts/Recording";
import Sound from "../../contexts/Sound";
import { PermissionError } from "../../contexts/Permissions";

type Props = {
  children: ReactNode;
};

const AudioProvider = ({ children }: Props) => {
  const { recording, record } = useContext(Recording);
  const { sound, play } = useContext(Sound);
  const [audioState, setAudioState] = useState(AudioState.Stopped);

  const stopAudio = async () => {
    await recording?.stopAndUnloadAsync();
    await Speech.stop();
    await sound?.stopAsync();
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
        stop: async () => {
          await stopAudio();

          setAudioState(AudioState.Stopped);
        },
        finish: async () => {
          await stopAudio();

          setAudioState(AudioState.Finished);
        },
        play: async (uri: string) => {
          await stopAudio();

          setAudioState(AudioState.Playing);
          await play(uri);

          setAudioState(AudioState.Finished);
        },
        record: async (key: string) => {
          await stopAudio();

          try {
            setAudioState(AudioState.Recording);
            await record(key);
          } catch (e) {
            if (e instanceof PermissionError) {
              Alert.alert("Unable to record", e.message, [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Settings",
                  onPress: () => Linking.openURL("app-settings:"),
                },
              ]);
            }
          }

          setAudioState(AudioState.Finished);
        },
        speak: async (text: string, options?: Speech.SpeechOptions) => {
          await stopAudio();

          return new Promise<void>((res, rej) =>
            Speech.speak(text, {
              voice: "com.apple.ttsbundle.Daniel-compact",
              ...options,
              onStart: () => {
                setAudioState(AudioState.Speaking);
                if (options?.onStart) {
                  options.onStart();
                }
              },
              onDone: () => {
                setAudioState(AudioState.Finished);
                res();
              },
              onError: (e) => {
                setAudioState(AudioState.Stopped);
                rej(e);
              },
            })
          );
        },
        pause: async () => {
          switch (audioState) {
            case AudioState.Recording:
              await recording?.pauseAsync();
              break;

            case AudioState.Speaking:
              await Speech.pause();
              break;

            case AudioState.Playing:
              await sound?.pauseAsync();
              break;

            default:
              break;
          }

          setAudioState(AudioState.Paused);
        },
        resume: async () => {
          if (sound) {
            setAudioState(AudioState.Playing);
            await sound.playAsync();
            return;
          }

          if (recording) {
            setAudioState(AudioState.Recording);
            await recording.startAsync();
            return;
          }

          if (await Speech.isSpeakingAsync()) {
            setAudioState(AudioState.Speaking);
            await Speech.resume();
          }
        },
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
