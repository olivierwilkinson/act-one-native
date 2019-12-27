import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { Play } from "../types/play-types";
import PlaySceneSelect from "../components/PlaySceneSelect";

type Params = Play & {
  act: number;
  scene: number;
};

export default class PlayScreen extends React.Component<
  NavigationStackScreenProps<Params>
> {
  render() {
    const { navigation } = this.props;

    return (
      <PlaySceneSelect {...navigation.state.params} navigation={navigation} />
    );
  }
}
