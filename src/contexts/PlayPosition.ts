import React from "react";

import { Scene, Line } from "../types/play-types";

export interface PlayPosition {
  activeScene: Scene;
  activeLine: Line;
  getNextLine: (current?: Line) => Line | undefined;
  setActiveLine: (line: Line) => void;
}

const activeLine: Line = {
  id: -1,
  player: "",
  lineRows: []
};

const activeScene: Scene = {
  act: 1,
  scene: 1,
  lines: [activeLine]
};

export default React.createContext<PlayPosition>({
  activeScene,
  activeLine,
  setActiveLine: () => null,
  getNextLine: () => undefined,
});
