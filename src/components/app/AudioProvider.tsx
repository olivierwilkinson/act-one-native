import React, { useState, ReactNode, useContext } from "react";
import * as Speech from "expo-speech";
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
    if (recording) {
      const status = await recording.getStatusAsync();
      if (status.isRecording) {
        await recording?.stopAndUnloadAsync();
      }
    }

    await sound?.stopAsync();
    await Speech.stop();
  };

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

          await play(uri, () => {
            setAudioState(AudioState.Playing);
          });

          setAudioState(AudioState.Finished);
        },
        record: async (key: string) => {
          await stopAudio();

          try {
            await record(key, () => {
              setAudioState(AudioState.Recording);
            });
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
            throw e;
          }
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
