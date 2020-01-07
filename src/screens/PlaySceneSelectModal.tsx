import React from "react";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";

import { Play } from "../types/play-types";
import PlaySceneSelect from "../components/sceneSelectModal/PlaySceneSelect";
import Header from "../components/common/Header";
import { navigateToPlay } from "../helpers/navigation";

type Params = {
  play: Play;
};

export default class PlaySceneSelectModal extends React.Component<
  NavigationStackScreenProps<Params>
> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => ({
    header: () => (
      <Header
        title={navigation.state.params!.play.play}
        onCancel={() => navigation.pop()}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params!.play;

    return (
      <PlaySceneSelect
        {...play}
        onScenePress={({ act, scene }) =>
          navigateToPlay(navigation, {
            ...play,
            currentAct: act,
            currentScene: scene
          })
        }
      />
    );
  }
}
