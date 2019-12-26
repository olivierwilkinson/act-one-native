import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import PlayList from "../components/PlayList";

const HomeScreen: NavigationStackScreenComponent = props => (
  <PlayList goToPlay={play => props.navigation.navigate("Play", play)} />
);

export default HomeScreen;
