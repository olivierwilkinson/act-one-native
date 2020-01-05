import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";

import plays from "../data/plays";
import PlayList from "../components/home/PlayList";
import Header from "../components/common/Header";
import { navigateToPlay } from "../helpers/navigation";
import { Play } from "../types/play-types";

type Params = { play: Play };
type Props = NavigationStackScreenProps<Params>;

export default class HomeScreen extends React.Component<Props> {
  static navigationOptions = {
    header: () => <Header />
  };

  render() {
    const { navigation } = this.props;
    return (
      <PlayList
        plays={plays}
        goToPlay={play => navigateToPlay(navigation, play)}
      />
    );
  }
}
