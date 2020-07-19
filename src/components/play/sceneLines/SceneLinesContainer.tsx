import React, { useContext } from "react";

import SceneLines from "./SceneLines";
import PlayPosition from "../../../contexts/PlayPosition";

export default () => {
  const {
    activeScene: { lines, act, scene }
  } = useContext(PlayPosition);

  return <SceneLines lines={lines} act={act} scene={scene} />;
};
