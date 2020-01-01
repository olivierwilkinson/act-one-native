import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import PlayList from "../components/home/PlayList";
import { navigateToPlay } from "../helpers/navigation";

const HomeScreen: NavigationStackScreenComponent = ({ navigation }) => (
  <PlayList goToPlay={play => navigateToPlay(navigation, play)} />
);

export default HomeScreen;
