import React, { useState, useEffect, ReactNode, useContext } from "react";
import { Audio } from "expo-av";
import { AUDIO_RECORDING, PermissionMap } from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { usePermissions, PermissionError } from "./Permissions";

export interface RecordingContextValue {
  recording?: Audio.Recording;
  record: (key: string, onStart: () => void) => Promise<void>;
}

const RecordingContext = React.createContext<RecordingContextValue | undefined>(undefined);

const waitForRecording = async (recording: Audio.Recording) =>
  new Promise<void>(res => {
    recording.setOnRecordingStatusUpdate(status => {
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

type Props = {
  children: ReactNode;
};

export const RecordingProvider = ({ children }: Props) => {
  const { permissions } = usePermissions();
  const [recording, setRecording] = useState<Audio.Recording>();

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true
    });
  }, []);

  return (
    <RecordingContext.Provider
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
        }
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};

export const useRecording = () => {
  const recording = useContext(RecordingContext);
  if (!recording) {
    throw new Error("useRecording must be used within an RecordingProvider");
  }

  return recording;
};
