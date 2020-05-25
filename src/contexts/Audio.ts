import React from "react";

export enum AudioState {
  Playing = "PLAYING",
  Paused = "PAUSED",
  Stopped = "STOPPED",
  Recording = "RECORDING"
}

export interface AudioContextValue {
  audioState: AudioState;
  setAudioState: (audioState: AudioState) => void;
}

export default React.createContext<AudioContextValue>({
  audioState: AudioState.Stopped,
  setAudioState: () => null
});
