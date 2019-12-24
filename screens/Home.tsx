import React from "react";
import { Container, Content } from "native-base";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import PlayList from "../components/PlayList";

const HomeScreen: NavigationStackScreenComponent = props => (
  <Container>
    <Content>
      <PlayList goToPlay={play => props.navigation.navigate("Play", play)} />
    </Content>
  </Container>
);

export default HomeScreen;
