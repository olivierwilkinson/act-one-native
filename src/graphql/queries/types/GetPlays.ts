/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlays
// ====================================================

export interface GetPlays_getPlays_scenes_lines_lineRows {
  __typename: "LineRow";
  id: number;
  lineId: number | null;
  number: number | null;
  text: string;
}

export interface GetPlays_getPlays_scenes_lines {
  __typename: "Line";
  id: number;
  player: string;
  sceneId: number | null;
  lineRows: GetPlays_getPlays_scenes_lines_lineRows[];
}

export interface GetPlays_getPlays_scenes {
  __typename: "Scene";
  actNum: number;
  id: number;
  playId: number | null;
  sceneNum: number;
  lines: GetPlays_getPlays_scenes_lines[];
}

export interface GetPlays_getPlays {
  __typename: "Play";
  description: string;
  id: number;
  image: string;
  imageLicenseCode: string;
  imageLicenseUrl: string;
  title: string;
  scenes: GetPlays_getPlays_scenes[];
}

export interface GetPlays {
  getPlays: GetPlays_getPlays[] | null;
}
