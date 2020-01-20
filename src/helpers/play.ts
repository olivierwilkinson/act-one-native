import palette from "google-palette";
import convert from "color-convert";

import { Play, Scene, Line } from "../types/play-types";
import { ColourByPlayer } from "../types/colour-types";

export const findActiveScene = (play: Play) => {
  const { scenes, currentAct, currentScene } = play;

  const activeScene = scenes.find(
    ({ scene, act }) => act === currentAct && scene === currentScene
  );

  return activeScene || scenes[0];
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

export const findPlayers: (scenes: Scene[]) => string[] = scenes => {
  return Array.from(
    new Set(
      scenes.reduce<string[]>(
        (acc, { lines }) => [...acc, ...lines.map(line => line.player)],
        []
      )
    )
  );
};

export const createColourByPlayer: (
  scenes: Scene[]
) => ColourByPlayer = scenes => {
  const players = findPlayers(scenes);
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
