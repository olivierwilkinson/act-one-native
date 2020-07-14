import React from "react";

import Scene from "./scene/Scene";

import { Play as PlayType } from "../../types/play-types";

type Props = {
  play: PlayType;
};

export default ({ play: { colourByPlayer } }: Props) => (
  <Scene colourByPlayer={colourByPlayer} />
);
