import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { Play } from "../types/play-types";
import PlaySceneSelect from "../components/PlaySceneSelect";
import { navigateToPlay } from "../helpers/navigation";

type Params = {
  play: Play;
};

export default class PlaySceneSelectModal extends React.Component<
  NavigationStackScreenProps<Params>
> {
  render() {
    const { navigation } = this.props;
    const {
      state: {
        params: { play }
      }
    } = navigation;

    return (
      <PlaySceneSelect
        {...play}
        onClosePress={() => navigation.pop()}
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
