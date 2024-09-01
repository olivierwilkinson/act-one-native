import React, { useState, useEffect, ReactNode, useContext } from "react";
import { Audio } from "expo-av";
import {
  InterruptionModeIOS,
  InterruptionModeAndroid
} from "expo-av/build/Audio.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermissionError";
  }
}

export interface RecordingContextValue {
  recording?: Audio.Recording;
  record: (key: string, onStart: () => void) => Promise<void>;
}

const RecordingContext = React.createContext<RecordingContextValue | undefined>(
  undefined
);

const waitForRecording = async (recording: Audio.Recording) =>
  new Promise<void>(res => {
    recording.setOnRecordingStatusUpdate(status => {
      if (status.isDoneRecording) {
        res();
      }
    });
  });

type Props = {
  children: ReactNode;
};

export const RecordingProvider = ({ children }: Props) => {
  const [recording, setRecording] = useState<Audio.Recording>();

  const requestPermissionIfNeeded = async () => {
    const { status: currentStatus } = await Audio.getPermissionsAsync();

    if (currentStatus === 'granted') {
      return currentStatus;
    }

    const response = await Audio.requestPermissionsAsync();
    return response.status;
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true
    });
  }, []);

  return (
    <RecordingContext.Provider
      value={{
        recording,
        record: async (key: string, onStart: () => void) => {
          const status = await requestPermissionIfNeeded();

          if (status !== "granted") {
            throw new PermissionError("Permission to record audio was denied");
          }

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
