import React from "react";
import { Container, Content } from "native-base";
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
        onBack={() => navigation.navigate("Home")}
      />
    )
  });

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Content>
          <Play {...navigation.state.params} />
        </Content>
      </Container>
    );
  }
}
