import React from "react";

import { Scene, Line } from "../types/play-types";

export interface PlayPosition {
  activeScene: Scene;
  activeLine: Line;
  setActiveLineById: (id: number) => void;
}

const activeLine = {
  id: -1,
  player: "",
  lineRows: []
};

const activeScene = {
  act: 1,
  scene: 1,
  lines: [activeLine]
};

export default React.createContext<PlayPosition>({
  activeScene,
  activeLine,
  setActiveLineById: () => null
});
