import React from "react";
import { Audio } from 'expo-av';

export interface RecordingContextValue {
  recording?: Audio.Recording;
  record: (key: string, onStart: () => void) => Promise<void>;
}

export default React.createContext<RecordingContextValue>({
  record: async () => {},
});
