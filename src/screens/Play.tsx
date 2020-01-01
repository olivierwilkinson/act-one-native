import React from "react";
import * as Speech from "expo-speech";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";
import { NavigationEvents } from "react-navigation";

import PlayNavigationContext, {
  PlayNavigation
} from "../contexts/PlayNavigation";
import PlayPositionContext, { PlayPosition } from "../contexts/PlayPosition";
import AudioContext, {
  AudioContextValue,
  PlaybackState
} from "../contexts/Audio";
import { Play } from "../types/play-types";
import { ColourByPlayer } from "../types/colour-types";
import { openSceneSelect } from "../helpers/navigation";
import {
  createColourByPlayer,
  goToScene,
  findActiveScene,
  getLineText
} from "../helpers/play";

import PlayScene from "../components/PlayScene";
import Header from "../components/Header";

type Params = { play: Play };
type Props = NavigationStackScreenProps<Params>;
type State = {
  playNavigation: PlayNavigation;
  playPosition: PlayPosition;
  audio: AudioContextValue;
  colourByPlayer: ColourByPlayer;
};

const createPlayNavigation = (navigation: NavigationStackProp, play: Play) => {
  const { scenes, currentAct, currentScene } = play;
  const sceneIndex = scenes.findIndex(
    ({ act, scene }) => act === currentAct && scene === currentScene
  );

  return {
    goToNextScene: scenes[sceneIndex + 1]
      ? () => goToScene(navigation, play, sceneIndex + 1)
      : null,
    goToPreviousScene: scenes[sceneIndex - 1]
      ? () => goToScene(navigation, play, sceneIndex - 1)
      : null,
    openSceneSelect: () => openSceneSelect(navigation, play)
  };
};

export default class PlayScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <Header
        title={navigation.state.params.play.play}
        onBack={() => navigation.pop()}
      />
    )
  });

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { navigation } = nextProps;
    const {
      state: {
        params: { play }
      }
    } = navigation;
    const { playPosition } = prevState;
    const { activeScene: previousActiveScene } = playPosition;

    if (
      previousActiveScene.act !== play.currentAct ||
      previousActiveScene.scene !== play.currentScene
    ) {
      const activeScene = findActiveScene(play);
      const {
        lines: [activeLine]
      } = activeScene;

      return {
        playPosition: {
          ...playPosition,
          activeScene,
          activeLine
        },
        playNavigation: createPlayNavigation(navigation, play)
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
        if (nextLine) {
          this.setState(
            {
              playPosition: {
                ...playPosition,
                activeLine: nextLine
              }
            },
            this.beginPlayback
          );
        }
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
      this.props.navigation.state.params.play
    ),
    playPosition: {
      activeScene: findActiveScene(this.props.navigation.state.params.play),
      activeLine: findActiveScene(this.props.navigation.state.params.play)
        .lines[0],
      setActiveLineById: this.setActiveLineById
    },
    audio: {
      playbackState: PlaybackState.Stopped,
      setPlaybackState: this.setPlaybackState
    },
    colourByPlayer: createColourByPlayer(
      this.props.navigation.state.params.play
    )
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
    const { playPosition, audio, colourByPlayer, playNavigation } = this.state;
    const { activeScene } = playPosition;

    return (
      <>
        <PlayPositionContext.Provider value={playPosition}>
          <PlayNavigationContext.Provider value={playNavigation}>
            <AudioContext.Provider value={audio}>
              <PlayScene {...activeScene} colourByPlayer={colourByPlayer} />
            </AudioContext.Provider>
          </PlayNavigationContext.Provider>
        </PlayPositionContext.Provider>

        <NavigationEvents
          onWillBlur={() => this.setPlaybackState(PlaybackState.Stopped)}
        />
      </>
    );
  }
}
