import React, { useContext } from "react";

import SceneLines from "./SceneLines";
import { ColourByPlayer } from "../../../types/colour-types";
import PlayPosition from "../../../contexts/PlayPosition";

type Props = {
  colourByPlayer: ColourByPlayer;
};

export default ({ colourByPlayer }: Props) => {
  const {
    activeScene: { lines, act, scene }
  } = useContext(PlayPosition);

  return (
    <SceneLines
      lines={lines}
      act={act}
      scene={scene}
      colourByPlayer={colourByPlayer}
    />
  );
};
