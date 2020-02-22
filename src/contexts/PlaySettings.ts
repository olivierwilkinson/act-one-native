import React from "react";

export type PlaySettings = {
  selectedPlayer?: string;
  act?: number;
  scene?: number;
};

export default React.createContext<PlaySettings>({});
