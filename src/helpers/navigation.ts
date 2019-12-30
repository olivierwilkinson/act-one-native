import { NavigationStackProp } from "react-navigation-stack";

import { Play } from "../types/play-types";
import { screenKey } from "../screens/Play";

export const navigateToPlay = (navigation: NavigationStackProp, play: Play) =>
  navigation.navigate({
    routeName: "Play",
    params: { play },
    key: screenKey
  });
