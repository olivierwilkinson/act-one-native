import React, { useContext } from "react";

import Scene from "./scene/Scene";

import { Play as PlayType } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";

type Props = {
  play: PlayType;
};

export default ({ play: { colourByPlayer } }: Props) => {
  const { activeScene } = useContext(PlayPositionContext);

  return <Scene {...activeScene} colourByPlayer={colourByPlayer} />;
};
