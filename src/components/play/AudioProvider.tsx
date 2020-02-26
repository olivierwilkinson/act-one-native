import React, { useContext, useState, useEffect } from "react";
import * as Speech from "expo-speech";
import { NavigationEvents } from "react-navigation";

import AudioContext, { PlaybackState } from "../../contexts/Audio";
import PlayPositionContext from "../../contexts/PlayPosition";
import { getLineText } from "../../helpers/play";
import usePrevious from "../../hooks/usePrevious";

type Props = {
  children: JSX.Element;
};

export default ({ children }: Props) => {
  const {
    activeScene: { lines },
    setActiveLine,
    activeLine
  } = useContext(PlayPositionContext);

  const [playbackState, setPlaybackState] = useState(PlaybackState.Stopped);
  const previousPlaybackState = usePrevious(playbackState);
  const [audioContext, setAudioContext] = useState({
    playbackState,
    setPlaybackState
  });

  const beginPlayback = async () => {
    Speech.speak(getLineText(activeLine), {
      voice: "com.apple.ttsbundle.Daniel-compact",
      onDone: () => {
        const activeLineIndex = lines.findIndex(
          ({ id }) => activeLine.id === id
        );

        const nextLine = lines[activeLineIndex + 1];
        if (!nextLine) {
          return setPlaybackState(PlaybackState.Stopped);
        }

        setActiveLine(nextLine);
        beginPlayback();
      }
    });
  };

  useEffect(() => {
    setAudioContext({
      playbackState,
      setPlaybackState
    });

    if (!previousPlaybackState) {
      return;
    }

    if (playbackState === PlaybackState.Playing) {
      if (previousPlaybackState === PlaybackState.Paused) {
        Speech.resume();
      }

      if (previousPlaybackState === PlaybackState.Stopped) {
        beginPlayback();
      }
    }

    if (playbackState === PlaybackState.Paused) {
      Speech.pause();
    }

    if (playbackState === PlaybackState.Stopped) {
      Speech.stop();
    }
  }, [playbackState, previousPlaybackState]);

  return (
    <>
      <AudioContext.Provider value={audioContext}>
        {children}
      </AudioContext.Provider>

      <NavigationEvents
        onWillBlur={() => setPlaybackState(PlaybackState.Stopped)}
      />
    </>
  );
};
