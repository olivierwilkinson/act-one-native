import React from "react";
import * as Speech from 'expo-speech';

export enum AudioState {
  Stopped = "STOPPED",
  Speaking = "SPEAKING",
  Playing = "PLAYING",
  Recording = "RECORDING",
  Paused = "PAUSED",
  Finished = "FINISHED"
}

export interface AudioContextValue {
  audioState: AudioState;
  play: (uri: string) => Promise<void>;
  record: (key: string) => Promise<void>;
  speak: (text: string, options?: Speech.SpeechOptions) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  stop: () => Promise<void>;
  finish: () => Promise<void>;
}

export default React.createContext<AudioContextValue>({
  audioState: AudioState.Stopped,
  play: async () => {},
  record: async () => {},
  speak: async () => {},
  pause: async () => {},
  resume: async () => {},
  stop: async () => {},
  finish: async () => {},
});
