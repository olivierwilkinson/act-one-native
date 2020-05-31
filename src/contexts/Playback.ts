import React from "react";

export enum PlaybackMode {
  Play = "PLAY",
  Record = "RECORD"
}

export interface PlaybackContextValue {
  mode: PlaybackMode;
  setMode: (mode: PlaybackMode) => void;
}

export default React.createContext<PlaybackContextValue>({
  mode: PlaybackMode.Play,
  setMode: () => null
});
