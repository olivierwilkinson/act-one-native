import React from "react";
import { PlaybackMode } from "../types/playback-types";

export interface PlaybackModeContextValue {
  mode: PlaybackMode;
  setMode: (mode: PlaybackMode) => void;
}

export default React.createContext<PlaybackModeContextValue>({
  mode: PlaybackMode.Play,
  setMode: () => null
});
