import React, { useContext, useState, useEffect } from "react";
import * as Speech from "expo-speech";
import { NavigationEvents } from "react-navigation";

import AudioContext, { PlaybackState } from "../../contexts/Audio";
import PlayPositionContext from "../../contexts/PlayPosition";
import { getLineText } from "../../helpers/play";
import usePrevious from "../../hooks/usePrevious";
import { Line } from "../../types/play-types";

type Props = {
  children: JSX.Element;
};

const AudioProvider = ({ children }: Props) => {
  const {
    activeScene: { lines },
    setActiveLine,
    activeLine
  } = useContext(PlayPositionContext);

  const [playbackState, setPlaybackState] = useState(PlaybackState.Stopped);
  const previousPlaybackState = usePrevious(playbackState);

  const beginPlayback = (line: Line) => {
    Speech.speak(getLineText(line), {
      voice: "com.apple.ttsbundle.Daniel-compact",
      onDone: () => {
        const lineIndex = lines.findIndex(({ id }) => line.id === id);
        const nextLine = lines[lineIndex + 1];
        if (!nextLine) {
          return setPlaybackState(PlaybackState.Stopped);
        }

        setActiveLine(nextLine);
        beginPlayback(nextLine);
      }
    });
  };

  useEffect(() => {
    if (!previousPlaybackState) {
      return;
    }

    switch (playbackState) {
      case PlaybackState.Stopped:
        Speech.stop();
        break;

      case PlaybackState.Paused:
        Speech.pause();
        break;

      case PlaybackState.Playing:
        if (previousPlaybackState === PlaybackState.Paused) {
          Speech.resume();
          break;
        }

        if (previousPlaybackState === PlaybackState.Stopped) {
          beginPlayback(activeLine);
          break;
        }
    }
  }, [playbackState, previousPlaybackState]);

  return (
    <>
      <AudioContext.Provider
        value={{
          playbackState,
          setPlaybackState
        }}
      >
        {children}
      </AudioContext.Provider>

      <NavigationEvents
        onWillBlur={() => setPlaybackState(PlaybackState.Stopped)}
      />
    </>
  );
};

export default AudioProvider;
