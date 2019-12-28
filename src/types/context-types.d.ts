import { Play } from "./play-types";

export interface PlayContextValue extends Play {
  goToSceneSelect: () => void;
  goToNextScene?: () => void;
  goToPreviousScene?: () => void;
}
