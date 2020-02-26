import React from "react";
import * as Speech from "expo-speech";

import AudioContext, { PlaybackState } from "../../contexts/Audio";
import PlayPositionContext, { PlayPosition } from "../../contexts/PlayPosition";
import { getLineText } from "../../helpers/play";
import { NavigationEvents } from "react-navigation";

type Props = {
  children: JSX.Element;
};

type State = {
  playbackState: PlaybackState;
};

export default class AudioContextProvider extends React.Component<
  Props,
  State,
  PlayPosition
> {
  static contextType = PlayPositionContext;

  getNextLine = () => {
    const {
      activeLine,
      activeScene: { lines }
    }: PlayPosition = this.context;
    const activeLineIndex = lines.findIndex(({ id }) => activeLine.id === id);
    return lines[activeLineIndex + 1];
  };

  beginPlayback = async () => {
    const { activeLine, setActiveLine }: PlayPosition = this.context;

    Speech.speak(getLineText(activeLine), {
      voice: "com.apple.ttsbundle.Daniel-compact",
      onDone: () => {
        const nextLine = this.getNextLine();
        if (!nextLine) {
          return this.setPlaybackState(PlaybackState.Stopped);
        }

        setActiveLine(nextLine);
        this.beginPlayback();
      }
    });
  };

  handlePlaybackStateChange = async (
    previousPlaybackState: PlaybackState,
    playbackState: PlaybackState
  ) => {
    switch (playbackState) {
      case PlaybackState.Playing:
        switch (previousPlaybackState) {
          case PlaybackState.Paused:
            return Speech.resume();
          case PlaybackState.Stopped:
            return this.beginPlayback();
        }
      case PlaybackState.Paused:
        return Speech.pause();
      case PlaybackState.Stopped:
        return Speech.stop();
    }
  };

  setPlaybackState = (playbackState: PlaybackState) => {
    const { playbackState: previousPlaybackState } = this.state;

    this.setState({ playbackState }, () =>
      this.handlePlaybackStateChange(previousPlaybackState, playbackState)
    );
  };

  state = {
    playbackState: PlaybackState.Stopped
  };

  render() {
    const { children } = this.props;
    const { playbackState } = this.state;

    return (
      <>
        <AudioContext.Provider
          value={{ playbackState, setPlaybackState: this.setPlaybackState }}
        >
          {children}
        </AudioContext.Provider>

        <NavigationEvents
          onWillBlur={() => this.setPlaybackState(PlaybackState.Stopped)}
        />
      </>
    );
  }
}
