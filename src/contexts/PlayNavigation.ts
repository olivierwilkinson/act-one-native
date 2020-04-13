import React from "react";

export interface PlayNavigation {
  goToNextScene?: () => void;
  goToPreviousScene?: () => void;
}

export default React.createContext<PlayNavigation>({});
