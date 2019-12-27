import React, { useState, useRef, useEffect, useCallback } from "react";
import palette from "google-palette";
import convert from "color-convert";

import PlayScene from "./PlayScene";
import PlaySceneHeader from "./PlaySceneHeader";
import { Play as PlayType, Scene } from "../types/play-types";

const generateColourPalette = (script: Scene[]) => {
  const players = Array.from(
    new Set(
      [].concat(...script.map(({ lines }) => lines.map(line => line.player)))
    )
  );
  const colours = palette("tol-rainbow", players.length);

  return players.reduce(
    (colourByPlayer, player, colourIndex) => ({
      ...colourByPlayer,
      [player]: convert.hex.rgb(colours[colourIndex])
    }),
    {}
  );
};

const defaultProps = {
  currentAct: 1,
  currentScene: 1
};

const Play = ({ play, script, currentAct, currentScene }: PlayType) => {
  const findCurrentScene = () =>
    script.find(
      ({ scene, act }) => act === currentAct && scene === currentScene
    );

  const sceneElement = useRef(null);
  const [scene, setScene] = useState(findCurrentScene());
  const [colourByPlayer, setColourByPlayer] = useState(
    generateColourPalette(script)
  );

  useEffect(() => setColourByPlayer(generateColourPalette(script)), [play]);
  useEffect(() => {
    setScene(findCurrentScene());
    sceneElement.current.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: false
    });
  }, [currentAct, currentScene]);

  return (
    <>
      <PlaySceneHeader {...scene} />
      <PlayScene
        ref={sceneElement}
        {...scene}
        colourByPlayer={colourByPlayer}
      />
    </>
  );
};

Play.defaultProps = defaultProps;

export default Play;
