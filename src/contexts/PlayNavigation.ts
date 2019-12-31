import React from "react";

export interface PlayNavigation {
  openSceneSelect: () => void;
  goToNextScene?: () => void;
  goToPreviousScene?: () => void;
}

export default React.createContext<PlayNavigation>({
  openSceneSelect: () => null
});
