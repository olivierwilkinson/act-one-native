import React, { memo, useContext } from "react";

import Scene from "./Scene";
import { ColourByPlayer } from "../../../types/colour-types";
import PlayPosition from "../../../contexts/PlayPosition";

type Props = {
  colourByPlayer: ColourByPlayer;
};

const SceneContainer = ({ colourByPlayer }: Props) => {
  const { activeScene } = useContext(PlayPosition);

  return <Scene {...activeScene} colourByPlayer={colourByPlayer} />;
};

export default memo(SceneContainer);
