import React, { useState, useEffect, ReactNode, useContext } from "react";
import { Audio } from "expo-av";
import { AsyncStorage } from "react-native";
import { AUDIO_RECORDING, PermissionMap } from "expo-permissions";

import Recording from "../../../../contexts/Recording";
import Permissions, { PermissionError } from "../../../../contexts/Permissions";

type Props = {
  children: ReactNode;
};

const waitForRecording = async (recording: Audio.Recording) =>
  new Promise((res) => {
    recording.setOnRecordingStatusUpdate((status) => {
      if (status.isDoneRecording) {
        res();
      }
    });
  });

const checkCanRecord = (permissions: PermissionMap) => {
  if (permissions[AUDIO_RECORDING]?.granted) {
    return;
  }

  throw new PermissionError(
    "We are unable to access your microphone, please update your permissions in the Settings app..."
  );
};

const RecordingProvider = ({ children }: Props) => {
  const { permissions } = useContext(Permissions);
  const [recording, setRecording] = useState<Audio.Recording>();

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
    <Recording.Provider
      value={{
        recording,
        record: async (key: string, onStart: () => void) => {
          checkCanRecord(permissions);
          if (recording) {
            const status = await recording.getStatusAsync();
            if (status.isRecording) {
              await recording.stopAndUnloadAsync();
            }
          }

          const rec = new Audio.Recording();
          setRecording(rec);

          await rec.prepareToRecordAsync();
          await rec.startAsync();
          onStart();

          await waitForRecording(rec);
          setRecording(undefined);

          const uri = rec.getURI();
          if (!uri) return;

          await AsyncStorage.removeItem(key);
          await AsyncStorage.setItem(key, uri);
        },
      }}
    >
      {children}
    </Recording.Provider>
  );
};

export default RecordingProvider;
