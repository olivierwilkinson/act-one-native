import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { Play as PlayType } from "../types/play-types";
import Play from "../components/Play";
import Header from "../components/Header";

type Params = PlayType;

export default class PlayScreen extends React.Component<
  NavigationStackScreenProps<Params>
> {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <Header
        title={navigation.getParam("play")}
        onBack={() => navigation.pop()}
      />
    )
  });

  render() {
    const { navigation } = this.props;

    return <Play {...navigation.state.params} />;
  }
}
