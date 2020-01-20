import { ImageSourcePropType } from "react-native";
import { ColourByPlayer } from "./colour-types";

export interface LineRow {
  text: string;
  number: number | null;
}

export interface Line {
  id: number;
  player: string;
  lineRows: LineRow[];
}

export interface Scene {
  act: number;
  scene: number;
  lines: Line[];
}

export interface Play {
  play: string;
  description: string;
  scenes: Scene[];
  image: ImageSourcePropType;
  imageLicenseUrl: string;
  imageLicenseCode: string;
  colourByPlayer: ColourByPlayer;
  currentAct: number;
  currentScene: number;
}
