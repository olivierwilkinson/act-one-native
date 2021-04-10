import React from "react";

import { Scene, Line } from "../types/play-types";

export interface PlayPosition {
  activeScene?: Scene;
  activeLine?: Line;
  setActiveLine: (line: Line) => void;
}

export default React.createContext<PlayPosition>({
  setActiveLine: () => null
});
