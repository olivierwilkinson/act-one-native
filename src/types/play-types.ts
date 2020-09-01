import { ColourByPlayer } from "./colour-types";
import {
  GetPlays_getPlays,
  GetPlays_getPlays_scenes,
  GetPlays_getPlays_scenes_lines,
  GetPlays_getPlays_scenes_lines_lineRows
} from "../graphql/queries/types/GetPlays";

export type LineRow = GetPlays_getPlays_scenes_lines_lineRows;
export type Line = GetPlays_getPlays_scenes_lines;
export type Scene = GetPlays_getPlays_scenes;
export type Play = GetPlays_getPlays & {
  colourByPlayer: ColourByPlayer;
  local?: boolean;
};
