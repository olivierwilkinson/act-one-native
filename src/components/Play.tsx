import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native";
import palette from "google-palette";
import convert from "color-convert";

import PlayScene from "./PlayScene";
import PlaySceneHeader from "./PlaySceneHeader";
import PlaybackControls from "./PlaybackControls";
import { Play, Scene } from "../types/play-types";
import { ColourByPlayer } from "../types/colour-types";

const generateColourByPlayer: (scenes: Scene[]) => ColourByPlayer = scenes => {
  const players = Array.from(
    new Set(
      [].concat(...scenes.map(({ lines }) => lines.map(line => line.player)))
    )
  );
  const colours = palette("tol-rainbow", players.length);

  return players.reduce<ColourByPlayer>(
    (colourByPlayer, player, colourIndex) => {
      const [red, green, blue] = convert.hex.rgb(colours[colourIndex]);
      const colour = { red, green, blue };

      return {
        ...colourByPlayer,
        [player]: colour
      };
    },
    {}
  );
};

export default (play: Play) => {
  const findCurrentScene = () =>
    scenes.find(
      ({ scene, act }) => act === currentAct && scene === currentScene
    );

  const { play: playTitle, scenes, currentAct, currentScene } = play;

  const sceneElement = useRef(null);
  const [colourByPlayer, setColourByPlayer] = useState(
    generateColourByPlayer(scenes)
  );
  const [scene, setScene] = useState(findCurrentScene());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => setColourByPlayer(generateColourByPlayer(scenes)), [
    playTitle
  ]);
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
      <PlaybackControls
        isPlaying={isPlaying}
        togglePlayback={() => setIsPlaying(!isPlaying)}
      />
    </>
  );
};
