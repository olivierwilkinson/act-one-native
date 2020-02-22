import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import * as Speech from "expo-speech";
import { NavigationEvents } from "react-navigation";

import Scene from "./Scene";
import { Play as PlayType } from "../../types/play-types";
import PlayPositionContext, { PlayPosition } from "../../contexts/PlayPosition";
import PlayNavigationContext, {
  PlayNavigation
} from "../../contexts/PlayNavigation";
import PlaySettingsContext, { PlaySettings } from "../../contexts/PlaySettings";
import AudioContext, {
  AudioContextValue,
  PlaybackState
} from "../../contexts/Audio";
import { findActiveScene, getLineText } from "../../helpers/play";
import { createPlayNavigation } from "../../helpers/contexts";

type Props = {
  navigation: NavigationStackProp;
  play: PlayType;
  settings?: PlaySettings;
};
type State = {
  playNavigation: PlayNavigation;
  playPosition: PlayPosition;
  audio: AudioContextValue;
};

export default class Play extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { navigation, play, settings = {} } = nextProps;
    const { playPosition } = prevState;
    const { activeScene: previousActiveScene } = playPosition;

    if (
      previousActiveScene.act !== settings.act ||
      previousActiveScene.scene !== settings.scene
    ) {
      const activeScene = findActiveScene(play, settings);
      const [activeLine] = activeScene.lines;

      return {
        playPosition: {
          ...playPosition,
          activeScene,
          activeLine
        },
        playNavigation: createPlayNavigation(navigation, play, settings)
      };
    }

    return null;
  }

  getNextLine = () => {
    const { playPosition } = this.state;
    const {
      activeScene: { lines },
      activeLine
    } = playPosition;
    const activeLineIndex = lines.findIndex(({ id }) => activeLine.id === id);

    return lines[activeLineIndex + 1];
  };

  beginPlayback = async () => {
    const { playPosition } = this.state;
    const { activeLine } = playPosition;

    Speech.speak(getLineText(activeLine), {
      voice: "com.apple.ttsbundle.Daniel-compact",
      onDone: () => {
        const nextLine = this.getNextLine();
        if (!nextLine) {
          return this.setPlaybackState(PlaybackState.Stopped);
        }

        this.setState(
          {
            playPosition: { ...playPosition, activeLine: nextLine }
          },
          () => {
            const {
              audio: { playbackState }
            } = this.state;

            if (playbackState === PlaybackState.Playing) {
              this.beginPlayback();
            }
          }
        );
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
    const { audio } = this.state;
    const { playbackState: previousPlaybackState } = audio;

    this.setState({ audio: { ...audio, playbackState } }, () =>
      this.handlePlaybackStateChange(previousPlaybackState, playbackState)
    );
  };

  setActiveLineById = (activeLineId: number) => {
    const { playPosition } = this.state;
    const {
      activeScene: { lines }
    } = playPosition;
    const activeLine = lines.find(({ id }) => id === activeLineId);

    if (activeLine) {
      this.setState({ playPosition: { ...playPosition, activeLine } });
      this.setPlaybackState(PlaybackState.Stopped);
    }
  };

  state: State = {
    playNavigation: createPlayNavigation(
      this.props.navigation,
      this.props.play,
      this.props.settings || {},
    ),
    playPosition: {
      activeScene: findActiveScene(this.props.play, this.props.settings),
      activeLine: findActiveScene(this.props.play, this.props.settings).lines[0],
      setActiveLineById: this.setActiveLineById
    },
    audio: {
      playbackState: PlaybackState.Stopped,
      setPlaybackState: this.setPlaybackState
    }
  };

  componentDidUpdate(_: Props, prevState: State) {
    const {
      playPosition: { activeScene: prevActiveScene }
    } = prevState;
    const {
      playPosition: { activeScene }
    } = this.state;

    if (prevActiveScene !== activeScene) {
      this.setPlaybackState(PlaybackState.Stopped);
    }
  }

  render() {
    const {
      play: { colourByPlayer },
      settings = {},
    } = this.props;
    const { playPosition, playNavigation, audio } = this.state;
    const { activeScene } = playPosition;

    return (
      <>
        <PlayPositionContext.Provider value={playPosition}>
          <PlayNavigationContext.Provider value={playNavigation}>
            <PlaySettingsContext.Provider value={settings}>
              <AudioContext.Provider value={audio}>
                <Scene {...activeScene} colourByPlayer={colourByPlayer} />
              </AudioContext.Provider>
            </PlaySettingsContext.Provider>
          </PlayNavigationContext.Provider>
        </PlayPositionContext.Provider>

        <NavigationEvents
          onWillBlur={() => this.setPlaybackState(PlaybackState.Stopped)}
        />
      </>
    );
  }
}
