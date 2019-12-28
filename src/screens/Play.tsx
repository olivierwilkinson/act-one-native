import React from "react";
import { NavigationActions } from "react-navigation";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";
import palette from "google-palette";
import convert from "color-convert";

import PlayAudioController, {
  PlaybackState
} from "../controllers/PlayAudioController";
import PlayContext from "../contexts/Play";
import AudioContext, { AudioContextValue } from "../contexts/Audio";
import { Play, Scene } from "../types/play-types";
import { ColourByPlayer } from "../types/colour-types";

import PlayScene from "../components/PlayScene";
import Header from "../components/Header";
import { PlayContextValue } from "../types/context-types";

export const screenKey = "play-screen";

type Params = Play;
type Props = NavigationStackScreenProps<Params>;
type State = {
  playContextValue: PlayContextValue;
  colourByPlayer: ColourByPlayer;
  activeScene: Scene;
  audioController: PlayAudioController;
  audioContextValue: AudioContextValue;
};

const goToScene = (
  navigation: NavigationStackProp,
  play: Play,
  newSceneIndex: number
) => {
  const { scenes } = play;
  const scene = scenes[newSceneIndex];
  if (!scene) {
    return null;
  }

  navigation.dispatch(
    NavigationActions.setParams({
      params: {
        ...play,
        currentAct: scene.act,
        currentScene: scene.scene
      },
      key: screenKey
    })
  );
};

const createPlayContextValue = (
  navigation: NavigationStackProp,
  play: Play
) => {
  const { scenes, currentAct, currentScene } = play;
  const sceneIndex = scenes.findIndex(
    ({ act, scene }) => act === currentAct && scene === currentScene
  );

  return {
    ...play,
    goToNextScene: scenes[sceneIndex + 1]
      ? () => goToScene(navigation, play, sceneIndex + 1)
      : null,
    goToPreviousScene: scenes[sceneIndex - 1]
      ? () => goToScene(navigation, play, sceneIndex - 1)
      : null,
    goToSceneSelect: () => navigation.navigate("PlaySceneSelectModal", play)
  };
};

const createColourByPlayer: (play: Play) => ColourByPlayer = play => {
  const { scenes } = play;
  const players = Array.from(
    new Set(
      [].concat(...scenes.map(({ lines }) => lines.map(line => line.player)))
    )
  );
  const colours = palette("tol-rainbow", players.length);

  return players.reduce<ColourByPlayer>(
    (colourByPlayer, player, colourIndex) => {
      const [red, green, blue] = convert.hex.rgb(colours[colourIndex]);
      const colour = { red, green, blue };

      return {
        ...colourByPlayer,
        [player]: colour
      };
    },
    {}
  );
};

const findActiveScene = (play: Play) => {
  const { scenes, currentAct, currentScene } = play;

  return scenes.find(
    ({ scene, act }) => act === currentAct && scene === currentScene
  );
};

const createAudioState = (play: Play) => {
  const audioController = new PlayAudioController(play);

  const audioContextValue: AudioContextValue = {
    playbackState: PlaybackState.Stopped,
    lineId: "",
    setLineById: audioController.setLineById,
    play: audioController.play,
    pause: audioController.pause,
    resume: audioController.resume,
    stop: audioController.stop
  };

  return {
    audioController,
    audioContextValue
  };
};

export default class PlayScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <Header
        title={navigation.getParam("play")}
        onBack={() => navigation.pop()}
      />
    )
  });

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { navigation } = nextProps;
    const {
      state: { params: play }
    } = navigation;
    const { activeScene, playContextValue } = prevState;
    let updates = null;

    if (
      activeScene.act !== play.currentAct ||
      activeScene.scene !== play.currentScene
    ) {
      updates = {
        ...updates,
        activeScene: findActiveScene(play),
        playContextValue: createPlayContextValue(navigation, play)
      };
    }

    if (play.play !== playContextValue.play) {
      updates = {
        ...updates,
        playContextValue: createPlayContextValue(navigation, play),
        colourByPlayer: createColourByPlayer(play)
      };
    }

    return updates;
  }

  state: State = {
    playContextValue: createPlayContextValue(
      this.props.navigation,
      this.props.navigation.state.params
    ),
    colourByPlayer: createColourByPlayer(this.props.navigation.state.params),
    activeScene: findActiveScene(this.props.navigation.state.params),
    ...createAudioState(this.props.navigation.state.params)
  };

  componentDidMount() {
    const { audioController } = this.state;

    audioController.onPlaybackStateChange = this.onPlaybackStateChange;
  }

  componentWillUnmount() {
    const { audioController } = this.state;

    audioController.onPlaybackStateChange = () => null;
  }

  onPlaybackStateChange = (playbackState: PlaybackState) => {
    const { audioContextValue } = this.state;

    this.setState({
      audioContextValue: {
        ...audioContextValue,
        playbackState
      }
    });
  };

  render() {
    const {
      playContextValue,
      audioContextValue,
      colourByPlayer,
      activeScene
    } = this.state;

    return (
      <PlayContext.Provider value={playContextValue}>
        <AudioContext.Provider value={audioContextValue}>
          <PlayScene {...activeScene} colourByPlayer={colourByPlayer} />
        </AudioContext.Provider>
      </PlayContext.Provider>
    );
  }
}
