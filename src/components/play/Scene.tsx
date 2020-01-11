import React, { useRef, useEffect } from "react";

import SceneLines from "./SceneLines";
import PlaySceneHeader from "./PlaySceneHeader";
import PlaybackControls from "./PlaybackControls";
import { Scene } from "../../types/play-types";
import { ColourByPlayer } from "../../types/colour-types";

type Props = Scene & {
  colourByPlayer: ColourByPlayer;
};

export default ({ colourByPlayer, ...scene }: Props) => {
  const { act: actNumber, scene: sceneNumber } = scene;
  const sceneElement = useRef<any>(null);

  useEffect(() => {
    if (sceneElement && sceneElement.current) {
      sceneElement.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: false
      });
    }
  }, [actNumber, sceneNumber]);

  return (
    <>
      <PlaySceneHeader {...scene} />
      <SceneLines
        ref={sceneElement}
        {...scene}
        colourByPlayer={colourByPlayer}
      />
      <PlaybackControls />
    </>
  );
};
