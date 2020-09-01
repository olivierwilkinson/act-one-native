/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LineData {
  player: string;
  lineRows: LineRowData[];
}

export interface LineRowData {
  text: string;
  number?: number | null;
}

export interface PlayData {
  title: string;
  description: string;
  image: string;
  imageLicenseCode: string;
  imageLicenseUrl: string;
  scenes: SceneData[];
}

export interface SceneData {
  actNum: number;
  sceneNum: number;
  lines: LineData[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
