import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import plays from "../data/plays";
import PlayList from "../components/home/PlayList";
import { navigateToPlay } from "../helpers/navigation";

const HomeScreen: NavigationStackScreenComponent = ({ navigation }) => (
  <PlayList plays={plays} goToPlay={play => navigateToPlay(navigation, play)} />
);

export default HomeScreen;
