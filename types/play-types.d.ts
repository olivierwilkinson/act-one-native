export interface LineRow {
  text: string,
  number?: number,
};

export interface Line {
  id: number,
  actSceneLine: string,
  player: string,
  lineRows: LineRow[]
};

export interface Scene {
  act: number,
  scene: number,
  lines: Line[],
};

export interface Play {
  play: string;
  description: string;
  script: Scene[];
  image: string,
  imageLicenseUrl: string,
  imageLicenseCode: string,
};