import React from "react";
import { NavigationActions } from "react-navigation";
import { NavigationStackScreenProps } from "react-navigation-stack";

import PlayContext from "../contexts/Play";
import { Play as PlayType } from "../types/play-types";
import { PlayContextValue } from "../types/context-types";
import Play from "../components/Play";
import Header from "../components/Header";

export const screenKey = "play-screen";

type Params = PlayType;

const setPlay = ({ play, navigation }) =>
  navigation.dispatch(
    NavigationActions.setParams({ params: play, key: screenKey })
  );

const generateGoToScene = ({ newSceneIndex, play, navigation }) => {
  const { scenes } = play;
  const scene = scenes[newSceneIndex];
  if (!scene) {
    return null;
  }

  return () =>
    setPlay({
      play: { ...play, currentAct: scene.act, currentScene: scene.scene },
      navigation
    });
};

const generatePlayContextValue = ({ navigation, play }) => {
  const { scenes, currentAct, currentScene } = play;
  const sceneIndex = scenes.findIndex(
    ({ act, scene }) => act === currentAct && scene === currentScene
  );

  return {
    ...play,
    goToNextScene: generateGoToScene({
      newSceneIndex: sceneIndex + 1,
      play,
      navigation
    }),
    goToPreviousScene: generateGoToScene({
      newSceneIndex: sceneIndex - 1,
      play,
      navigation
    }),
    goToSceneSelect: () => navigation.navigate("PlaySceneSelectModal", play)
  };
};

export default class PlayScreen extends React.Component<
  NavigationStackScreenProps<Params>
> {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <Header
        title={navigation.getParam("play")}
        onBack={() => navigation.pop()}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const {
      state: { params: play }
    } = navigation;

    const value: PlayContextValue = generatePlayContextValue({
      play,
      navigation
    });

    return (
      <PlayContext.Provider value={value}>
        <Play {...play} />
      </PlayContext.Provider>
    );
  }
}
