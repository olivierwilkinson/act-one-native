import React from "react";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";

import { Play as PlayType } from "../types/play-types";
import Play from "../components/play/Play";
import Header from "../components/common/Header";
import Error from "../components/common/Error";

type Params = { play: PlayType };
type Props = NavigationStackScreenProps<Params>;

export default class PlayScreen extends React.Component<Props> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => ({
    header: () => (
      <Header
        title={navigation.state.params?.play.play}
        onBack={() => navigation.pop()}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;

    if (!play) {
      return <Error message="Play could not be loaded" />;
    }

    return <Play play={play} navigation={navigation} />;
  }
}
