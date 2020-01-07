import { NavigationStackProp } from "react-navigation-stack";
import palette from "google-palette";
import convert from "color-convert";

import { Play, Line } from "../types/play-types";
import { ColourByPlayer } from "../types/colour-types";

import { setParams, playScreenKey } from "./navigation";

export const findActiveScene = (play: Play) => {
  const { scenes, currentAct, currentScene } = play;

  return scenes.find(
    ({ scene, act }) => act === currentAct && scene === currentScene
  );
};

export const getLineText = ({ lineRows }: Line) => {
  if (!lineRows.length) {
    return "";
  }

  return lineRows.reduce((text, row) => {
    if (!text) return row.text;

    return `${text}\n${row.text}`;
  }, "");
};

export const findPlayers: (play: Play) => string[] = ({ scenes }) => {
  return Array.from(
    new Set(
      scenes.reduce(
        (acc, { lines }) => [...acc, ...lines.map(line => line.player)],
        []
      )
    )
  );
};

export const createColourByPlayer: (play: Play) => ColourByPlayer = play => {
  const players = findPlayers(play);
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

export const goToScene = (
  navigation: NavigationStackProp,
  play: Play,
  newSceneIndex: number
) => {
  const { scenes } = play;
  const scene = scenes[newSceneIndex];
  if (!scene) {
    return;
  }

  setParams(navigation, playScreenKey, {
    play: {
      ...play,
      currentAct: scene.act,
      currentScene: scene.scene
    }
  });
};
