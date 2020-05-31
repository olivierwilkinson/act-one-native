import React from "react";
import { Line } from "../types/play-types";
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
  record: (line: Line) => Promise<void>;
  speak: (line: Line, options?: Speech.SpeechOptions) => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
}

export default React.createContext<AudioContextValue>({
  audioState: AudioState.Stopped,
  record: async () => {},
  speak: async () => {},
  pause: async () => {},
  stop: async () => {},
});
