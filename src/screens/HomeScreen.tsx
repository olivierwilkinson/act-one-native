import React from "react";

import plays from "../data/plays";
import PlayList from "../components/home/playList/PlayList";
import Header from "../components/common/header/Header";
import { TabsNavigationProp } from "../types/navigation-types";

export type Props = {
  navigation: TabsNavigationProp;
};

export default class HomeScreen extends React.Component<Props> {
  static navigationOptions = {
    header: () => <Header />
  };

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
