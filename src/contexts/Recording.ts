import React from "react";
import { Audio } from 'expo-av';

export interface AudioContextValue {
  recording?: Audio.Recording;
  record: (key: string) => Promise<void>;
  stop: () =>  Promise<void>;
}

export default React.createContext<AudioContextValue>({
  record: async () => {},
  stop: async () => {},
});
