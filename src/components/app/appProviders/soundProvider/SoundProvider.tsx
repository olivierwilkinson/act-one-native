import React, { useState, ReactNode } from "react";
import { Audio } from "expo-av";

import Sound from "../../../../contexts/Sound";

type Props = {
  children: ReactNode;
};

const waitForSound = async (sound: Audio.Sound) =>
  new Promise((res) => {
    sound.setOnPlaybackStatusUpdate((status) => {
      // @ts-ignore
      if (status.didJustFinish) {
        res();
      }
    });
  });

const SoundProvider = ({ children }: Props) => {
  const [sound, setSound] = useState<Audio.Sound>();

  return (
    <Sound.Provider
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
        },
      }}
    >
      {children}
    </Sound.Provider>
  );
};

export default SoundProvider;
