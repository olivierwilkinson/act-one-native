import React from "react";

import SceneContainer from "./scene/SceneContainer";

import { Play as PlayType } from "../../types/play-types";

type Props = {
  play: PlayType;
};

export default ({ play: { colourByPlayer } }: Props) => (
  <SceneContainer colourByPlayer={colourByPlayer} />
);
