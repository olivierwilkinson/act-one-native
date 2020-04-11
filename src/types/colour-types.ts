export interface RGBColour {
  red: number;
  green: number;
  blue: number;
}

export interface ColourByPlayer {
  [player: string]: RGBColour;
}
