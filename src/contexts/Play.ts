import React from "react";

import { Play } from "../types/play-types";

export interface PlayContextValue extends Play {
  goToSceneSelect: () => void;
  goToNextScene?: () => void;
  goToPreviousScene?: () => void;
}

export default React.createContext<PlayContextValue>({
  play: "",
  description: "",
  scenes: [],
  image: -1,
  imageLicenseUrl: "",
  imageLicenseCode: "",
  currentAct: 1,
  currentScene: 1,
  goToSceneSelect: () => null
});
