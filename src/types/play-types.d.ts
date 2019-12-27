import { ImageSourcePropType } from "react-native";

export interface LineRow {
  text: string;
  number?: number;
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
  script: Scene[];
  image: ImageSourcePropType;
  imageLicenseUrl: string;
  imageLicenseCode: string;
  currentAct?: number;
  currentScene?: number;
  currentLine?: number;
}
