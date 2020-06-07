import React from "react";

import { Line } from '../types/play-types';

export enum PlaybackMode {
  Play = "PLAY",
  Record = "RECORD"
}

export enum PlaybackState {
  Running = "RUNNING",
  Paused = "PAUSED",
  Stopped = "STOPPED",
  Recording = "RECORDING",
}

export interface PlaybackContextValue {
  mode: PlaybackMode;
  setMode: (mode: PlaybackMode) => void;
  start: (line: Line) => void;
}

export default React.createContext<PlaybackContextValue>({
  mode: PlaybackMode.Play,
  setMode: () => null,
  start: () => null,
});
