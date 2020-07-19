import React, { memo } from "react";

import SceneLinesContainer from "../sceneLines/SceneLinesContainer";
import SceneHeaderContainer from "../sceneHeader/SceneHeaderContainer";
import PlaybackControls from "../playbackControls/PlaybackControls";

const Scene = () => (
  <>
    <SceneHeaderContainer />
    <SceneLinesContainer />
    <PlaybackControls />
  </>
);

export default memo(Scene);
