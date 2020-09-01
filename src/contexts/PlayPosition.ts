import React from "react";

import { Scene, Line } from "../types/play-types";

export interface PlayPosition {
  activeScene: Scene;
  activeLine: Line;
  setActiveLine: (line: Line) => void;
}

const activeLine: Line = {
  __typename: "Line",
  sceneId: -1,
  id: -1,
  player: "",
  lineRows: []
};

const activeScene: Scene = {
  __typename: "Scene",
  id: -1,
  playId: -1,
  actNum: 1,
  sceneNum: 1,
  lines: [activeLine]
};

export default React.createContext<PlayPosition>({
  activeScene,
  activeLine,
  setActiveLine: () => null
});
