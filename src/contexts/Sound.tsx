import React, { useState, ReactNode, useContext } from "react";
import { Audio } from 'expo-av';

export interface SoundContextValue {
  sound?: Audio.Sound;
  play: (uri: string, onStart: () => void) => Promise<void>;
}

const SoundContext = React.createContext<SoundContextValue>({
  play: async () => {},
});


type Props = {
  children: ReactNode;
};

const waitForSound = async (sound: Audio.Sound) =>
  new Promise<void>(res => {
    sound.setOnPlaybackStatusUpdate(status => {
      // @ts-ignore
      if (status.didJustFinish) {
        res();
      }
    });
  });

export const SoundProvider = ({ children }: Props) => {
  const [sound, setSound] = useState<Audio.Sound>();

  return (
    <SoundContext.Provider
      value={{
        sound,
        play: async (uri: string, onStart: () => void) => {
          if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              await sound.stopAsync();
            }
          }

          const newSound = new Audio.Sound();
          setSound(newSound);

          await newSound.loadAsync({ uri });
          await newSound.playAsync();

          onStart();
          await waitForSound(newSound);

          setSound(undefined);
        }
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const sound = useContext(SoundContext);
  if (!sound) {
    throw new Error("useSound must be used within a SoundProvider");
  }

  return sound
}
