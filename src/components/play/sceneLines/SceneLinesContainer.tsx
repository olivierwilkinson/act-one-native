import React, { useContext } from "react";

import SceneLines from "./SceneLines";
import PlayPosition from "../../../contexts/PlayPosition";

export default () => {
  const {
    activeScene: { lines, actNum, sceneNum }
  } = useContext(PlayPosition);

  return <SceneLines lines={lines} act={actNum} scene={sceneNum} />;
};
