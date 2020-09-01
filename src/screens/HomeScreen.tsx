import React from "react";

import plays from "../data/plays";
import PlayListContainer from "../components/home/playList/PlayListContainer";
import { TabsNavigationProp } from "../types/navigation-types";

export type Props = {
  navigation: TabsNavigationProp;
};

export default class HomeScreen extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <PlayListContainer
        plays={plays}
        goToPlay={play => navigation.navigate("Play", { play })}
      />
    );
  }
}
