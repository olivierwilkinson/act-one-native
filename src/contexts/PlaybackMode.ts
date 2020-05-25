import React from "react";

export enum PlaybackMode {
  Play = "PLAY",
  Record = "RECORD"
}

export interface PlaybackModeContextValue {
  mode: PlaybackMode;
  setMode: (mode: PlaybackMode) => void;
}

export default React.createContext<PlaybackModeContextValue>({
  mode: PlaybackMode.Play,
  setMode: () => null
});
