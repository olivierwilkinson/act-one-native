import { NavigationStackProp } from "react-navigation-stack";

import { Play } from "../types/play-types";
import { screenKey } from "../screens/Play";

// Screen Navigation
export const navigateToPlay = (navigation: NavigationStackProp, play: Play) =>
  navigation.navigate({
    routeName: "Play",
    params: { play },
    key: screenKey
  });

// Modal Navigation
export const openSceneSelect = (navigation: NavigationStackProp, play: Play) =>
  navigation.navigate("PlaySceneSelectModal", { play });
