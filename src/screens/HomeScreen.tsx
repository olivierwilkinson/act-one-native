import React from "react";

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
        goToPlay={playId => navigation.navigate("Play", { playId })}
      />
    );
  }
}
