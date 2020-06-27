import React from "react";

export interface PlayNavigation {
  goToNextScene?: () => void;
  goToPreviousScene?: () => void;
  openSceneSelect: () => void;
}

export default React.createContext<PlayNavigation>({
  openSceneSelect: () => null,
});
