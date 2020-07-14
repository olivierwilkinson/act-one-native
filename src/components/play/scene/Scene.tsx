import React, { memo } from "react";

import SceneLinesContainer from "../sceneLines/SceneLinesContainer";
import SceneHeaderContainer from "../sceneHeader/SceneHeaderContainer";
import PlaybackControls from "../playbackControls/PlaybackControls";
import { ColourByPlayer } from "../../../types/colour-types";

type Props = {
  colourByPlayer: ColourByPlayer;
};

const Scene = ({ colourByPlayer }: Props) => (
  <>
    <SceneHeaderContainer />
    <SceneLinesContainer colourByPlayer={colourByPlayer} />
    <PlaybackControls />
  </>
);

export default memo(Scene);
