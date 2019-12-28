import React from "react";

import { PlaybackState } from "../controllers/PlayAudioController";

export interface AudioContextValue {
  playbackState: PlaybackState;
  lineId: string;
  setLineById: (id: number) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export default React.createContext<AudioContextValue>({
  playbackState: PlaybackState.Stopped,
  lineId: "",
  setLineById: () => null,
  play: () => null,
  pause: () => null,
  resume: () => null,
  stop: () => null
});
