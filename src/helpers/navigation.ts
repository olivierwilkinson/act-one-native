import { NavigationStackProp } from "react-navigation-stack";
import { NavigationActions } from "react-navigation";

import { Play } from "../types/play-types";

export const playScreenKey = "play-screen";

// Screen Navigation
export const navigateToPlay = (navigation: NavigationStackProp, play: Play) =>
  navigation.navigate({
    routeName: "Play",
    params: { play },
    key: playScreenKey
  });

// Modal Navigation
export const openSceneSelect = (navigation: NavigationStackProp, play: Play) =>
  navigation.navigate("PlaySceneSelectModal", { play });

// Misc
export const setParams = (
  navigation: NavigationStackProp,
  key: string,
  params: object
) =>
  navigation.dispatch(
    NavigationActions.setParams({
      params,
      key
    })
  );
