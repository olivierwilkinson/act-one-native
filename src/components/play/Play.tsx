import React, { useContext } from "react";

import Scene from "./Scene";

import { Play as PlayType } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";

type Props = {
  play: PlayType;
  openSceneSelect: () => void;
};

export default ({ play: { colourByPlayer }, openSceneSelect }: Props) => {
  const { activeScene } = useContext(PlayPositionContext);

  return (
    <Scene
      {...activeScene}
      colourByPlayer={colourByPlayer}
      openSceneSelect={openSceneSelect}
    />
  );
};
