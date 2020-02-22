import React from "react";

export type PlaySettings = {
  selectedPlayer: string;
};

export const initialSettings = {
  selectedPlayer: ""
};

export default React.createContext<PlaySettings>(initialSettings);
