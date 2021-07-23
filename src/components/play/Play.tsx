import React from "react";

import SceneContainer from "./scene/SceneContainer";
import SceneHeaderContainer from "./sceneHeader/SceneHeaderContainer";
import PlaybackControls from "./playbackControls/PlaybackControls";

export default () => (
  <>
    <SceneHeaderContainer />
    <SceneContainer />
    <PlaybackControls />
  </>
);
