export interface Line {
  id: number,
  actSceneLine: string,
  player: string,
  line: string
}

export interface Play {
  play: string;
  description: string;
  script: Line[];
  image: string,
  imageLicenceUrl: string,
  imageLicenceCode: string,
}