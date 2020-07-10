import React, { useRef, useEffect, memo } from "react";

import SceneLines from "./SceneLines";
import SceneHeader from "./SceneHeader";
import PlaybackControls from "./PlaybackControls";
import { Scene as SceneType } from "../../types/play-types";
import { ColourByPlayer } from "../../types/colour-types";

type Props = SceneType & {
  colourByPlayer: ColourByPlayer;
};

const Scene = ({ colourByPlayer, ...scene }: Props) => {
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
      <SceneHeader {...scene} />
      <SceneLines
        ref={sceneElement}
        {...scene}
        colourByPlayer={colourByPlayer}
      />
      <PlaybackControls />
    </>
  );
};

export default memo(Scene);
