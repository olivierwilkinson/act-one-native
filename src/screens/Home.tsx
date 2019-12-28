import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import PlayList from "../components/PlayList";
import { screenKey } from "./Play";

const HomeScreen: NavigationStackScreenComponent = props => (
  <PlayList
    goToPlay={play =>
      props.navigation.navigate({
        routeName: "Play",
        params: play,
        key: screenKey
      })
    }
  />
);

export default HomeScreen;
