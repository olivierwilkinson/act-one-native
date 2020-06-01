import React from "react";
import * as Speech from 'expo-speech';

export enum AudioState {
  Speaking = "SPEAKING",
  Playing = "PLAYING",
  Paused = "PAUSED",
  Stopped = "STOPPED",
  Recording = "RECORDING",
}

export interface AudioContextValue {
  audioState: AudioState;
  play: (uri: string) => Promise<void>;
  record: (key: string) => Promise<void>;
  speak: (text: string, options?: Speech.SpeechOptions) => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
}

export default React.createContext<AudioContextValue>({
  audioState: AudioState.Stopped,
  play: async () => {},
  record: async () => {},
  speak: async () => {},
  pause: async () => {},
  stop: async () => {},
});
