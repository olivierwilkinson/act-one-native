export interface LineRow {
  text: string,
  number: number,
}

export interface Line {
  id: number,
  actSceneLine: string,
  player: string,
  lines: LineRow[]
}

export interface Play {
  play: string;
  description: string;
  script: Line[];
  image: string,
  imageLicenseUrl: string,
  imageLicenseCode: string,
}