import React, { useRef, useEffect } from "react";

import PlaySceneLines from "./PlaySceneLines";
import PlaySceneHeader from "./PlaySceneHeader";
import PlaybackControls from "./PlaybackControls";
import { Scene } from "../../types/play-types";
import { ColourByPlayer } from "../../types/colour-types";

type Props = Scene & {
  colourByPlayer: ColourByPlayer;
};

export default ({ colourByPlayer, ...scene }: Props) => {
  const { act: actNumber, scene: sceneNumber } = scene;
  const sceneElement = useRef(null);

  useEffect(() => {
    sceneElement.current.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: false
    });
  }, [actNumber, sceneNumber]);

  return (
    <>
      <PlaySceneHeader {...scene} />
      <PlaySceneLines
        ref={sceneElement}
        {...scene}
        colourByPlayer={colourByPlayer}
      />
      <PlaybackControls />
    </>
  );
};
