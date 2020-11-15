import { ColourByPlayer } from "./colour-types";
import {
  GetPlays_plays,
  GetPlays_plays_scenes,
  GetPlays_plays_scenes_lines,
  GetPlays_plays_scenes_lines_lineRows
} from "../graphql/queries/types/GetPlays";

export type LineRow = GetPlays_plays_scenes_lines_lineRows;
export type Line = GetPlays_plays_scenes_lines;
export type Scene = GetPlays_plays_scenes;
export type Play = GetPlays_plays & {
  colourByPlayer: ColourByPlayer;
  local?: boolean;
};
