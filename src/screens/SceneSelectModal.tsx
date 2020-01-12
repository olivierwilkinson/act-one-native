import React from "react";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";

import { Play } from "../types/play-types";
import SceneSelect from "../components/sceneSelectModal/SceneSelect";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import { navigateToPlay } from "../helpers/navigation";

type Params = {
  play: Play;
};

export default class SceneSelectModal extends React.Component<
  NavigationStackScreenProps<Params>
> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => ({
    header: () => (
      <Header
        title={navigation.state.params?.play?.play}
        onCancel={() => navigation.pop()}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;

    if (!play) {
      return <Error message="Unable to load Play" />;
    }

    return (
      <SceneSelect
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
