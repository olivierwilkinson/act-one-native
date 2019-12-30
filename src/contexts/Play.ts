import React from "react";

import { Play } from "../types/play-types";

export interface PlayContextValue extends Play {
  openSceneSelect: () => void;
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
  currentLineId: -1,
  openSceneSelect: () => null
});
