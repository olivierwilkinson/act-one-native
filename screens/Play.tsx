import React from "react";
import { Container, Content } from "native-base";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { Play as PlayType } from "../plays/play";
import Play from "../components/Play";

type Params = PlayType

const PlayScreen: NavigationStackScreenComponent<Params> = props => (
  <Container>
    <Content>
      <Play {...props.navigation.state.params} />
    </Content>
  </Container>
);

export default PlayScreen;