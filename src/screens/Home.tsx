import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import PlayList from "../components/PlayList";
import { navigateToPlay } from "../helpers/navigation-helpers";

const HomeScreen: NavigationStackScreenComponent = ({ navigation }) => (
  <PlayList goToPlay={play => navigateToPlay(navigation, play)} />
);

export default HomeScreen;
