import React from "react";
import { Audio } from 'expo-av';

export interface SoundContextValue {
  sound?: Audio.Sound;
  play: (uri: string) => Promise<void>;
}

export default React.createContext<SoundContextValue>({
  play: async () => {},
});
