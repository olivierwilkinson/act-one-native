import palette from "google-palette";
import convert from "color-convert";

import { Scene, Line } from "../types/play-types";
import { PlaySettings } from "../contexts/PlaySettings";
import { ColourByPlayer } from "../types/colour-types";

export const findActiveScene = (
  scenes: Scene[],
  settings: PlaySettings = {}
): Scene | undefined => {
  const activeScene = scenes.find(
    ({ sceneNum, actNum }) =>
      actNum === settings.actNum && sceneNum === settings.sceneNum
  );

  return activeScene || scenes.sort((a, b) => a.index - b.index)[0];
};

export const getLineText = ({ lineRows }: Line) => {
  if (!lineRows.length) {
    return "";
  }

  return lineRows
    .sort((a, b) => a.index - b.index)
    .reduce((text, row) => {
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
