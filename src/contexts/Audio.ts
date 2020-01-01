import React from "react";

export enum PlaybackState {
  Playing = "PLAYING",
  Paused = "PAUSED",
  Stopped = "STOPPED"
}

export interface AudioContextValue {
  playbackState: PlaybackState;
  setPlaybackState: (playbackState: PlaybackState) => void;
}

export default React.createContext<AudioContextValue>({
  playbackState: PlaybackState.Stopped,
  setPlaybackState: () => null
});
