import React from "react";

import plays from "../data/plays";
import PlayList from "../components/home/playList/PlayList";
import { TabsNavigationProp } from "../types/navigation-types";

export type Props = {
  navigation: TabsNavigationProp;
};

export default class HomeScreen extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <PlayList
        plays={plays}
        goToPlay={play => navigation.navigate("Play", { play })}
      />
    );
  }
}
