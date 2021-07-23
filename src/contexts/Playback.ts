import React from "react";

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
  start: () => void;
  stop: () => void,
}

export default React.createContext<PlaybackContextValue>({
  mode: PlaybackMode.Play,
  setMode: () => null,
  start: () => null,
  stop: () => null,
});
